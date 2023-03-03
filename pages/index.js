
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { getAuth, GoogleAuthProvider, signInWithPopup,signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, child, get } from 'firebase/database'
import { app } from './firebase_data'
import { fetchUser } from './fetchDetails'
import { SHA256 } from 'crypto-js'



export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('')
  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()
  
  const signIn = async (event) => {
    setPassword(SHA256(event.target.value).toString())
    try {
      event.preventDefault()
      
      
      await signInWithEmailAndPassword(firebaseAuth, email, password).then((userCredential) => {
        // Signed in 

        const user = userCredential.user;
        const { refreshToken, providerData } = user
        console.log("login uid",user.uid)
        localStorage.setItem('userId', JSON.stringify(user.uid))
        
    localStorage.setItem('accessToken', JSON.stringify(refreshToken))
   
    router.replace('/Firstpage')
      alert("login successful")
        // ...
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const Register =  () => {
    router.replace('/register')
  
  }
  

  {/*
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
*/}

  return (
    <>     
              <h1>
              <div >
              <label
                htmlFor='email'
                     >
                email</label>

              <input
                required
                type='email'
                
                name='email'
               onChange={(e) => setEmail(e.target.value)}
                value={email}
                id='email'
                placeholder='Enter email'
              />
            </div>
            <div >
              <label
                htmlFor='password'
                  >
                Password
              </label>

              <input
                required
                type='password'
                name='password'
               id='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder='Enter password'
              />
            </div>
            
             <button
                onClick={signIn}     >sign in</button>
                 <button
                onClick={Register}     >Register Instead</button>


                 </h1>
                 
              
               
        
        
   </>
   
  )
}