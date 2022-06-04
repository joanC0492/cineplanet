// import React from 'react';
// import {app} from './Firebase';

// function SignIn(){

//   const SignInWithFirebase = ()=>{
//     const googleProvider = new app.auth.GoogleAuthProvider();
//     app.auth().signInWithPopup(googleProvider)
//     .then((re)=>{
//       console.log(re);
//     })
//     .catch((err)=>{
//       console.log(err);
//     })
//   }

//   return(
//     <button 
//       onClick={SignInWithFirebase}
//       type="button"
//     >
//       Registrarse con Google
//     </button>
//   );
// }


// export {SignIn}