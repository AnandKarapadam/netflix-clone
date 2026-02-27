
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDaHRmLHF2kzLGJEwjHxxcAeiF63EbXvCo",
  authDomain: "netflix-clone-d6f63.firebaseapp.com",
  projectId: "netflix-clone-d6f63",
  storageBucket: "netflix-clone-d6f63.firebasestorage.app",
  messagingSenderId: "17833036776",
  appId: "1:17833036776:web:fa3182e40c3744c6f0725d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);



