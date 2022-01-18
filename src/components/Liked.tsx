import { Navbar } from './Navbar';

export const Liked = () => {
  return (
    <div className='main-wrapper'>
      <Navbar />
      <span className='attribution'>
        Brought to you by NASA's Astronomy Photo of the Day (APOD) API
      </span>
      <h1>This is liked page!</h1>
    </div>
  );
};
