import axios from 'axios'
import { urlHealth, apiKey, computedHashString, url } from './constants';

const data = {}
const headers = { 'Authorization': `Bearer ${apiKey}:${computedHashString}` }

let token;


// gets and stores the token from the apimedic api
export const setToken = (hint) => { 
            axios.post(url, data, { headers })
            .then(response => { 
                if(hint === 'symptoms') {
                    token = response.data.Token; 
                    window.localStorage.setItem('authToken', token)
                    window.location.reload()
                }
                token = response.data.Token; 
                window.localStorage.setItem('authToken', token)
               })
            .catch(error => console.log('error:', error))
    }


export const storedToken = window.localStorage.getItem('authToken');

const symptomsURL = `${urlHealth}/symptoms?token=${storedToken}&language=en-gb`
export const symptomsURLPath = axios(symptomsURL)
