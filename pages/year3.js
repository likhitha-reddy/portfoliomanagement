import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { db } from './firebase_data'
import { fetchUser, userAccessToken } from './fetchDetails'
import { onValue, ref, serverTimestamp, update } from 'firebase/database'
const Year3 = () => {
  const router=useRouter()
    const [holding,setHolding]=useState(0)
    const [issub,setIssub]=useState(false);
    let [allValues, setAllValues] = useState({
        A: 0,
        B: 0,
        C:0,
        D:0,
        hold:0
        
      })
     

         const [A_,setA_]=useState(0)
        const [B_,setB_]=useState(0)
        const [C_,setC_]=useState(0)
        const [D_,setD_]=useState(0)
        const [H_,setH_]=useState(0)
      
       
     

      let [inc, setInc] = useState({
        A: 5,
        B: -6,
        C:9,
        D:10
        
      })
      const [user, setUser] = useState(null)
      useEffect(() => {
         setInterval(() =>
        {
          const countdownDate1 = new Date('Mar 3, 2023 13:46:00 GMT+0530').getTime()
          let now = new Date().getTime()
          if(now>=countdownDate1)
          {
            router.replace('year4')
          }
        } , 1000);
       
        const dbRef = ref(db, `users/${uid}`);
        
        let records=[];
        onValue(dbRef,  (snapshot) => {
         
         snapshot.forEach(  (childSnapshot) => {
           
           
             records.push(childSnapshot.val());
           
         });
         setH_(records[10])
         setA_(records[0])
        setB_(records[1])
        setC_(records[2])
        setD_(records[3])
        
        
        
       
        
        

        })


       
       


        const accessToken = userAccessToken()
    if (!accessToken) return router.push('/')
    const [userInfo] = fetchUser()

    setUser(userInfo.uid)
    console.log(userInfo.uid)
       
        
      })
      
      
      const uid = user
      
      const startYear=(event)=>
      {
        event.preventDefault()
        
        setAllValues((prevalue) => {
          return {
            ...prevalue,                
            
            A:A_,
            B:B_,
            C:C_,
            D:D_,
            hold:H_
  
          }
        })
        setHolding(H_)
      }
    
  
      
      
      const handleChange = (event) => {
        event.preventDefault()
        
        
        if(!issub)
        {
          let value = event.target.value;
        let name = event.target.name;
       
        
        
        
            setAllValues((prevalue) => {
                return {
                  ...prevalue,                
                  [name]: value
                }
              })
              console.log("changed values",allValues)

        }
        else
        {
          alert("data submitted already");
        }
        
        

        }
       
        const handleCheck = (event) => {
          event.preventDefault()
        
            let name = event.target.name;
            let value = event.target.value;
            let Aeval=allValues.A*(100+inc.A)/100
            let Beval=allValues.B*(100+inc.B)/100
            let Ceval=allValues.C*(100+inc.C)/100
            let Deval=allValues.D*(100+inc.D)/100
            let sum=parseFloat(allValues.A)+parseFloat(allValues.B)+parseFloat(allValues.C)+parseFloat(allValues.D)
             console.log("A is",parseInt(allValues.A))
            console.log("B is",parseInt(allValues.B))
            console.log("C is",parseInt(allValues.C))
            console.log("D is",parseInt(allValues.D))
            console.log("sum is",sum)
            console.log("holding is",holding)
            console.log("uid ",uid)
            if(sum>holding)
            {
                alert("your invested amount is greaterthan your holding not possible please reassign")
                setAllValues((prevalue) => {
                    return {
                      ...prevalue,                
                      [name]: 0
                    }
                  })
                }
            
            if(sum<holding)
            {
    
                alert("you did not invest your entire money please reassign")
                setAllValues((prevalue) => {
                    return {
                      ...prevalue,                
                      [name]: 0
                    }
                  })
                }
            
            if(sum==holding)
            {
              
              setAllValues((prevalue) => {
                return {
                  ...prevalue,                
                  [name]: value
                }
              })
        
              let esum=Aeval+Beval+Ceval+Deval
              
             try {
              const postListRef = ref(db, 'users/' + uid)
              update(
                postListRef,
                {
                  Aeval,
                  Beval,
                  Ceval,
                  Deval,
                  total_amount:esum,
                  timestamp:serverTimestamp()
                  
                },
                uid
              );
              setIssub(true)              
              
            } catch (err) {
              alert(err)
            }
             
             
                 setAllValues((prevalue) => {
                     return {
                       ...prevalue,                
                       
                       A:Aeval,
                       B:Beval,
                       C:Ceval,
                       D:Deval
  
                     }
                   })
                   
                
            }
    
            }
            
      
  return (
    <div>
        <h1>YEAR 3</h1>
        <h1>AMOUNT AT THE START OF THIS YEAR-{allValues.hold}</h1>
         <form >
        <div>
          
          <input type='text' placeholder='Enter the value for ASSET A' 
            onChange={handleChange} name='A' />
            <h1>ASSET A: {A_}</h1>
            <br/>
          <input type='text' placeholder='Enter the value for ASSET B'
            onChange={handleChange} name='B' />
             <h1>ASSET B: {B_}</h1>
            <br/>
          <input type='text' placeholder='Enter the value for ASSET C' 
            onChange={handleChange} name='C' />
             <h1>ASSET C: {C_}</h1>
            <br/>
         <input type='text' placeholder='Enter the value for ASSET D' 
            onChange={handleChange} name='D' />
             <h1>ASSET D: {D_}</h1>
            <br/>
        </div>
        <h1>
        <button onClick={handleCheck}>SUBMIT</button>
        <button onClick={startYear}>Start year</button>
        </h1>
        
      </form>
      
      
    </div>
  )
}

export default Year3
