import React, { useState } from 'react';
import styles from './register.module.css';
import { Link, useNavigate } from 'react-router-dom';


function Register() {

  const [passwordState, setPasswordState] = useState('password');

  function toggleShowPassword(){

    setPasswordState(passwordState ==='password' ? 'text': 'password');
    

  };

  let navigate = useNavigate();
  const routeToLogin = () => {
    let path = '/Login';
    navigate(path);
  };

  function printFormData(){}

  

  return (

    <div class={styles.page}>
    
      <div className={styles.header}>
        <h1>Register</h1>
        <Link to={"/"}>
          Home
        </Link>
      </div>

      <form className={styles.register} id='submitForm' onSubmit={printFormData}>

        <div className={styles.accountType}>

          <input  type='radio' id='player' name='type' defaultChecked></input>
          <label className='accountTypeButton' htmlFor='player'>Player</label>
          <input  type='radio' id='owner' name='type'></input>
          <label className='accountTypeButton' htmlFor='owner'>Owner</label>
          
        </div>

        <div className={styles.username}>
          <p>Username</p>
          <input type='text' placeholder='Username'></input>
        </div>

        <div className={styles.email}>
          <p>Email</p>
          <input type='email' placeholder='example@mail.com'></input>
        </div>

        <div className={styles.password} id='password'>
          <p>Password</p>

          <div className={styles.passwordInput}>

            <input type={passwordState} placeholder='Password'></input>
            <input type='checkbox' name='togglePassword' hidden='hidden'></input>
            <img htmlFor='togglePassword' src={require('../images/showPassword.png')} height={30} width={30} alt='' onClick={toggleShowPassword}></img>
          
          </div>

        </div>

        <button onClick id='confirm'>Register</button>
        <p>Already have an account?</p>
        <button type='button' onClick={routeToLogin}>Sign in</button>

      </form>
    </div>
  );
}
export default Register;
