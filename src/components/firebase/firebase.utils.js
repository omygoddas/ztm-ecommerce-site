import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyCJoNULE_BdNVM1VYuu8b_VAu-RfHNyvXY",
  authDomain: "ztm-crown-ecommerce.firebaseapp.com",
  databaseURL: "https://ztm-crown-ecommerce.firebaseio.com",
  projectId: "ztm-crown-ecommerce",
  storageBucket: "ztm-crown-ecommerce.appspot.com",
  messagingSenderId: "842247472592",
  appId: "1:842247472592:web:4352620c58001e677025d5",
  measurementId: "G-S84D5QR394"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;