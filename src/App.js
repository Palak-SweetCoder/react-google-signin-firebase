import './App.css';
import app from './firebase.init';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

const auth = getAuth(app)

function App() {

  const [user, setUser] = useState({});


  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .then(error => {
        console.log(error);
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setUser({});
      })
  }

  return (

    <div className="App">

      <div>
        {
          user.email?<h1>You are logged in</h1>
          :
          <h1>Please Sign In</h1>
        }

        {user.email?<button onClick={handleSignOut}>Sign out</button>
        :
        <button onClick={handleGoogleSignIn}>Google sign in</button>
        }
      </div>

      <div>
        <img src={user.photoURL} alt="" />
        <h2>{user.displayName}</h2>
        <p><small>{user.email}</small></p>
      </div>

    </div >

  );
}

export default App;
