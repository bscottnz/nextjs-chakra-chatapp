import { Flex, Stack } from '@chakra-ui/layout';
import {
  Avatar,
  IconButton,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
} from '@chakra-ui/react';
import Head from 'next/head';
import Sidebar from '../../components/Sidebar';
import ChatPage from '../../components/ChatPage';
import { auth, db } from '../../firebaseconfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import getOtherEmail from '../../utils/getOtherEmail';

const Chat = ({ chat, messages }) => {
  const [user] = useAuthState(auth);

  return (
    <Flex>
      <Head>
        <title>{getOtherEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <Box
        flex="1"
        overflow="scroll"
        h="100vh"
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <ChatPage chat={chat} messages={messages} />
      </Box>
    </Flex>
  );
};

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection('chats').doc(context.query.id);

  const messagesRes = await ref.collection('messages').orderBy('timestamp', 'asc').get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
