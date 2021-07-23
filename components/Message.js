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
} from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseconfig';
import { useColorMode } from '@chakra-ui/color-mode';

const Message = ({ user, message }) => {
  const [currentUser] = useAuthState(auth);
  const { colorMode } = useColorMode();

  const messageType = user === currentUser.email ? 'sender' : 'reciever';

  return (
    <Box>
      {messageType === 'sender' ? (
        <Text
          w="fit-content"
          p={4}
          rounded="md"
          margin={3}
          ml="auto"
          minW="60px"
          pb={6}
          position="relative"
          textAlign="right"
          wordBreak="break-word"
          bg={colorMode === 'light' ? 'teal.600' : 'teal.500'}
        >
          {' '}
          {message.message}
        </Text>
      ) : (
        <Text
          w="fit-content"
          p={4}
          rounded="md"
          margin={3}
          minW="60px"
          pb={6}
          position="relative"
          textAlign="left"
          wordBreak="break-word"
          bg={colorMode === 'light' ? 'gray.600' : 'gray.500'}
        >
          {' '}
          {message.message}
        </Text>
      )}
    </Box>
  );
};

export default Message;
