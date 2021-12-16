import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/layout';

import HomePage from './views/HomePage';
import PokemonPage from './views/PokemonPage';
import TypesPage from './views/TypesPage';
import TypePage from './views/TypePage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/types/' element={<TypesPage />} />
          <Route path='/types/:id' element={<TypePage />} />
          <Route path='/pokemon/:name' element={<PokemonPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
