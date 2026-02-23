
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



// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// const signup = async (name,email,password)=>{
//     try {
//        const res = await createUserWithEmailAndPassword(auth,email,password);
//        const user = res.user;
//        await addDoc(collection(db,'user'),{
//         uid:user.uid,
//         name,
//         authProvider:"local",
//         email
//        })
//     } catch (error) {
//         console.log(error);
//         toast.error(error.code.split("/")[1].split("-").join(" "));
//     }
// }

// const login = async (email,password)=>{
//     try {
//        await signInWithEmailAndPassword(auth,email,password);
//     } catch (error) {
//         console.log(error);
//         toast.error(error.code.split("/")[1].split("-").join(" "));
//     }
// }

// const logout = ()=>{
//     signOut(auth);
// }

// export {auth,db,login,signup,logout};