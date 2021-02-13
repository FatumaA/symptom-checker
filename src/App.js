import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import DisplaySymptoms from './components/DisplaySymptoms'
import Header from './components/Header';
import HmacMD5 from 'crypto-js/hmac-md5';
import EncBase64 from 'crypto-js/enc-base64'

const App= () => {
    const url ='https://authservice.priaid.ch/login'
    const urlHealth = 'https://healthservice.priaid.ch'
    const apiKey = process.env.REACT_APP_KEY
    const secretKey = process.env.REACT_APP_SECRET_KEY
    const computedHash = HmacMD5(url, secretKey)
    const computedHashString = computedHash.toString(EncBase64)

    console.log(computedHashString)
    
    

    // const config= {
    //                 headers: {Authorization:`Bearer ${apiKey}:${computedHashString}`} 
    //                 }
    // const getToken = async () => {
    //     try {
    //      const token =  await axios.post(
    //             url,
    //             config
    //            )

    //            console.log(token.data)
    //     } catch (err) {
    //         console.log(err)
    //     }
    //     getToken()
    // }
   
    

        const symptomsURL = `${urlHealth}/symptoms?token=${process.env.REACT_APP_TOKEN}&language=en-gb`

    const [symptoms, setSymptoms] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    // const [authToken, setAuthToken] = useState(null)
       

    useEffect (() => {
       const getSymptoms = async () => { 
           try{
            const result = await axios (symptomsURL) 

            console.log(result.data)
            setSymptoms(result.data)
            setIsLoading(false)
           }catch(err){
               console.log(err)
              }}
       getSymptoms()
            
        },[symptomsURL])
       
       
    return (
        <>
        <div className='top-style'>
          <Header className='header-style'/>
          <DisplaySymptoms className='second-section-style' 
            isLoading={isLoading} symptoms={symptoms} />
        </div>
        </>
    )
}


export default App;
