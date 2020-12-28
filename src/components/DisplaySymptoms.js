import {useState} from 'react'
import Select from 'react-select'
import Loading from './Loading'
import DisplayDiagnosis from './DisplayDiagnosis';


const DisplaySymptoms = ({symptoms, isLoading}) => {
  
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [selectedGender, setSelectedGender] = useState('')
  const [selectedYob, setSelectedYob] = useState('')

  const [openModal, setopenModal] = useState(false)
  
 
  
  const handleChange = (e)=>{
          setSelectedSymptoms(Array.isArray(e)? e.map(x => x.value): [] );
        }
   
  
  const handleChangeGender =(e) => {
    setSelectedGender(e.value)
    }
  
  const handleChangeYob=(e) => {
      setSelectedYob(e.label)
    }
   
 

  const options= symptoms.map(symptom => ({
    'value': symptom.ID,
    'label': symptom.Name
  }))

  const gender = [
    {'value': 'male','label': 'Male'},
    {'value': 'female','label': 'Female'}
  ]
  
  const years=[ 1930,1931,1932,1933,1934,1935,1936,1937,1938,1939,1940,
               1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950,
               1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 
               1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971,
               1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981,
               1982,1983, 1984, 1985, 1986, 1987, 1988,1989, 1990, 1991, 1992, 1993, 1994, 1995,
               1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
               2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
 
    const yob= years.map((year, index) => ({
      'value': index,
      'label': year
    }))

  
    function handleSubmit(e){
      e.preventDefault()
     
      }
  
  return (
    // isLoading? <div className='error'> App unavailable, please try later</div>
    // : 
    <>
    <div className='form-container'>
    <form  onSubmit ={handleSubmit}>

    <label htmlFor='Symptoms-input'>Please select your symptoms</label>
        <Select 
            className='holds-results'
            placeholder='Select symptoms'
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
          value={gender.find(selectedGender => selectedGender.value === selectedGender)}
          onChange={handleChangeGender}
          options={gender} 
          defaultInputValue=''
          />
      
      <label htmlFor='Birthyear-input'>Please select your birth year</label>
          <Select 
          className='holds-results'
          placeholder='Select year'
          value={yob.find(selectedYob => selectedYob.label === selectedYob)}
          onChange={handleChangeYob}
          options={yob}
          isSearchable 
          defaultValue=''
          /> 
  
    <button type='submit' className='btn-primary' onClick={()=> setopenModal(true)} > Submit </button>
  
    <button className='btn-secondary' > Reset Form </button>
      
    </form>

    <DisplayDiagnosis selectedSymptoms={selectedSymptoms} 
        setSelectedSymptoms={setSelectedSymptoms}
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender} 
        selectedYob={selectedYob}
        setSelectedYob={setSelectedYob}
        openModal={openModal}
        setopenModal={setopenModal}
        />
  </div> 
    </>
  )
    
}

export default DisplaySymptoms

