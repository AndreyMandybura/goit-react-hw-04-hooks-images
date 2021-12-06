import { useState, useEffect } from 'react';
import ApiService from '../../services/api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

const apiService = new ApiService();

function ImageGallery({ imageSearch, onClick }) {
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!imageSearch) {
      return;
    }
    setStatus('pending');
    apiService
      .fetchImage(imageSearch)
      .then(gallery => {
        setGallery(gallery);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [imageSearch]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    setStatus('pending');
    apiService
      .fetchImage(imageSearch, page)
      .then(gallery => {
        setGallery(prevState => [...prevState, ...gallery]);
        setStatus('resolved');
        document
          .getElementById('btn')
          .scrollIntoView({ block: 'center', behavior: 'smooth' });
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [imageSearch, page]);

  const handleOnLoadMoreClick = () => {
    setPage(prevState => prevState + 1);
  };

  if (status === 'idle') {
    return <div></div>;
  }

  if (status === 'pending') {
    return (
      <Loader
        className={s.Loader}
        type="Puff"
        color="#00BFFF"
        height={250}
        width={250}
        timeout={3000}
      />
    );
  }

  if (status === 'rejected') {
    return <h1>{error.message}</h1>;
  }

  if (status === 'resolved') {
    return (
      <div className={s.GalleryBox}>
        <ul className={s.ImageGallery}>
          {gallery.map(img => (
            <ImageGalleryItem key={img.id} img={img} onClick={onClick} />
          ))}
        </ul>
        <Button onClick={handleOnLoadMoreClick} />
      </div>
    );
  }
}

ImageGallery.propTypes = {
  imageSearch: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGallery;
