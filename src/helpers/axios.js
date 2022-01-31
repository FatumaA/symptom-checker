import axios from 'axios'
import { urlHealth, apiKey, computedHashString, url } from './constants';

const data = {}
const headers = { 'Authorization': `Bearer ${apiKey}:${computedHashString}`,
'Access-Control-Allow-Origin': "*",
' Access-Control-Allow-Methods': "POST, GET, OPTIONS, DELETE, PUT",
 'Access-Control-Allow-Headers': "Content-Type"

}


axios.interceptors.request.use((config) => {
    // Do something before request is sent
    // if(config.method === 'get'){
            debugger
            config.headers.token = window.localStorage.getItem('authToken')   
        //  }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  axios.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, (error) => {
      debugger
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
        window.localStorage.clear('authToken')
        debugger
        setToken()
    return Promise.reject(error);
  });


let token;

export const setToken = () => { 
    debugger
    axios.post(url, data, { headers })
         .then(response => { 
             debugger; 
             token = { authToken: response.data.Token }; 
             window.localStorage.setItem('authToken', token.authToken)
            })
         .catch(error => console.log('error:', error))
    }
// https://cors-anywhere.herokuapp.com/
export const symptomsURL = `${urlHealth}/symptoms?token=${window.localStorage.getItem('authToken')}&language=en-gb`
export const symptomsURLPath = axios(symptomsURL)   

