import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../../assets/icons/home.svg';
import { ReactComponent as HomeClose } from '../../../assets/icons/close.svg';
import { ReactComponent as TypesIcon } from '../../../assets/icons/types.svg';
import { ReactComponent as MenuIcon } from '../../../assets/icons/burger.svg';
import logo from '../../../assets/images/logo.png';

import './styles.css';

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(true);

  return (
    <>
      <div className='menu-icon' onClick={() => setIsClosed((prev) => !prev)}>
        <MenuIcon />
      </div>
      <div className={`sidebar ${isClosed ? 'is-closed' : ''}`} >
      
        <div className='logo'>
          <img src={logo} alt='Logo' />
          <h1>PokemonApp </h1>
          <div className='menu-close' onClick={() => setIsClosed((prev) => !prev)}>
          <HomeClose />
        </div>
        </div>
        <nav>
          <NavLink to='/'>
            <HomeIcon /> <span>Home</span>
          </NavLink>
          <NavLink to='/types'>
            <TypesIcon /> <span>Types</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
