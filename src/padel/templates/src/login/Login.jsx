import React from 'react';
import styles from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  let navigate = useNavigate();
  const routeToRegister = () => {
    let path = '/Register'
    navigate(path);
  }

  return (
    <>
      <div className={styles.header}>
      <h1>Login</h1>
        <Link to={"/"}>
          Home
        </Link>
      </div>
      <form className={styles.login}>
        <div className={styles.username}>
          <p>Username</p>
          <input type='text' placeholder='Username'></input>
        </div>
        <div className={styles.password}>
          <p>Password</p>
          <input type='password' placeholder='Password'></input>
        </div>
        <button onClick={''}>Sign in</button>
        <p>New to BadelPadel?</p>
        <button onClick={routeToRegister}>Register</button>
      </form>
    </>
  );
}
export default Login;
