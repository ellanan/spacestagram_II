import { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import _ from 'lodash';

import { useLocalStorage } from './hooks/useLocalStorage';
import { Home } from './components/Home';
import { Liked } from './components/Liked';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const [likedItems, setLikedItems] = useLocalStorage<Array<string>>(
    'likedItems',
    []
  );

  const setItemLikedOrNotLiked = useCallback(
    (isLiked: boolean, itemId: string) => {
      setLikedItems(
        isLiked ? [...likedItems, itemId] : _.without(likedItems, itemId)
      );
    },
    [likedItems, setLikedItems]
  );

  return (
    <>
      <Navbar />
      <span className='attribution'>
        Brought to you by NASA's Astronomy Photo of the Day (APOD) &&nbsp;
        <a className='apod-api' href='https://github.com/ellanan/apod-api'>
          APOD-API
        </a>
      </span>
      {loading ? (
        <span className='loading'>Loading data from APOD-API...</span>
      ) : null}
      <Routes>
        <Route
          path='/'
          element={
            <Home
              setLoading={setLoading}
              likedItems={likedItems}
              setItemLikedOrNotLiked={setItemLikedOrNotLiked}
            />
          }
        />
        <Route
          path='/liked'
          element={
            <Liked
              setLoading={setLoading}
              likedItems={likedItems}
              setItemLikedOrNotLiked={setItemLikedOrNotLiked}
            />
          }
        />
      </Routes>
      <Footer />
      <Modal
        likedItems={likedItems}
        setItemLikedOrNotLiked={setItemLikedOrNotLiked}
      />
    </>
  );
}

export default App;
