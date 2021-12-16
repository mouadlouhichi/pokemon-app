import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import me from '../../../assets/images/me.webp';
import './styles.css';

const Header = () => (
  <div className='header'>
    {/* TODO: Add Search feature */}
    <div className='search-input'>
      <div className='search-icon'>
        <SearchIcon />
      </div>
      <input type='text' placeholder='Search' />
    </div>
    {/* TODO: Add Filter by Type feature */}
    <div className='profile'>
      <img src={me} alt='Mouad Louhichi' />
      <div className='details'>
        <h2>Mouad Louhichi</h2>
        <p>moaudlouhichi@gmail.com</p>
      </div>
    </div>
  </div>
);
export default Header;
