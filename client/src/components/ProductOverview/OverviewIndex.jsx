/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import ProductDescription from './ProductDescription.jsx';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector.jsx';
import Gallery from './Gallery.jsx';
import AddToCart from './AddToCart.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedView: false,
      zoomed: false,
      hover: false,
      styleIndex: 0,
    };
    this.handleStyleChange = this.handleStyleChange.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleUnexpandClick = this.handleUnexpandClick.bind(this);
  }

  handleStyleChange(e) {
    const styleIndex = Number(e.target.getAttribute('index'));
    this.setState({ styleIndex });
  }

  handleExpandClick(e) {
    e.stopPropagation();
    console.log(e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop);
    const { expandedView } = this.state;
    if (!expandedView) {
      this.setState({
        expandedView: true,
      });
    }
    if (expandedView) {
      this.setState((prevState) => ({
        zoomed: !prevState.zoomed,
      }));
    }
  }

  handleUnexpandClick() {
    this.setState({
      expandedView: false,
      zoomed: false,
    });
  }

  onMouseEnter() {
    this.setState({
      hover: true,
    });
  }

  onMouseLeave() {
    this.setState({
      hover: false,
    });
  }

  render() {
    const {
      expandedView,
      hover,
      styleIndex,
      zoomed,
    } = this.state;
    const {
      productInfo,
      rating,
      reviewCount,
      productStyles,
      executeScroll,
      handleAddOutfitClick,
      handleRemoveOutfitClick,
    } = this.props;
    const originalPrice = productStyles[styleIndex].original_price;
    const salePrice = productStyles[styleIndex].sale_price;
    const styleName = productStyles[styleIndex].name;
    const { skus } = productStyles[styleIndex];
    const reorderedStyles = productStyles;
    const firstStyle = reorderedStyles[0];
    for (let i = 0; i < productStyles.length; i += 1) {
      if (productStyles[i]['default?']) {
        reorderedStyles[0] = productStyles[i];
        reorderedStyles[i] = firstStyle;
        break;
      }
    }
    const galleryPhotos = reorderedStyles[styleIndex].photos;
    return (
      <div className="keith-overview-div" onClick={this.handleUnexpandClick}>
        <div className="keith-top-div">
          <Gallery
            photos={galleryPhotos}
            expandedView={expandedView}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            hover={hover}
            zoomed={zoomed}
            handleExpandClick={this.handleExpandClick}
          />
          {!expandedView && (
            <div className="keith-product-info-div">
              <ProductInfo
                productInfo={productInfo}
                rating={rating}
                reviewCount={reviewCount}
                originalPrice={originalPrice}
                salePrice={salePrice}
                styleName={styleName}
                executeScroll={executeScroll}
              />
              <StyleSelector
                productStyles={reorderedStyles}
                handleStyleChange={this.handleStyleChange}
                styleIndex={styleIndex}
              />
              <AddToCart
                productInfo={productInfo}
                key={Object.keys(skus)[styleIndex]}
                skus={skus}
                handleAddOutfitClick={handleAddOutfitClick}
                handleRemoveOutfitClick={handleRemoveOutfitClick}
              />
            </div>
          )}
        </div>
        <ProductDescription
          productInfo={productInfo}
          handleUnexpandClick={this.handleUnexpandClick}
        />
      </div>
    );
  }
}

export default ProductOverview;
