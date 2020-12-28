import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import DisplaySymptoms from './components/DisplaySymptoms'
import Header from './components/Header';






const App= () => {
    
    const symptomsURL = `https://sandbox-healthservice.priaid.ch/symptoms?token=${process.env.REACT_APP_KEY}&language=en-gb`
    
    const [symptoms, setSymptoms] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    

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
          <DisplaySymptoms className='second-section-style' isLoading={isLoading} symptoms={symptoms} />
        </div>
        </>
    )
}


export default App;
