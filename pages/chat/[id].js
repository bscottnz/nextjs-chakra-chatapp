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

const Chat = () => {
  return (
    <Flex>
      <Head>
        <title>Chat</title>
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
        <ChatPage />
      </Box>
    </Flex>
  );
};

export default Chat;
