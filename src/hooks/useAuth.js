import firebase from 'firebase'
import { useState ,useEffect} from 'react';

const useAuth = ()=>{
    const [user, setUser] = useState()
    const [error, setError] = useState()
    
    useEffect(() => {
       
       
      
       
    }, [])
   
  return {user, error}
}

export default useAuth;