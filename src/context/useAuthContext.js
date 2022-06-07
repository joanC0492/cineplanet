// https://firebase.google.com/docs/auth/web/start?hl=es-419
// https://firebase.google.com/docs/auth/web/google-signin?hl=es#web-version-9
// https://firebase.google.com/docs/auth/web/manage-users?hl=es
import React from 'react';
import {auth} from '../Firebase';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import { useLocalStorage } from './useLocalStorage';

const authContext = React.createContext();

const useAuth = ()=> {
  const context = React.useContext(authContext);
  if (!context) throw new Error('No hay AuthProvider');
  return context;
};

function AuthProvider({children}) {
  const [user,setUser] = React.useState(null);
  const [loading,setLoading] = React.useState(true);
  // const [invitado, setInvitado] = React.useState(false);
  const [invitado, setInvitado] = useLocalStorage("INVITADO",false);

  const signUp = (email,password) => createUserWithEmailAndPassword(auth,email,password);

  const login = (email,password)=> signInWithEmailAndPassword(auth,email,password);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth,googleProvider);
  }

  const resetPassword = (email)=> sendPasswordResetEmail(auth,email);

  const logout = ()=> signOut(auth);
  
  const loginInvitado = ()=> setInvitado(true);
  const logoutInvitado = ()=> setInvitado(false);

  console.log(invitado, setInvitado);
  React.useEffect(()=>{
    // console.log("cargado la autenticacion");
    onAuthStateChanged(auth, user=>{
      // console.log("user",user); // cuanto esta logeado me devueleve el objeto entero sino return null
      setUser(user);
      setLoading(false);
    });
  },[]);

  return (
    <authContext.Provider value={{signUp,login,logout,user,loading,loginWithGoogle,resetPassword,invitado,loginInvitado,logoutInvitado}}> {/*Este value es como un export para los que usan AuthProvider*/}
      {children}
    </authContext.Provider>
  )
}

export {AuthProvider,useAuth};