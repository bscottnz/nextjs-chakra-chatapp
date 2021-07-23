import { Flex, Stack } from '@chakra-ui/layout';
import {
  Avatar,
  IconButton,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Heading,
  Text,
  FormControl,
} from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/color-mode';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseconfig';
import { useCollection } from 'react-firebase-hooks/firestore';

import Message from './Message';
import { useState } from 'react';

import firebase from 'firebase';

const ChatPage = ({ chat, messages }) => {
  const [input, setInput] = useState('');

  const [user] = useAuthState(auth);
  const router = useRouter();
  const { colorMode } = useColorMode();
  const [messagesSnapshot] = useCollection(
    db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp', 'asc')
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((msg) => (
        <Message
          key={msg.id}
          user={msg.data().user}
          message={{
            ...msg.data(),
            timestamp: msg.data.timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((msg) => (
        <Message key={msg.id} user={msg.user} message={msg} />
      ));
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection('users').doc(user.uid).set(
      {
        lastActive: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput('');
  };

  return (
    <Box h="100vh" display="flex" flexDirection="column">
      <Flex
        align="center"
        position="sticky"
        top={0}
        zIndex={19}
        p={4}
        h={'81px'}
        borderBottom="1px solid"
        borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
        bg={colorMode === 'light' ? 'white' : 'gray.800'}
      >
        <Avatar />
        <Box ml={4} flex={1}>
          <Heading as="h3" size="lg">
            rec email
          </Heading>
          <Text>last seen...</Text>
        </Box>
        <Box>icons</Box>
      </Flex>
      <Box p={6} flex={1}>
        {showMessages()}
        <Box>{/* scroll target empty div */}</Box>
      </Box>
      <FormControl p={2} position="sticky" bottom={0} zIndex={3} as="form">
        <Input
          position="sticky"
          bottom={0}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button hidden disabled={!input} type="submit" onClick={sendMessage}>
          send
        </Button>
      </FormControl>
    </Box>
  );
};

export default ChatPage;
