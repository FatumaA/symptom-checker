import './App.css';
import { useState, useEffect } from 'react'
import { symptomsURLPath } from './helpers/axios';
import Header from './components/Header';
import DisplaySymptoms from './components/DisplaySymptoms';


const App= () => {

    const [symptoms, setSymptoms] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    const getSymptoms = async () => { 
        try{
         const result = await symptomsURLPath
         console.log(result.data)
         debugger
         setSymptoms(result.data)
         setIsLoading(false)
         debugger
        } 
        catch{}
     }

    useEffect (() => getSymptoms(),[])
        
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
 