import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const DisplayDiagnosis = ({selectedSymptoms, selectedGender, 
  selectedYob, openModal, setopenModal, setSelectedGender, setSelectedSymptoms, setSelectedYob}) => {

  let symptoms = [JSON.stringify(selectedSymptoms)]
  let sex = [selectedGender]
  let yob = [JSON.stringify(selectedYob)]
  
  const diagnosis =`https://sandbox-healthservice.priaid.ch/diagnosis?token=${process.env.REACT_APP_KEY}&language=en-gb&symptoms=${symptoms}&gender=${sex}&year_of_birth=${yob}`
  
  const [diagnosisres, setDiagnosisres] = useState([])
  useEffect (() => {
    if(selectedGender !== '' && selectedSymptoms !== [] && selectedYob !==''){
      const getDiagnosis = async () => { 
      try{
       const response = await axios(diagnosis) 

       console.log(response.data)
       setDiagnosisres(response.data)
      }catch(err){
          console.log(err)
          return <div style={{color: 'red'}} > Request exceeded, Please try later</div>
         }}
  getDiagnosis()
       
   }},[diagnosis,selectedSymptoms, selectedGender, selectedYob])

  //  const {Issue:{Name}, Specialisation: {Name: speName}} = diagnosisres || {}

  
   
    
  return(
    <>
    {diagnosisres && (
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
          onClick={() => (setopenModal(false))} >
          <p> CLOSE </p>
        </div>

    </Modal>
    )}

    </>
  )
  
}

export default DisplayDiagnosis
