/* eslint-disable react/prop-types */
import React from 'react';
import Select from 'react-select';
import StarButton from './StarButton.jsx';
import { availableSizes } from '../../utilities';
import axios from 'axios';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSize: null,
      sizeIsSelected: false,
      selectedQuantity: null,
      quantityAvailable: null,
      selectedSku: null,
      specialMessage: ' ',
    };

    this.sizeRef = React.createRef();
    this.quantityRef = React.createRef();

    this.changeSize = this.changeSize.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  changeSize(e) {
    const { skus } = this.props;
    let selectedSku;
    let { quantity } = Object.values(skus).find((item) => item.size === e.value);
    if (quantity > 15) {
      quantity = 15;
    }
    for (var sku in skus) {
      if (skus[sku].size === e.value) {
        selectedSku = sku;
      }
    }
    this.setState({
      sizeIsSelected: true,
      selectedSize: e.value,
      selectedQuantity: null,
      quantityAvailable: quantity,
      selectedSku,
      specialMessage: ' ',
    });
  }

  changeQuantity(e) {
    this.setState({
      selectedQuantity: e.value,
      specialMessage: ' ',
    });
  }

  addToCart() {
    const { selectedSku, selectedQuantity, sizeIsSelected } = this.state;
    if (!sizeIsSelected) {
      if (this.sizeRef.current) {
        this.sizeRef.current.focus();
        this.setState({
          specialMessage: 'Please select size',
        });
      }
    } if (sizeIsSelected && !selectedQuantity) {
      if (this.quantityRef.current) {
        this.quantityRef.current.focus();
        this.setState({
          specialMessage: 'Please select quantity',
        });
      }
    }
    if (selectedQuantity) {
      axios.post('/cart', {
        sku_id: selectedSku,
        count: selectedQuantity,
      }).then((response) => {
        if (response.status === 200 || 201) {
          alert('Added to cart!');
        }
      });
    }
  }

  render() {
    const {
      quantityAvailable,
      sizeIsSelected,
      selectedSize,
      specialMessage,
    } = this.state;
    const {
      skus,
      productInfo,
      savedToOutfit,
      toggleOutfit,
    } = this.props;
    // Makes an array of size options for react-select component
    const sizeOptions = availableSizes(skus).map((size) => ({ value: size, label: size }));
    let quantityOptions, placeholder;
    // Makes an array of quantity options for react-select component
    if (sizeIsSelected) {
      quantityOptions = Array.from({ length: quantityAvailable }, (_, i) => i + 1);
      placeholder = quantityOptions[0];
    } else {
      quantityOptions = [{ value: 1, label: 1 }];
      placeholder = '-';
    }
    quantityOptions = quantityOptions.map((quantity) => ({ value: quantity, label: quantity }));
    if (sizeOptions === []) {
      return (
        <div style={{ width: '400px' }}>
          <p><b>OUT OF STOCK</b></p>
          <div style={{ width: '250px', float: 'left' }}>
            <Select options={sizeOptions} onChange={this.changeSize} isDisabled placeholder="Select Size" />
          </div>
          <div style={{ width: '100px', float: 'center' }}>
            <Select
              options={quantityOptions}
              onChange={this.changeQuantity}
              isDisabled
              placeholder={placeholder}
            />
          </div>
        </div>
      );
    }
    return (
      <div className="keith-cart-div">
        <p className="keith-special-message"><b>{specialMessage}</b></p>
        <div className="keith-size-quantity-div">
          <div style={{ width: '200px' }}>
            <Select
              openMenuOnFocus
              style={{ margin: '20px' }}
              ref={this.sizeRef}
              options={sizeOptions}
              onChange={this.changeSize}
              placeholder="Select Size"
            />
          </div>
          <div style={{ width: '100px' }}>
            <Select
              openMenuOnFocus
              style={{ margin: '20px' }}
              ref={this.quantityRef}
              key={selectedSize}
              options={quantityOptions}
              onChange={this.changeQuantity}
              isDisabled={!sizeIsSelected}
              placeholder={placeholder}
            />
          </div>
        </div>
        <div className="keith-cart-star-div">
          <button className="keith-add-cart" type="button" onClick={this.addToCart}>Add to Cart</button>
          <StarButton toggleOutfit={toggleOutfit} savedToOutfit={savedToOutfit} productInfo={productInfo}/>
        </div>
      </div>
    );
  }
}

export default AddToCart;
