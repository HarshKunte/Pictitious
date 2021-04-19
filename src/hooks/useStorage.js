import React, {useState,useEffect} from 'react'
import {storage, db, timestamp} from '../config'

const useStorage = (file,user) =>{
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] =useState(null);



useEffect(()=>{
    const storageRef = storage.ref(file.name)
    const dbRef = db.collection('images');
    storageRef.put(file).on('state_changed', (snap)=>{
        let percentage = (snap.bytesTransferred/ snap.totalBytes) *100
        setProgress(percentage)
    }, (err)=> setError(err) ,async ()=>{
        const url = await storageRef.getDownloadURL()
        const createdAt = timestamp();
        const createdBy = user.name;
        const userPhoto = user.photo
        const userId = user.id
        dbRef.add({url, createdAt, createdBy,userId, userPhoto, comments:[], likes:0, likedBy:[]})
        setUrl(url)
    })

},[file])

return {progress, url, error}


}

export default useStorage; 