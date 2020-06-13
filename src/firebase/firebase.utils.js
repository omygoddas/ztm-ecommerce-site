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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  //  we don't need to check if 'users' collection exist because if it doesn't it'll
  //  also be created at the same time
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('Error creating user to firebase!!', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;