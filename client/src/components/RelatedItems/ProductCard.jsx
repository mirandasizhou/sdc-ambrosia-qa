import React from 'react';
import { useState } from 'react';
import StarRating from './StarRating.jsx';
import Thumbnails from './Thumbnails.jsx';

// Individual card in related product carousel
function ProductCard({ product, handleModalButtonClick, handleProductCardClick }) {
  const defaultStyle = product.styles.filter((value) => (value['default?']));

  let defaultPhotoURL = defaultStyle.length > 0
    ? defaultStyle[0].photos[0].url : product.styles[0].photos[0].url;

  let [previewPhoto, setPreviewPhoto] = useState(defaultPhotoURL);
  let [isShown, setIsShown] = useState(false);

  // dummy test data for sales price
  // defaultStyle.sale_price = "25.00";

  const salesPrice = defaultStyle.length > 0
    ? defaultStyle.sale_price : product.styles[0].sale_price;

  let priceBlock = <p>{`$${product.default_price}`}</p>;

  if (salesPrice) {
    priceBlock = (
      <p>
        <span className="duke-sale-price">{`$${salesPrice}`}</span>
        <span className="duke-cross-through">{`$${product.default_price}`}</span>
      </p>
    );
  }

  const handleThumbnailClick = (e) => {
    e.preventDefault();
    setPreviewPhoto(e.target.value);
  };

  // If add components to button to solve for mouse enter then clicks will fire simultaneously. But if I don't add them then, unable to maintain mouse enter property

  return (
    <div className="duke-card-container" data-testid="product-card">
      <button
        aria-label="Mute volume"
        type="submit"
        onClick={(() => handleProductCardClick(product.id))}
        value={product.id}
        className="duke-card-header"
        style={{ backgroundImage: `url(${previewPhoto})` }}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      />
      <img src="https://static.vecteezy.com/system/resources/previews/001/189/167/non_2x/star-png.png" className="duke-action-icon" onClick={handleModalButtonClick} value={product.id} alt="star-icon" />
      {isShown && (
      <Thumbnails
        product={product}
        handleThumbnailClick={handleThumbnailClick}
      />
      )}
      <div className="duke-productcard-body">
        <p>{product.category}</p>
        <div>
          <p><strong>{product.name}</strong></p>
          <p><i>{product.slogan}</i></p>
        </div>
        {priceBlock}
        <div>
          <StarRating rating={product.ratings}/>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
