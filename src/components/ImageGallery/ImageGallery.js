import { Component } from 'react';
import ApiService from '../../services/api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

const apiService = new ApiService();

class ImageGallery extends Component {
  state = {
    gallery: [],
    error: null,
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageSearch;
    const nextName = this.props.imageSearch;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName) {
      this.setState({ status: 'pending' });
      apiService
        .fetchImage(nextName)
        .then(gallery => this.setState({ gallery, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevPage !== nextPage) {
      this.setState({ status: 'pending' });
      apiService
        .fetchImage(prevName, this.state.page)
        .then(gallery => {
          this.setState({
            gallery: [...prevState.gallery, ...gallery],
            status: 'resolved',
          });
          document
            .getElementById('btn')
            .scrollIntoView({ block: 'center', behavior: 'smooth' });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleOnLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { gallery, error, status } = this.state;

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
              <ImageGalleryItem
                key={img.id}
                img={img}
                onClick={this.props.onClick}
              />
            ))}
          </ul>
          <Button onClick={this.handleOnLoadMoreClick} />
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.object),
  onClickImage: PropTypes.func,
};

export default ImageGallery;
