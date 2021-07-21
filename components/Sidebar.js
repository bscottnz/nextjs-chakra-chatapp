import { Flex, Stack } from '@chakra-ui/layout';
import { Avatar, IconButton, Button, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ChatIcon, ChevronDownIcon, MoonIcon, SunIcon, Search2Icon } from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/color-mode';

import Chat from '../components/Chat';

import * as EmailValidator from 'email-validator';
import { auth, db } from '../firebaseconfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChats = db.collection('chats').where('users', 'array-contains', user.email);
  const [chatsSnapshot] = useCollection(userChats);

  const { colorMode, toggleColorMode } = useColorMode();

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
      });
    }
  };

  return (
    <Flex direction="column">
      <Flex
        align="center"
        justify="space-between"
        position="sticky"
        top={0}
        zIndex={1}
        p={4}
        h={'81px'}
        borderBottom="1px solid"
        borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      >
        <Avatar src={user.photoURL} onClick={() => auth.signOut()} />
        <Stack isInline>
          <IconButton icon={<ChatIcon />} _focus={{ boxShadow: 'none' }} size="sm" isRound />
          <IconButton
            size="sm"
            isRound
            onClick={toggleColorMode}
            _focus={{ boxShadow: 'none' }}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          />

          <IconButton icon={<ChevronDownIcon />} _focus={{ boxShadow: 'none' }} size="sm" isRound />
        </Stack>
      </Flex>
      <Flex direction="column" p={4}>
        <InputGroup mb={4}>
          <InputLeftElement pointerEvents="none" children={<Search2Icon color="gray.400" />} />
          <Input type="text" placeholder="Search conversations..." variant="flushed" />
        </InputGroup>
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
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Flex>
  );
};

export default Sidebar;
