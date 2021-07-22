import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyC9PLFUJtrKNoMvS1sQz4a4CouEzNXX2jI',
  authDomain: 'chat-web-app-297f4.firebaseapp.com',
  projectId: 'chat-web-app-297f4',
  storageBucket: 'chat-web-app-297f4.appspot.com',
  messagingSenderId: '132207426250',
  appId: '1:132207426250:web:008e8e101de4e56a5a5233',
};

// eslint-disable-next-line no-unused-vars
const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
