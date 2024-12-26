import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tereni = () => {
  const [tereni, setTereni] = useState([]);

  useEffect(() => {
    const fetchTereni = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/tereni/');
        setTereni(response.data);
      } catch (error) {
        console.error('Greška prilikom dohvaćanja terena:', error);
      }
    };

    fetchTereni();
  }, []);

  return (
    <div>
      {tereni.map((teren) => (
        <div key={teren.id}>
          <h3>{teren.lokacija_grad}, {teren.lokacija_ulica}</h3>
          <p>Tip: {teren.tip}</p>
          {teren.slika_url && <img src={teren.slika_url} alt="Teren" style={{ width: '200px' }} />}
        </div>
      ))}
    </div>
  );
};

export default Tereni;
