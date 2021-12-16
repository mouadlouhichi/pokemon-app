import Header from '../parts/Header';
import Sidebar from '../parts/Sidebar';

import './styles.css';
import './reset.css';

const Layout = ({ children }) => (
  <div className='app'>
    <Sidebar />
    <Header />
    <div className='content'>{children}</div>
  </div>
);

export default Layout;
