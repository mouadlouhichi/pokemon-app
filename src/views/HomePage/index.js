import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg';
import pokemonImage from '../../assets/images/pokemon-card.png';
import noResult from '../../assets/images/no-result.png';

import Card from '../../components/parts/Card';
import Loading from '../../components/parts/Loading';

import './styles.css';

const HomePage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const pokimensRef = useRef(null);

  const executeScroll = () => pokimensRef.current.scrollIntoView();

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(initialURL).then((res) => res.json());
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setIsLoading(true);
    let data = await fetch(nextUrl).then((res) => res.json());
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setIsLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setIsLoading(true);
    let data = await fetch(prevUrl).then((res) => res.json());
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setIsLoading(false);
  };

  const loadPokemon = async (data) => {
    let results = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await fetch(pokemon.url).then((res) => res.json());
        return pokemonRecord;
      })
    );
    setPokemons(results);
  };
  return (
    <div className='home-page'>
      <div className='main-card'>
        <div className='info'>
          <h2>Nostalgia, Enjoy the Pokemon experience with PokemonApp</h2>
          <p>
            “Make your wonderful dream a reality, and it will become your
            truth.” — N.
          </p>

          <button onClick={() => executeScroll()} className='call-to-action'>
            Browse Now
          </button>
        </div>
        <img className='pokemon' src={pokemonImage} alt='Pokemon' />
      </div>
      <div className='pokemon-browse'>
        <h3>Browse all pokemon</h3>
        <div className='pokemon-pagination' ref={pokimensRef}>
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

export default HomePage;
