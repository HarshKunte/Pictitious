import React, { useState } from 'react'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

function UploadForm({setError, setFile}) {
    
   
    const types = ['image/png', 'image/jpeg']
    const changeHandler = (e)=>{
        let selected = e.target.files[0];
        console.log(selected);
    
        if(selected && types.includes(selected.type)) {
            setFile(selected);
            setError('')
        }
        else{
            setError('Please select an image file (png or jpeg)')
        }
    }
    return (
        <form className='upload_form'>
            {/* <label>

            <input type="file" onChange={changeHandler} />
            <span>+</span>
            </label> */}
      <label  htmlFor="icon-button-file" className="upload_label" >
            <input accept="image/*" id="icon-button-file" 
        type="file" style={{ opacity:'0' }} onChange={changeHandler} />
        {/* <IconButton color="primary"  aria-label="upload picture" 
        component="span">
          <PhotoCamera />
        </IconButton> */}
        <AddCircleOutlineRoundedIcon className="upload_btn" style={{width:'3rem',height:'3rem',cursor:'pointer'}} titleAccess={'upload'} />
      </label>
           
        </form>
    )
}

export default UploadForm
