import Head from 'next/head';

import { useColorMode } from '@chakra-ui/color-mode';

import { Flex, Stack, Box } from '@chakra-ui/layout';
import { Button, Center } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';

import { auth, provider } from '../firebaseconfig';

const Login = () => {
  const { colorMode } = useColorMode();

  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Center h="100vh">
      <Head>
        <title>Login</title>
      </Head>
      <Stack
        spacing={12}
        // w="250px"
        p={16}
        align="center"
        bg={colorMode === 'light' ? 'gray.600' : 'gray.700'}
        borderRadius="3xl"
        boxShadow="0px 4px 14px -3px rgba(0,0,0,0.7)"
      >
        <Box
          p={6}
          bgGradient="linear(to-tr, #7928CA, #FF0080)"
          w="fit-content"
          borderRadius="3xl"
          boxShadow="md"
          _hover={{ boxShadow: 'lg' }}
        >
          <ChatIcon w="100px" h="100px" color="white" />
        </Box>
        <Button boxShadow="md" _hover={{ boxShadow: 'lg' }} onClick={signIn}>
          Sign in with Google
        </Button>
      </Stack>
    </Center>
  );
};

export default Login;
