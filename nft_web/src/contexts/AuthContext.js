import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { getAuth, signOut, onAuthStateChanged, updateEmail, sendEmailVerification, updatePassword, updateProfile, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
  }

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }

  function logout() {
    signOut(auth).then(() => {
      // Sign-out successful.
    })
  }

  function resetPassword(email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  function updateEmail(email) {
    updateEmail(auth.currentUser, "user@example.com").then(() => {
      // Email updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
  }

  function updatePassword(password) {
    updatePassword(currentUser, password).then(() => {
      // Update successful.
    }).catch((error) => {
      // An error ocurred
      // ...
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setCurrentUser(user)
        setLoading(false)
        // ...
      } else {
        // User is signed out
        // ...
        setCurrentUser()
        setLoading(false)
      }
    });
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}