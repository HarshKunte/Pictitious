import React, {useEffect, useState} from 'react'
import SendIcon from '@material-ui/icons/Send';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';
import { db, timestamp } from '../config';
import { toast } from 'react-toastify';
import firebase from 'firebase'
import {motion} from 'framer-motion'

function Comments({imgId ,user, setIsCommentClicked}) {

    const [input, setInput] = useState(null)
    const [comments, setComments] = useState([])

    const inputHandler = (e)=>{
        let inp = e.target.value;
        setInput(inp)
    }

    const deleteComment =(comment)=>{
        db.collection('images').doc(imgId).update({
            comments: firebase.firestore.FieldValue.arrayRemove(comment)
        }).then(()=>{
            toast('Comment deleted',{
                type:'success'
                
            })
        })
        .catch(()=>{
            toast('Some error occurred',{
                type:'error'
            })
        })
    }

    useEffect(() => {
        const unsub = db.collection("images").doc(imgId)
        .onSnapshot((snap) => {
            // setComments(doc.data().comments)
            let documents =[]
            snap.data().comments.forEach(doc =>{
                documents.push(doc)
            }) 

            setComments(documents);
        });
        return () => {
            unsub()
        }
    }, [input])

    const handleSubmit = (e)=>{
        // console.log("ok");
        e.preventDefault()
        const comment = {comment:input,commentedBy:user}
        db.collection('images').doc(imgId).update({
            comments: firebase.firestore.FieldValue.arrayUnion(comment)
        })
        .then((doc)=> setInput(''))
        .catch(err=>{
            toast('Some error occured!',{type:'error'})
        })
        
    }

    return (
        <motion.div className="backdrop-comments"
        initial={{opacity:0}} animate={{opacity:1}}
        >
            <div className="comments">
                <div className="comment-header shadow">

                <h3>Comments <span style={{color:'grey', fontSize:'1.2rem'}}>{comments.length}</span></h3>
                <HighlightOffIcon onClick={()=> setIsCommentClicked(false)} titleAccess={'close window'} />
                </div>
                <div className="comment-container">
                    {
                        comments.length >0 ? 
                            comments.map((comment,id)=>(
                                <motion.div layout
                                className="comment" key={id}>
                        <p><span><img src={comment.commentedBy.photo} alt=""/>{comment.commentedBy.name}</span>
                        {comment.commentedBy.id === user.id ? <DeleteIcon onClick={()=>deleteComment(comment)} style={{fill:' grey'}} titleAccess={"delete comment"} /> : null} 
                        </p>
                        <p className="comment-line">{comment.comment}.</p>
                    </motion.div>
                            ))
                         :
                        (
                            <h2>No comments on this post yet.</h2>
                        )
                    }
                   
                </div>
                <div className="comment-footer">
                    <form >

                        <input className="comment-input" value={input} onChange={inputHandler} type="text" placeholder="add comment ..."/>
                      

                        {input && <SendIcon onClick={handleSubmit}/>}
                      
                    </form>
                </div>
            </div>
        </motion.div>
    )
}

export default Comments
