import './App.css'
import { useState, useEffect } from 'react'
import { symptomsURLPath, setToken, storedToken } from './helpers/axios'
import Header from './components/Header'
import DisplaySymptoms from './components/DisplaySymptoms'


const App = () => {
    const [symptoms, setSymptoms] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    
    const isTokenAbsent = storedToken === null 
                                || storedToken === ''
                                || storedToken === undefined
    

    const getSymptoms = async () => { 
        try{
            const result = await symptomsURLPath
            console.log(result.data)
            setSymptoms(result.data)
            setIsLoading(false)
        } 
        catch(e){
            console.log('error', e)
            if(e.response.status === 400) {
                window.localStorage.clear()
                setToken()     
            }
            setIsError(true)
        }
     }

    useEffect (() => { 
        if(isTokenAbsent){
            setToken()
            getSymptoms()
        } else {
            getSymptoms() 
        } 
    }, [isTokenAbsent])
        
    return (
        <>
        <div className='top-style'>
          <Header className='header-style'/>
          <DisplaySymptoms className='second-section-style' 
            isLoading={isLoading} isError={isError} symptoms={symptoms} />
        </div>
        </>
    )
}


export default App;
 