import { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import './App.css';

class App extends Component {
  state = {
    imageSearch: '',
    largeImageURL: '',
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleFormSubmit = imageSearch => {
    this.setState({ imageSearch });
    console.log(imageSearch);
  };

  setLargeImage = ({ largeImageURL }) => {
    this.setState({ largeImageURL, showModal: true });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          imageSearch={this.state.imageSearch}
          onClick={this.setLargeImage}
        />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.state.largeImageURL} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
