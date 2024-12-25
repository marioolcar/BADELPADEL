
//________________________________________________________

//dobivanje svih turnira


import axios from 'axios';

const getTurniri = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/turniri/');
    console.log('Turniri:', response.data);
  } catch (error) {
    console.error('Greška prilikom dohvaćanja turnira:', error);
  }
};

getTurniri();

//_____________________________________________________

// dodavanje novog turnira

import axios from 'axios';

const createTurnir = async () => {
  const token = 'YOUR_AUTH_TOKEN'; // Zamijeni s dobivenim tokenom
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/turniri/',
      {
        naziv: 'Proljetni turnir',
        teren: 1, // ID terena
        datum_pocetka: '2024-03-01T10:00:00',
        datum_kraja: '2024-03-01T18:00:00',
        cijena_kotizacije: 150.0,
        nagrade: 'Pehar i medalje',
        opis: 'Otvoren turnir za sve.',
        organizator: 1, // ID vlasnika
        otvorenost: 'otvoren',
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log('Kreiran turnir:', response.data);
  } catch (error) {
    console.error('Greška prilikom kreiranja turnira:', error);
  }
};

createTurnir();


//_____________________________________________________

// brisanje turnira


import axios from 'axios';

const deleteTurnir = async (turnirId) => {
  const token = 'YOUR_AUTH_TOKEN'; // Zamijeni s dobivenim tokenom
  try {
    await axios.delete(`http://127.0.0.1:8000/turniri/${turnirId}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    console.log('Turnir obrisan.');
  } catch (error) {
    console.error('Greška prilikom brisanja turnira:', error);
  }
};

deleteTurnir(1); // Zamijenite `1` s ID-om turnira koji želite obrisati

