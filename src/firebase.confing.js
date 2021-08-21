

import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCEsCJgocgNOkORX9lreMFtpZM3Cf69p6g",
    authDomain: "photophiya.firebaseapp.com",
    projectId: "photophiya",
    storageBucket: "photophiya.appspot.com",
    messagingSenderId: "311211597732",
    appId: "1:311211597732:web:9fe82ea98bcf3f8372ab31"
};



firebase.apps.length?firebase.app():firebase.initializeApp(firebaseConfig);

const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();


export { firebase, storage, GoogleAuthProvider};