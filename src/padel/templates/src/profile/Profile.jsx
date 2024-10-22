import { React, useState } from 'react';
import styles from './profile.module.css';
import { Link } from 'react-router-dom';
import Tereni from './Tereni.jsx';
import Turniri from './Turniri.jsx'

function Profile() {

  const [terenTurnirToggleState, setTerenTurnirToggleState] = useState("teren");

  function setTeren(){
    if (terenTurnirToggleState !== "teren"){
      setTerenTurnirToggleState("teren");
    }
  }

  function setTurnir(){
    if (terenTurnirToggleState !== "turnir"){
      setTerenTurnirToggleState("turniri");
    }
  }

  return (
    <div className={styles.page}>

      <div className={styles.header}>

        <h1>Profile</h1>
        <Link to={"/"}>
          Home
        </Link>
      </div>

      <div className={styles.content}>

        <div className={styles.sidebar}>

          <img src={require('../images/avatar.png')} alt='' height={100} width={100} className='profilePicture'/>
          <p>Naziv</p>
          <p>Adresa</p>
          <p>Kontakt telefon</p>

        </div>

        <div className={styles.middle}>
          <h2>Title</h2>

          <div className={styles.terenTurnirToggle}>

            <input id="terenOption" type="radio" name="toggleType" hidden="hidden" onClick={setTeren}></input>
            <label className={styles.labelButton} htmlFor='terenOption'>Tereni</label>

            <input id='turnirOption'type="radio" name="ToggleType" hidden="hidden" onClick={setTurnir}></input>
            <label className={styles.labelButton} htmlFor='turnirOption'>Turniri</label>

            {terenTurnirToggleState === "teren" && <Tereni/>}
            {terenTurnirToggleState === "turniri" && <Turniri/>}
            
          </div>

        </div>

      </div>

    </div>
  );
}
export default Profile;
