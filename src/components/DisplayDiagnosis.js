import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const DisplayDiagnosis = ({selectedSymptoms, 
                           selectedGender, 
                           selectedYob, 
                           openModal, 
                           setopenModal, 
                           handleReset}) => {

  
  let symptoms = [selectedSymptoms]
  let sex = selectedGender
  let yob = selectedYob

  const [diagnosisres, setDiagnosisres] = useState([])
  
  const diagnosis =`https://healthservice.priaid.ch/login/diagnosis?token=
                    ${window.localStorage.getItem('authToken')}&language=en-gb&symptoms=
                    ${symptoms}&gender=${sex?.value}&year_of_birth=${yob?.value}`
  


  
    console.log('symptoms', symptoms)
    console.log('gender', sex)
    console.log('birthday', yob)

  useEffect (() => {
    const getDiagnosis = async () => { 
      try {
       const response = await axios(diagnosis) 
       console.log(response.data)
       setDiagnosisres(response.data)
      }
     catch(err){
          console.log(err)
          return (
            <div className='error'> 
                Something went wrong, Please try later
            </div>
        )}   
      }
      
      getDiagnosis()
      console.log('DIAGNOSIS RES!!!!!!!!!', diagnosisres)
       
  },[diagnosis, diagnosisres])

   
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
         
         {(diagnosisres === [] || null)}{ <div className='error'> 
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
