import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDgpuzM1jqfSsRG5gFRHpnOoD9UOy2EQmc',
  authDomain: 'ms-my-curriculum.firebaseapp.com',
  databaseURL: 'https://ms-my-curriculum-default-rtdb.firebaseio.com',
  projectId: 'ms-my-curriculum',
  storageBucket: 'ms-my-curriculum.appspot.com',
  messagingSenderId: '289677214857',
  appId: '1:289677214857:web:8fb49cae9c5f377e3bb258',
};
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default firebase;
