import { useNavigate } from 'react-router-dom';

import { backgroundColors, typeColors, getTypeIdx } from '../../../utils';
import './styles.css';

const Card = ({ pokemon, idx }) => {
  const navigate = useNavigate();

  const bg = pokemon.sprites.other.dream_world.front_default
    ? pokemon.sprites.other.dream_world.front_default
    : pokemon.sprites.back_default;

  return (
    <div className='pokemon-card'>
      <div
        className='pokemon-img'
        style={{
          backgroundImage: `url(${bg})`,
          backgroundColor: backgroundColors[idx],
        }}
      />
      <h4> {pokemon.name}</h4>
      <div className='pokemon-types'>
        {pokemon.types.map((item, idx) => {
          return (
            <button
              onClick={() => navigate(`/types/${getTypeIdx(item.type.url)}`)}
              key={idx}
              className='pokemon-type'
              style={{ backgroundColor: typeColors[item.type.name] }}
            >
              {item.type.name}
            </button>
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
          <p className='title'>Ability</p>
          <p>{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
      <button
        className='pokemon-btn'
        onClick={() => navigate(`/pokemon/${pokemon.name}`)}
      >
        View Pokemon
      </button>
    </div>
  );
};

export default Card;
