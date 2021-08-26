import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import post from "./post.jpg";
import "./post.css";
import db from "./firebase";
import firebase from "firebase";
function Post({ imgUrl, caption, userName, postId, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("post")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);
  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="LawalAdebola" />

        <h1>{userName}</h1>
      </div>
      <img src={imgUrl} className="post__img" alt="" />
      <h4 className="post__text">
        <strong>{userName} </strong>
        {caption}
      </h4>
      <div className="post__comment">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post__commentBox">
          <input
            type="text"
            className="post__input"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              db.collection("post").doc(postId).collection("comments").add({
                text: comment,
                username: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
              setComment("");
            }}
          >
            post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
