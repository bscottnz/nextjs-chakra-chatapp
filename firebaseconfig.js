import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDBqxaIp4yFPVzAhwRaxZn0zCvPnPPrK6U',
  authDomain: 'nextjs-chakra-chatapp.firebaseapp.com',
  projectId: 'nextjs-chakra-chatapp',
  storageBucket: 'nextjs-chakra-chatapp.appspot.com',
  messagingSenderId: '615676705190',
  appId: '1:615676705190:web:6022d172083223bb50f767',
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
