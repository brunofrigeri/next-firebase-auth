import { createContext, useContext, useEffect, useState } from 'react'
import { createUser } from './db'
import firebase from './firebase'

const authContext = createContext({
  auth: null,
  loading: true,
  signInWithEmailAndPassword: async (email, password) => {},
  signOut: async () => {},
})

const formatAuth = (user) => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  photoUrl: user.photoURL,
  token: null,
})

function useProvideAuth() {
  const [auth, setAuth] = useState(null)
  const [loading, setLoading] = useState(true)

  const authStateChanged = async (authState) => {
    // Formats response into my required state.
    const formattedAuth = formatAuth(authState)
    // Fetch firebase auth ID Token.
    formattedAuth.token = await authState.getIdToken()
    // Stores auth into state.
    setAuth(formattedAuth)
    // Sets loading state to false.
    setLoading(false)
  }

  const signedIn = async (resp) => {
    const storeUser = formatAuth(resp.user)
    createUser(storeUser.uid, storeUser)
  }

  const clear = () => {
    setAuth(null)
    setLoading(true)
  }

  const signInWithEmailAndPassword = (email, password) => {
    setLoading(true)
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(signedIn)
  }

  const signOut = () => {
    return firebase.auth().signOut().then(clear)
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged)
    return () => unsubscribe()
  }, [])

  return {
    auth,
    loading,
    signInWithEmailAndPassword,
    signOut,
  }
}

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)
