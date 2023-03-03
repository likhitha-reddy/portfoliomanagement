import { initializeApp } from 'firebase/app'
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAfXkYXm_wXBt4M80sy2SfEpI-BpQI4G7g",
  authDomain: "portfoliofinal-54d7b.firebaseapp.com",
  projectId: "portfoliofinal-54d7b",
  storageBucket: "portfoliofinal-54d7b.appspot.com",
  messagingSenderId: "675619164237",
  appId: "1:675619164237:web:485e1729d406a468c80c04"
};

export const app = initializeApp(firebaseConfig)

const auth = getAuth()

const provider = new GoogleAuthProvider()

export { auth, provider, signInWithPopup }
export const db = getDatabase(app);