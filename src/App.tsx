import { Route, Routes } from 'react-router-dom';

import { Home } from './components/Home';
import { Liked } from './components/Liked';
import { Navbar } from './components/Navbar';
import { TopPage } from './components/TopPage';

function App() {
  return (
    <>
      <Navbar />
      <span className='attribution'>
        Brought to you by NASA's Astronomy Photo of the Day (APOD) API
      </span>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/liked' element={<Liked />} />
      </Routes>
    </>
      <TopPage />
  );
}

export default App;
