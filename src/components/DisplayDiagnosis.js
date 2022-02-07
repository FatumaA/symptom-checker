import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { urlHealth } from '../helpers/constants'
import { storedToken, setToken } from '../helpers/axios'

Modal.setAppElement('#root')

const DisplayDiagnosis = ({selectedSymptoms, 
                           selectedGender, 
                           selectedYob, 
                           openModal, 
                           setopenModal, 
                           handleReset,
                           isTokenAbsent }) => {

  
  let symptoms = [selectedSymptoms]
  let sex = selectedGender
  let yob = selectedYob

  const [diagnosisres, setDiagnosisres] = useState([])
  
  const diagnosis =`${urlHealth}/diagnosis?token=${storedToken}&language=en-gb&symptoms=[${symptoms}]&gender=${sex?.value}&year_of_birth=${yob?.value}`

  useEffect (() => {
    const getDiagnosis = async () => { 
      try {
        const response = await axios(diagnosis) 
        setDiagnosisres(response.data)
      }
      catch(e){
          console.log(e)
          if(e.response?.status === 400) {
            window.localStorage.clear()
            setToken('')     
        }
      }   
    }
    if(isTokenAbsent){
      setToken('')
      getDiagnosis()
    } else {
        getDiagnosis() 
    }  
  },[diagnosis, diagnosisres, isTokenAbsent])

   
  return(
    <>
    {(diagnosisres !== [] || undefined) &&
     <Modal isOpen={openModal} onRequestClose={() => { setopenModal(false); handleReset()}}>
        <div className='modal-content'
         style={{
          display:'inline',
          float:'left'

        }} >
        <h3  
        style={{
          marginBottom: '30px'
        }}> Your Diagnosis in Order of Likelihood </h3> 
         
         {!!diagnosisres ?? <div className='error'> 
          No symptoms available for stated conditions
        </div> }
       
        
        {diagnosisres.map((item) => {
          return <li 
            key={item.id}
            style={{
              listStyleType: 'none',
              marginBottom: '20px'
            }} > {item.Issue.Name} </li>
        }) }

        </div>
        <div className='close-prompt' 
          style={{
            float: 'right',
            cursor: 'pointer'
          }}
          onClick={()=> {setopenModal(false); handleReset()}}>
          <p> CLOSE </p>
        </div>

    </Modal> }
   </>
  )
}


export default DisplayDiagnosis
