import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import firebase from 'firebase'
import { toast } from 'react-toastify';

const Title = ({user}) => {
  const signOut = ()=>{
    firebase.auth().signOut().then(() => {
     
    }).catch((error) => {
      // An error happened.
      toast('Error signing out.',{
        type:'error'
      })
    });
  }
  return (
    <div className="title">
      <h2 style={{flexGrow:1}}>Pictitious</h2>
      {user && <ExitToAppIcon style={{width:'2.5rem',height:'2.5rem',marginLeft:'0.5rem', fill:'grey'}} titleAccess={'Log out'}  onClick={signOut}/>}
    </div>
  )
}

export default Title;