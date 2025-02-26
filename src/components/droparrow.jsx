import { useEffect } from 'react';
import '../styles/App.scss';
import droparrow from '../assets/arrow.png';

function DropArrow() {
  useEffect(() => {
    const handleScroll = () => {
      const dropArrow = document.querySelector('.drop-arrow');
      if (window.scrollY > 200) {
        dropArrow.style.display = 'block'; 
      } else {
        dropArrow.style.display = 'none'; 
      }
    };

    window.addEventListener('scroll', handleScroll);
    
   return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="content-drop-arrow">
      <div className="drop-arrow" onClick={scrollToTop}>
        <img src={droparrow} alt="Flèche vers le haut" />
      </div>
    </div>
  );
}

export default DropArrow;
