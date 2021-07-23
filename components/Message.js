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

const Message = ({ user, message }) => {
  return (
    <Box>
      <p>{message.message}</p>
    </Box>
  );
};

export default Message;
