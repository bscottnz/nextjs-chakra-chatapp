import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './login';

import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import { auth, db } from '../firebaseconfig';

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);

  if (!user) {
    return (
      <ChakraProvider>
        <Login />
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
