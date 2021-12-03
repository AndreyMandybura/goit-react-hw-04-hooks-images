import { useState } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import './App.css';

function App() {
  const [imageSearch, setImageSearch] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFormSubmit = imageSearch => {
    setImageSearch(imageSearch);
    console.log(imageSearch);
  };

  const setLargeImageURL = largeImage => {
    setLargeImage(largeImage);
    setShowModal(true);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery imageSearch={imageSearch} onClick={setLargeImageURL} />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt="" />
        </Modal>
      )}
    </div>
  );
}

export default App;
