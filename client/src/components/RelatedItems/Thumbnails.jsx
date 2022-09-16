import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

function Thumbnails({ product, handleThumbnailClick, previewPhoto }) {
  const [thumbStart, setThumbStart] = useState(0);
  const [thumbEnd, setThumbEnd] = useState(4);

  const increment = (e) => {
    e.stopPropagation();
    setThumbStart(thumbStart + 1);
    setThumbEnd(thumbEnd + 1);
  };

  const decrement = (e) => {
    e.stopPropagation();
    setThumbStart(thumbStart - 1);
    setThumbEnd(thumbEnd - 1);
  };

  const thumbnailStorage = [];

  product.styles.forEach((style) => {
    style.photos.forEach((thumbnail) => {
      if (typeof thumbnail.thumbnail_url === 'string') {
        thumbnailStorage.push(thumbnail.thumbnail_url);
      }
    });
  });

  const thumbnailURLs = thumbnailStorage.slice(thumbStart, thumbEnd);

  return (
    <div className="duke-thumb-carousel-container">
      {thumbStart > 0 && (
      <div>
        <IconContext.Provider value={{ className: "duke-thumbnail-arrow-button" }}>
          <MdArrowBackIos onClick={decrement} />
        </IconContext.Provider>
      </div>
      )}
      {thumbnailURLs.map((url, index) => (
        <button
          key={index}
          className="duke-thumb-carousel-image"
          type="button"
          aria-label="Mute volume"
          value={url}
          style={
            {
              backgroundImage: `url(${url})`,
              border: previewPhoto === url ? '4px solid #F76C5E' : 'none',
            }
          }
          onClick={handleThumbnailClick}
        />
      ))}
      {thumbEnd < thumbnailStorage.length && (
      <div>
        <IconContext.Provider value={{ className: "duke-thumbnail-arrow-button" }}>
          <MdArrowForwardIos onClick={increment} />
        </IconContext.Provider>
      </div>
      )}
    </div>
  );
}

// Thumbnails.propTypes = {
//   product: PropTypes.shape({}).isRequired,
//   handleThumbnailClick: PropTypes.func.isRequired,
// };

export default Thumbnails;
