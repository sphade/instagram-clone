import { Button } from "@material-ui/core";
import React from "react";
import db, { storage } from "./firebase";
import firebase from 'firebase'
import './imageupload.css'
function ImageUpload({username}) {
  const [caption, setCaption] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  // const [url, setUrl] = React.useState('');
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    };
    const handleUpload = () => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes)*100
          )
          setProgress(progress)
        },
        (error) => {
          console.log(error);
          alert(error.message)
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              db.collection("post").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imgUrl: url,
                username:username
              })
              setProgress(0)
              setCaption('')
              setImage(null)
          })
        }
      )
    }
  return (
    <div className="imageupload">
      <progress classname='imageupload__progress' value={progress} max="100"></progress>
      <input
        type="text"
        placeholder="enter a caption....."
        value={caption}
        onChange={(e) => {
          setCaption(e.target.value);
        }}
      />
      <input type="file" onChange={handleChange} />
      <Button className="imageupload__button" onClick={handleUpload}>upload</Button>
    </div>
  );
}

export default ImageUpload;
