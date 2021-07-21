import { Flex, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/color-mode';
import getOtherEmail from '../utils/getOtherEmail';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseconfig';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';

const Chat = ({ id, users }) => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const [user] = useAuthState(auth);

  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', getOtherEmail(users, user))
  );

  const openChat = () => {
    router.push(`/chat/${id}`);
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const recipientEmail = getOtherEmail(users, user);
  return (
    <Flex
      align="center"
      p={4}
      cursor="pointer"
      _hover={{ bg: colorMode === 'light' ? 'gray.200' : 'gray.700' }}
      onClick={openChat}
    >
      {recipient ? (
        <Avatar mr={4} src={recipient?.photoURL} name={recipientEmail[0]} />
      ) : (
        <Avatar mr={4} name={recipientEmail[0]} />
      )}

      <Text wordBreak="break-word">{recipientEmail}</Text>
    </Flex>
  );
};

export default Chat;
