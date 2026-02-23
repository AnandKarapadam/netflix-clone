import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth,db} from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { AuthContext } from "./authContext";




export function AuthProvider({children}){
    const [user,setUser] = useState('')
    const [loading,setLoading] = useState(true);
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser);
        setLoading(false)
    })

    return ()=> unsubscribe();
    },[])

    const signup = async (name,email,password)=>{
        try {
            const res = await createUserWithEmailAndPassword(auth,email,password);
            const user = res.user;
            
            await addDoc(collection(db,'user'),{
                uid:user.uid,
                name,
                authProvider:'local',
                email
            })

        } catch (error) {
           toast.error(error.code.split("/")[1].split("-").join(" "));
        }
    }
    const login = async (email,password)=>{
        try {
            await signInWithEmailAndPassword(auth,email,password);
        } catch (error) {
            toast.error(error.code.split("/")[1].split("-").join(" "));
        }
    }
    const logout = async()=>{
        await signOut(auth);
    }
    const value = {
        user,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

