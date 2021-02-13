import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const DisplayDiagnosis = ({selectedSymptoms, selectedGender, 
  selectedYob, openModal, setopenModal}) => {

  
  let symptoms = [JSON.stringify(selectedSymptoms)]
  let sex = [selectedGender]
  let yob = [JSON.stringify(selectedYob)]
  

  const diagnosis =`https://healthservice.priaid.ch/login/diagnosis?token=${process.env.REACT_APP_TOKEN}&language=en-gb&symptoms=${symptoms}&gender=${sex}&year_of_birth=${yob}`
  
  const [diagnosisres, setDiagnosisres] = useState([])
  useEffect (() => {
    if(selectedGender !== '' && selectedSymptoms !== [] && selectedYob !==''){
      const getDiagnosis = async () => { 
      try {
       const response = await axios(diagnosis) 

       console.log(response.data)
       setDiagnosisres(response.data)
     }
      catch(err){
          console.log(err)
          return <div className='error'> 
          Something went wrong, Please try later
          </div>
         }}
  getDiagnosis()
       
   }},[diagnosis,selectedSymptoms, selectedGender, selectedYob])

   
  return(
    <>
    {selectedSymptoms !== [] && selectedGender !=='' && selectedYob !== '' && diagnosisres !== [] ?
    <Modal isOpen={openModal} onRequestClose={()=> setopenModal(false)}>
        <div className='modal-content'
         style={{
          display:'inline',
          float:'left'

        }} >
        <h3  
        style={{
          marginBottom: '30px'
        }}> Your Diagnosis in Order of Likelihood </h3> 
         
         {diagnosisres === [] || null }{ <div className='error'> 
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
          onClick={setopenModal(false)}>
          <p> CLOSE </p>
        </div>

    </Modal>  : (
    
      <div className='error'>
        Please check that the form is filled in correctly before submitting
      </div>)
    
  }

  </>
  )
}

export default DisplayDiagnosis
