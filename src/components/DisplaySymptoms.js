import { useState } from 'react'
import Select from 'react-select'

import DisplayDiagnosis from './DisplayDiagnosis'


const DisplaySymptoms = ({symptoms, isLoading, isError, isTokenAbsent}) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [selectedGender, setSelectedGender] = useState('')
  const [selectedYob, setSelectedYob] = useState('')
  
  const [openModal, setopenModal] = useState(false)
  const [showComponent, setShowComponent] = useState(false)
  
  
  
  const handleChange = (e)=>{
          setSelectedSymptoms(Array.isArray(e)? e.map(x => x.value): [] );
        }
   
  
  const handleChangeGender = (selectedGender) => {
          setSelectedGender(selectedGender)
        }
  
  const handleChangeYob= (selectedYob) => {
          setSelectedYob(selectedYob)
        }
   
  const options= symptoms.map(symptom => ({
    'value': symptom.ID,
    'label': symptom.Name
  }))

  const gender = [
    {'value': 'male','label': 'Male'},
    {'value': 'female','label': 'Female'}
  ]
  
  const years=[1940,1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950,
               1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 
               1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971,
               1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981,
               1982,1983, 1984, 1985, 1986, 1987, 1988,1989, 1990, 1991, 1992, 1993, 1994, 1995,
               1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
               2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
 
    const yob= years.map((year) => ({ 'value': year, 'label': year }))

  
    function handleSubmit(e){
      e.preventDefault()
      if(selectedSymptoms !== [] 
          && selectedGender !== ( '' || null ) 
          && selectedYob !== ( ''|| null )) {
         setopenModal(true)
         setShowComponent(true)
      } else { 
        return (
          <div className='error'>
              Please check that the form is filled in correctly before submitting
          </div>
        )
      }
    }


  const handleReset = () => { 
    setSelectedSymptoms([]);
    setSelectedGender(null);
    setSelectedYob(null);  
  }
 
  return (
    isLoading && !isError ? <div className='loading'> <div></div> </div>  :
    isError && !isLoading ?  <div className='error'> App unavailable, please try later</div> :
    <>
      <div className='form-container'>
      <form  onSubmit = { handleSubmit }>

      <label htmlFor='Symptoms-input'>Please select your symptoms</label>
          <Select 
              className='holds-results'
              placeholder='Select Symptoms'
              options={options}
              isMulti
              isSearchable 
              isClearable
              value={options.filter(obj => selectedSymptoms.includes(obj.value))}
              onChange={handleChange}
              defaultValue=''  
              />
          
      <label htmlFor='Gender-input'>Please select your gender</label>
          <Select 
            className='holds-results'
            placeholder='Select Gender'
            value = {selectedGender}
            onChange={handleChangeGender}
            options={gender}
            defaultValue=''
            />
        
        <label htmlFor='Birthyear-input'>Please select your birth year</label>
            <Select 
            className='holds-results'
            placeholder='Select Year'
            value = {selectedYob}
            onChange={handleChangeYob}
            options={yob}
            isSearchable 
            defaultValue=''
            /> 
      
      <button type='submit' className='btn-primary'> Submit </button>

      </form>

      <button className='btn-secondary'
      onClick={handleReset}> Reset Form </button>
      
      {
        showComponent ?
          <DisplayDiagnosis selectedSymptoms={selectedSymptoms} 
              selectedYob={selectedYob}
              selectedGender={selectedGender}
              openModal={openModal}
              setopenModal={setopenModal}
              handleReset={handleReset} 
              isTokenAbsent={isTokenAbsent}
              /> : null
      }
    </div> 
    </>
  )
    
}

export default DisplaySymptoms

