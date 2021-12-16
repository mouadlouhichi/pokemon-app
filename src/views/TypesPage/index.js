import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { backgroundColors, getTypeIdx } from '../../utils';

import noResult from '../../assets/images/no-result.png';

import Loading from '../../components/parts/Loading';

import './styles.css';

const TypesPage = () => {
  const navigate = useNavigate();

  const [pokemonsTypyes, setPokemonsTypyes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const initialURL = `https://pokeapi.co/api/v2/type/`;

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(initialURL).then((res) => res.json());

      await setPokemonsTypyes(response.results);
      setIsLoading(false);
    }
    fetchData();
  }, [initialURL]);

  return (
    <div className='types-page'>
      {isLoading ? (
        <Loading />
      ) : pokemonsTypyes.length === 0 ? (
        <img className='no-result' src={noResult} alt='No Result' />
      ) : (
        pokemonsTypyes.map((type, i) => {
          return (
            <div
              key={i}
              style={{ backgroundColor: backgroundColors[i] }}
              className='type'
              onClick={() => navigate(`/types/${getTypeIdx(type.url)}`)}
            >
              {type.name}
            </div>
          );
        })
      )}
    </div>
  );
};

export default TypesPage;
