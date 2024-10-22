import React from 'react';
import styles from './home.module.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className={styles.header}>
      <h1>Home</h1>
      <nav className={styles.navigation}>
        <li>
          <Link to={"./Login"}>
            Login
          </Link>
        </li>
        <li>
          <Link to={"./Register"}>
            Register
          </Link>
        </li>
        <li>
          <Link to={"./Profile"}>
            Profile
          </Link>
        </li>
      </nav>
    </div>
  );
}
export default Home;
