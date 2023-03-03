
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getDatabase, ref, child, get } from 'firebase/database'
import { app } from './firebase_data'
import { fetchUser } from './fetchDetails'



export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()

  

  const signIn = async () => {
    const { user } = await signInWithPopup(firebaseAuth, provider)
    const { refreshToken, providerData } = user

    localStorage.setItem('user', JSON.stringify(providerData))
    localStorage.setItem('accessToken', JSON.stringify(refreshToken))
    const [userInfo] = fetchUser()
    const userId = userInfo.uid

    const dbRef = ref(getDatabase(app))
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists() && snapshot.val().name) {
        router.push('/Firstpage')
      } else {
        router.push('/register')
      }
    })
  }

  return (
    <>
     

    
             
<h1>
<button
                onClick={signIn}     >sign in</button>

</h1>
              
               
        
        
   </>
   
  )
}