import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAhiRUVTIvIJFu5xmYzTFqbBY6_ttTGYxg",
    authDomain: "upu-processes.firebaseapp.com",
    projectId: "upu-processes",
    storageBucket: "upu-processes.appspot.com",
    messagingSenderId: "273881506184",
    appId: "1:273881506184:web:996ebdb06a307db75a9a3d"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const db = firebase.firestore();

export default db;
export { auth };