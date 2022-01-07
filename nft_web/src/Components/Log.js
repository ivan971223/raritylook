import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import './Login.css'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../Reducer'
import Navigationbar from './Nav'
import { initializeApp } from "firebase/app";
import Box from '@mui/material/Box';
import { TwitterAuthProvider } from "firebase/auth";
import TextField from '@mui/material/TextField';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendSignInLinkToEmail } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAhZWHQix6tAOTH0B3i2XEPAGv88XjwyKY",
    authDomain: "coffee-app-f845e.firebaseapp.com",
    databaseURL: "https://coffee-app-f845e.firebaseio.com",
    projectId: "coffee-app-f845e",
    storageBucket: "coffee-app-f845e.appspot.com",
    messagingSenderId: "231261846462",
    appId: "1:231261846462:web:0abbab8bcc575ba5f517ef",
    measurementId: "G-6BRZG3SK0R"
    // this is where your firebase config goes
};
const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'localhost',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
        bundleId: 'com.example.ios'
    },
    android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
};
const app = initializeApp(firebaseConfig);
// https://coffee-app-f845e.firebaseapp.com/__/auth/handler
const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [status, setStatus] = useState();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const GoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("hi");

                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log(errorCode);
                console.log(errorMessage);
                console.log(email);

            });
    }
    const TwitterSignIn = () => {
        const provider = new TwitterAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
                // You can use these server side with your app's credentials to access the Twitter API.
                const credential = TwitterAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const secret = credential.secret;

                // The signed-in user info.
                const user = result.user;
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = TwitterAuthProvider.credentialFromError(error);
                // ...
                console.log(errorCode);
                console.log(errorMessage);
                console.log(email);
            });

    }

    const EmailSignUp = () => {
        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignIn', email);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
                setStatus("failed to sign up")
            });

    }
    const EmailSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                setStatus("success, logged in")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setStatus("failed to log in")
            });

    }

    const EmailSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div className='login' >
            <Box sx={{ p: 1, m: 1, display: 'flex', flexWrap: 'wrap' }}>
                <Box sx={{ p: 1, m: 1, marginBottom: '50px' }}>
                    <Navigationbar />
                </Box>
                <Box component="main"
                    sx={{
                        flexGrow: 1, p: 1,
                        m: 1, width: '100%'
                    }}>

                    <Button type='submit' onClick={GoogleSignIn}>Google</Button>
                    {/* <Button type='submit' onClick={TwitterSignIn}>Twitter</Button> */}
                    <Box sx={{ display: 'flex' }}>
                        <TextField id="filled-basic" label="Email" variant="outlined" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <TextField id="filled-basic" label="Password" type="password" variant="outlined" value={password} onChange={(event) => setPassword(event.target.value)} />
                        <Button type='submit' onClick={EmailSignIn}>SignIn</Button>
                        <Button type='submit' onClick={EmailSignUp}>SignUp</Button>
                        <Button type='submit' onClick={EmailSignOut}>SignOut</Button>
                        <Box>{status}</Box>
                    </Box>
                </Box>
            </Box>
        </div >
    )
}

export default Login
