import giphy from '../img/giphy.gif'

const Loading = () => {
  return (
    <img src={giphy} alt='Loading...' 
      style={{width:'400px', margin:'auto', display:'block'}}/>
  )
}

export default Loading
