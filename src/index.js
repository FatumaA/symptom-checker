import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// axios.interceptors.request.use((request, response)=>{
//   if(request.method === 'get'){
//       debugger
//       request.headers.token = window.localStorage.getItem('authToken')
//       if(response.status === 400){
//           debugger
//           setToken()
//       }
//   }
// })

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
