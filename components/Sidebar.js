import { Flex, Stack } from '@chakra-ui/layout';
import { Avatar, IconButton, Button, Icon } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/color-mode';
import { FiLogOut } from 'react-icons/fi';

import Chat from '../components/Chat';
import firebase from 'firebase';

import { useRouter } from 'next/router';
import * as EmailValidator from 'email-validator';
import { auth, db } from '../firebaseconfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChats = db.collection('chats');
  const userChatsOrdered = userChats.where('users', 'array-contains', user.email);

  // .orderBy('lastSent', 'desc');

  // trying to use where and orderBy together just does not work. cant find an answer.

  const [chatsSnapshot] = useCollection(userChatsOrdered);

  const { colorMode, toggleColorMode } = useColorMode();

  const router = useRouter();

  const isExistingChat = (recipient) => {
    return !!chatsSnapshot?.docs.find(
      (chat) => chat.data().users.find((user) => user === recipient)?.length > 0
    );
  };

  const createChat = () => {
    const input = prompt('Enter email address of new chat recipient');

    if (!input) {
      return null;
    }

    if (EmailValidator.validate(input) && input !== user.email && !isExistingChat(input)) {
      db.collection('chats').add({
        users: [user.email, input],
        lastSent: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  const chatPreviews = chatsSnapshot?.docs.map((chat) => (
    <Chat key={chat.id} id={chat.id} users={chat.data().users} />
  ));
  return (
    <Flex
      direction="column"
      w="300px"
      h="100vh"
      overflowY="scroll"
      css={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        position="sticky"
        top={0}
        zIndex={199}
        p={4}
        h={'81px'}
        borderBottom="1px solid"
        borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
        transitionDuration="200ms"
        bg={colorMode === 'light' ? 'white' : 'gray.800'}
        borderRight={
          router.query.id ? 'none' : `1px solid ${colorMode === 'light' ? '#E2E8F0' : '#2D3748'}`
        }
      >
        <Avatar src={user.photoURL} />
        <Stack isInline>
          <IconButton
            size="sm"
            isRound
            onClick={toggleColorMode}
            _focus={{ boxShadow: 'none' }}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          />

          <IconButton
            onClick={() => auth.signOut()}
            icon={<Icon as={FiLogOut} />}
            _focus={{ boxShadow: 'none' }}
            size="sm"
            isRound
          />
        </Stack>
      </Flex>
      <Flex
        direction="column"
        borderRight="1px solid"
        borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
        bg={colorMode === 'light' ? 'white' : 'gray.800'}
        transitionDuration="200ms"
        flex="1"
      >
        <Flex direction="column" p={4}>
          <Button
            _focus={{ boxShadow: 'none' }}
            letterSpacing="wide"
            textTransform="uppercase"
            fontSize="md"
            onClick={createChat}
          >
            new chat
          </Button>
        </Flex>
        {chatPreviews}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
