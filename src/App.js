import "./App.css";
import React, { useState, useEffect } from "react";
import logo from "./logo.jpg";
import Post from "./Post";
import db from "./firebase";
import ImageUpload from "./ImageUpload";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import "./modal.css";
import { auth } from "./firebase";
import InstagramEmbed from "react-instagram-embed";
export default function App() {
  const [posts, setPosts] = useState([]);

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(null);

  useEffect(() => {
    db.collection("post")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "1px solid blue",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: userName,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
    setOpen(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [user, userName]);

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      alert(err.message);
    });
    setOpenSignIn(false);
  };

  return (
    <div className="app">
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <center>
            <form className={`${classes.paper} app__signup`} style={modalStyle}>
              <Input
                placeholder="user name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={signUp}
                type="submit"
              >
                sign up
              </Button>
            </form>
          </center>
        </Modal>

        <Modal
          open={openSignIn}
          onClose={() => {
            setOpenSignIn(false);
          }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <center>
            <form className={`${classes.paper} app__signup`} style={modalStyle}>
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={signIn}
                type="submit"
              >
                sign In
              </Button>
            </form>
          </center>
        </Modal>
      </div>

      <div className="app__header">
        <img className="app__headerImage" src={logo} alt="logo" />

        {user ? (
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            type="button"
            onClick={() => {
              auth.signOut();
            }}
          >
            logout
          </Button>
        ) : (
          <div className="app__loginContainer">
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              type="button"
              onClick={handleOpen}
            >
              signUp
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              type="button"
              onClick={() => setOpenSignIn(true)}
            >
              Login
            </Button>
          </div>
        )}
      </div>
      <div className="app__posts">
        {posts.map(({ post, id }) => {
          return (
            <Post
            postId={id}
              key={id}
              imgUrl={post.imgUrl}
              caption={post.caption}
              userName={post.username}
              user={user}
            />
          );
        })}
      </div>

      <InstagramEmbed
        url="https://instagr.am/p/Zw9o4/"
        maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>sorry u need to login</h3>
      )}
    </div>
  );
}
