import firebase from 'firebase/app'
import 'firebase/auth'
import './App.css';
import Title from './components/Title';
import UploadForm from './components/UploadForm';
import ImageGrid from './components/ImageGrid';
import Modal from './components/Modal';
import ProgressBar from './components/ProgressBar';
import PersonIcon from '@material-ui/icons/Person';
import { useState ,useEffect} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Comments from './components/Comments';
import Footer from './components/Footer';

function App() {
  const [selectedImg, setSelectedImg] = useState(null)
  const [error, setError]= useState();
  const [file, setFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] =useState(false)
  const [user, setUser] = useState(null)
  const [isCommentClicked, setIsCommentClicked] = useState(false)
  const [imgId, setImgId] = useState(null)
  var provider = new firebase.auth.GoogleAuthProvider();
  const signIn = ()=>{
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      let user = result.user;  
      setUser({id:user.uid, name:user.displayName, photo: user.photoURL})
      setIsLoggedIn(true)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      
      setError(error.message);
      // The email of the user's account used.
     
      // ...
    });
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if(user)
      setUser({id:user.uid, name:user.displayName, photo: user.photoURL})
      else
      setUser(null)
      
    })
  }, [])


  return (
    <>
    <div className="App">
      <ToastContainer limit={2}/>
      <div className="header">

     <Title user={user}/>
     {user && <UploadForm user={user} setError={setError} setFile={setFile}/> }
      </div>
      <div className="text-center welcome">
       <p>Welcome to Pictitious!</p>

      {user && <p>Upload image using + icon</p>}
       </div>
     {!user && <div className="d-flex justify-content-center">
     <button className="btn  my-1   btn-outline-success" onClick={signIn}>
       Sign in with Google
       <PersonIcon/>
       </button>

        </div>}
     
     {error && <div className="output">
                 <div className="error">{error}</div>
               
            </div>
}
     {file &&  <ProgressBar user={user} file={file} setFile={setFile}/>  }
     <ImageGrid setSelectedImg={setSelectedImg} user={user} setIsCommentClicked={setIsCommentClicked} setImgId={setImgId}/>
     { selectedImg && 
     <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>
      }
      {isCommentClicked && <Comments user={user} setIsCommentClicked={setIsCommentClicked} imgId={imgId}/>}
    </div>
    <Footer/>
      </>
  );
}

export default App;
