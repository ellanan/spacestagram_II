import { useState, useEffect } from 'react';
import { BiArrowToTop } from 'react-icons/bi';

export const TopPage = () => {
  const [showTopPageButton, setShowTopPageButton] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        setShowTopPageButton(true);
      } else {
        setShowTopPageButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <button onClick={scrollToTop}>
        <BiArrowToTop size={18} />
      </button>
    </>
  );
};
