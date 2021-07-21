import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './login';
import firebase from 'firebase';

import { ChakraProvider, Spinner, Center } from '@chakra-ui/react';
import '../styles/globals.css';
import { auth, db } from '../firebaseconfig';

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection('users').doc(user.uid).set(
        {
          email: user.email,
          lastActive: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) {
    return (
      <ChakraProvider>
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      </ChakraProvider>
    );
  }

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
