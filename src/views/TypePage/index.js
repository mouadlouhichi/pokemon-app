import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg';
import noResult from '../../assets/images/no-result.png';

import Card from '../../components/parts/Card';
import Loading from '../../components/parts/Loading';

import './styles.css';

const TypePage = () => {
  let params = useParams();
  const { id } = params;
  const [type, setType] = useState({});
  const [pokemons, setPokemons] = useState([]);
  const [nextIdx, setNextIdx] = useState(20);
  const [prevIdx, setPrevIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const initialURL = `https://pokeapi.co/api/v2/type/${id}/`;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      let response = await fetch(initialURL).then((res) => res.json());
      setType(response);
      const pokemons = [...response.pokemon];
      const current = pokemons.slice(prevIdx, nextIdx);

      await loadPokemon(current);
      setIsLoading(false);
    }
    fetchData();
  }, [initialURL, nextIdx, prevIdx]);

  const next = () => {
    let step = 20;
    if (nextIdx + 20 === type.pokemon.length) return;
    else if (nextIdx + 20 > type.pokemon.length) {
      step = type.pokemon.length - nextIdx;
    }

    setNextIdx((prev) => prev + step);
    setPrevIdx((prev) => prev + step);
  };

  const prev = () => {
    if (prevIdx === 0) return;
    else if (prevIdx - 20 < 0  && prevIdx > 0) {
      setNextIdx(20);
      setPrevIdx(0);
    } else {
      setNextIdx((prev) => prev - 20);
      setPrevIdx((prev) => prev - 20);
    }
  };

  const loadPokemon = async (data) => {
    let results = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await fetch(pokemon.pokemon.url).then((res) =>
          res.json()
        );
        return pokemonRecord;
      })
    );
    setPokemons(results);
  };


  return (
    <div className='type-page'>
      <div className='pokemon-browse'>
        <h3>Browse all pokemon Types | {type.name}</h3>
        <div className='pokemon-pagination'>
          <Arrow role='button' className='left' onClick={prev} disabled />
          <Arrow role='button' className='right' onClick={next} />
        </div>
      </div>
      <div className='pokemons'>
        {isLoading ? (
          <Loading />
        ) : pokemons.length === 0 ? (
          <img className='no-result' src={noResult} alt='No Result' />
        ) : (
          pokemons.map((pokemon, i) => {
            return <Card key={pokemon.id} pokemon={pokemon} idx={i} />;
          })
        )}
      </div>
    </div>
  );
};

export default TypePage;
