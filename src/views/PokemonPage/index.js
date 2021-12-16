import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { typeColors, getTypeIdx } from '../../utils/index';
import Loading from '../../components/parts/Loading';
import noResult from '../../assets/images/no-result.png';

import './styles.css';

const PokemonPage = () => {
  let params = useParams();
  const navigate = useNavigate();

  const { name } = params;

  const [pokemon, setPokemon] = useState({});
  const [evoChain, setEvoChain] = useState([]);
  const [evoChainIdx, setEvoChainIdx] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
  const evolutionUrl = 'http://pokeapi.co/api/v2/evolution-chain/';

  const fetchData = async (name) => {
    setIsLoading(true);

    let response = await fetch(`${baseUrl}${name}`).then((res) => res.json());
    setPokemon(response);
    getEvoChain(response.id);
  };

  useEffect(() => {
    fetchData(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const getEvoChain = async (id) => {
    let response = await fetch(`${evolutionUrl}${id}`).then((res) =>
      res.json()
    );
    const chain = response.chain;
    if (name !== chain.species.name) {
      setEvoChain((prev) => [...prev, chain.species.name]);
    }

    const getEvo = (arr) => {
      if (arr[0].evolves_to.length > 0) {
        setEvoChain((prev) => [...prev, arr[0].species.name]);
        getEvo(arr[0].evolves_to);
      } else {
        setEvoChain((prev) => [...prev, arr[0].species.name]);
        return 0;
      }
    };
    getEvo([chain]);
    setIsLoading(false);
  };

  const handleEvolution = () => {
    if (evoChainIdx === evoChain.length) return;
    const fetchEvalued = async () => {
      setEvoChainIdx((prev) => prev + 1);
      let response = await fetch(`${baseUrl}${evoChain[evoChainIdx]}`).then(
        (res) => res.json()
      );
      setPokemon(response);
    };
    fetchEvalued();
  };

  return (
    <div className='pokemon-page'>
      {isLoading ? (
        <Loading />
      ) : Object.keys(pokemon).length === 0 ? (
        <img className='no-result' src={noResult} alt='No Result' />
      ) : (
        <div className='pokemon-view'>
          <div className='info'>
            <h2>{pokemon.name}</h2>
            <div className='pokemon-types'>
              {pokemon.types.map((type, idx) => {
                return (
                  <div
                    key={idx}
                    className='pokemon-type'
                    onClick={() =>
                      navigate(`/types/${getTypeIdx(type.type.url)}`)
                    }
                    style={{ backgroundColor: typeColors[type.type.name] }}
                  >
                    {type.type.name}
                  </div>
                );
              })}
            </div>
            <div className='pokemon-infos'>
              <div className='pokemon-info'>
                <p className='title'>Weight</p>
                <p>{pokemon.weight}</p>
              </div>
              <div className='pokemon-info'>
                <p className='title'>Height</p>
                <p>{pokemon.height}</p>
              </div>
              <div className='pokemon-info'>
                <p className='title'>Abilities</p>
                <p>
                  {pokemon.abilities.map((item, i) => {
                    if (item.is_hiden) return null;
                    return <span key={i}>{item.ability.name} </span>;
                  })}
                </p>
              </div>
              <div className='pokemon-info'>
                <p className='title'>Moves</p>
                <p>{pokemon.moves.length}</p>
              </div>
            </div>
            <button
              onClick={() => handleEvolution(pokemon.id)}
              className='call-to-action'
              disabled={evoChainIdx === evoChain.length}
            >
              Level Up
            </button>
          </div>
          <img
            className='pokemon'
            src={pokemon.sprites.other.dream_world.front_default}
            alt='Pokemon'
          />
        </div>
      )}
    </div>
  );
};

export default PokemonPage;
