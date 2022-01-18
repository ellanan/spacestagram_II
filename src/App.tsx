import { Route, Routes } from 'react-router-dom';

import { Home } from './components/Home';
import { Liked } from './components/Liked';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/liked' element={<Liked />} />
      </Routes>
    </>
  );
}

export default App;
