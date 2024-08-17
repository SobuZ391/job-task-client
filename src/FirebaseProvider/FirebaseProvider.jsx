import {  GithubAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config.js";
import { GoogleAuthProvider } from "firebase/auth";



export const AuthContext=createContext(null);

//social auth providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const FirebaseProvider = ({children}) => {
    const[user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    

    //create user
    const createUser =(email, password)=>{
        setLoading(true)
     return createUserWithEmailAndPassword(auth, email, password)
    }

    //Update user profile
    const updateUserProfile=(name,image)=>{
     return   updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
         
          });
    }

    //sign in user
    const signInUser =(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    //google login
    const googleLogin =()=>{
       setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
    //github login
    const githubLogin =()=>{
        setLoading(true)
        return signInWithPopup(auth,githubProvider)
    }

    //logout 
    const logout=()=>{
        setUser(null)
       
        signOut(auth)
    }



    //observer
    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
             setUser(user)
             setLoading(false)
            }
          });
          return () =>  unsubscribe
    },[])




    const allValues={
        createUser,
        signInUser,
        googleLogin,
        githubLogin,
        logout,
        user,
        updateUserProfile,
        loading,

    }
    return (
        <AuthContext.Provider value={allValues }>
            {children}
        </AuthContext.Provider>
    );
};

export default FirebaseProvider;