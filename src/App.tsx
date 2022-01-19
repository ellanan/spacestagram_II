import { Route, Routes } from 'react-router-dom';

import { Home } from './components/Home';
import { Liked } from './components/Liked';

function App() {
  return (
    <>
      <span className='attribution'>
        Brought to you by NASA's Astronomy Photo of the Day (APOD) API
      </span>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/liked' element={<Liked />} />
      </Routes>
    </>
  );
}

export default App;
