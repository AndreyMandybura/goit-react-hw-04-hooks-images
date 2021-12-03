import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({
  img: { tags, webformatURL, largeImageURL },
  onClick,
}) {
  return (
    <li
      className={s.ImageGalleryItem}
      onClick={() => onClick({ largeImageURL })}
    >
      <img className={s.ImageGalleryItem_image} src={webformatURL} alt={tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
  werformatURL: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
