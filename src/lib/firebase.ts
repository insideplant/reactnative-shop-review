
import * as firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth"
// import { Constants } from 'expo-constants';

/* types */
import { Shop } from '../types/shop';
import { initialUser, User } from '../types/user';

if (!firebase.apps.length) {
  const firebaseConfig = {
    "apiKey": "AIzaSyB4WwGeow3aWo70qna-L-jF0tGNKYRLS4I",
    "authDomain": "shop-review-c626c.firebaseapp.com",
    "databaseURL": "https://project-id.firebaseio.com",
    "projectId": "shop-review-c626c",
    "storageBucket": "shop-review-c626c.appspot.com",
    "messagingSenderId": "1038804004773",
    "appId": "1:1038804004773:web:7696dce0ab960b4632024c",
    "measurementId": "G-333WDDGFS9"
  };
  firebase.initializeApp(firebaseConfig);
}

export const getShops = async() => {
  try{
    const snapshot = await firebase.firestore().collection("shops").orderBy("score", "desc" ).get();
    const shops = snapshot.docs.map(doc => doc.data() as Shop);
    return shops;
  }catch(err){
    console.log(err)
    return [];
  }
}

export const signin = async () => {
  const userCredential = await firebase.auth().signInAnonymously();
  const { uid } = userCredential.user;
  const userDoc = await firebase.firestore().collection("users").doc(uid).get();
  if(!userDoc.exists){
    await firebase.firestore().collection("users").doc(uid).set(initialUser);
    return {
      ...initialUser,
      id: uid
    } as User;
  } else {
    return {
      id: uid,
      ...userDoc.data(),
    } as User
  }
};