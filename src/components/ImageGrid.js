import React from 'react'
import useFireStore from '../hooks/useFireStore'
import {motion} from 'framer-motion'
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from "react-toastify";
import firebase from 'firebase'
import { db } from '../config';
function ImageGrid({user, setSelectedImg, setImgId, setIsCommentClicked}) {
    const {docs} = useFireStore('images')
    const incLike = (id)=>{
        if(user){
        db.collection('images').doc(id).update({
            likes: firebase.firestore.FieldValue.increment(1),
            likedBy: firebase.firestore.FieldValue.arrayUnion(user)
        })
        .then(()=> console.log("done"))
        .catch((err)=>{
            console.log(err);
        })
    }
    else{
        console.log("no");
        toast('😕You have to signin to like this pic!', {
            type: 'error'
        })
    }
    }
    const disLike=(id)=>{
        db.collection('images').doc(id).update({
            likes: firebase.firestore.FieldValue.increment(-1),
            likedBy: firebase.firestore.FieldValue.arrayRemove(user)
        })
        .then(()=> console.log("done"))
        .catch((err)=>{
            console.log(err);
        })
    }

    const commentClickHandler =(id)=>{
        if(user){
            setIsCommentClicked(true);
            setImgId(id)
        }
        else{
            console.log("no");
            toast('😕You have to signin to comment!', {
                type: 'error'
            })
        }
    }

    const deleteImg = (imgId)=>{
      db.collection('images').doc(imgId).delete()
      .then(()=>{
        toast('Post deleted',{type:'dark', hideProgressBar:true, autoClose:3000})
      })
      .catch(err=>{
          toast('some error occurred!',{type:'error'})
      })
    }

    return (
        <div className="container mt-md-5 mb-5 mt-1">
            <div className="row" 
           
            >
            {docs && docs.map(doc =>(
                <motion.div className="col-md-4 my-md-5 my-5 col-sm-12 img-wrap" 
               
               
                layout
                key={doc.id}
                
                >  
                    <div className="mb-2">

                     <p className="user_name"><span><img src={doc.userPhoto} alt="user avatar" style={{width:'2.5rem', height:'2.5rem', borderRadius:'50%', marginRight:'0.5rem'}}/>{doc.createdBy}</span>
                     {user && doc.userId==user.id? 
                        <DeleteIcon style={{fill:'#82998f'}} onClick={()=>deleteImg(doc.id)} titleAccess={'Delete Post'}/> : null 
                    }
                     </p>
                    </div>
                    
                    <motion.img src={doc.url} alt="uploaded pic"
                     initial={{opacity:0}}
                     animate={{opacity:1}}
                     
                     transition={{delay:0.5}}
                     onClick={()=> setSelectedImg(doc.url) }
                     />
                    
                      <div className="info">
                          <div style={{flexGrow:1, paddingLeft:'5px'}}>
                        
                        {
                            user && doc.likedBy.some(u => u.id === user.id) ? 
                            <FavoriteIcon 
                             onClick={()=>disLike(doc.id)}/>
                            :
                         <FavoriteBorderIcon onClick={()=>incLike(doc.id)}/>
                        }
                       
                         <span>{doc.likes} likes</span>
                          </div>
                         <CommentIcon  style={{right:0, fill:"black"}} onClick={()=>commentClickHandler(doc.id)}/>
                     </div>
                       

                </motion.div>
                 ))}
            </div>
        </div>
        // <div className="img-grid">
        //     {docs && docs.map(doc =>(
        //         <motion.div className="img-wrap" key={doc.id}
        //         whileHover={{opacity:1}}
        //         layout
        //         onClick={()=> setSelectedImg(doc.url) }
        //         >
        //             <motion.img src={doc.url} alt="uploaded pic"
        //             initial={{opacity:0}}
        //             animate={{opacity:1}}
        //             transition={{delay:0.5}}
        //             />
        //         </motion.div>
        //     ))}
        // </div>
    )
}

export default ImageGrid
