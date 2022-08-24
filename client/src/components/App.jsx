import React from 'react';
import axios from 'axios';
import { AUTH } from '../config.js';
import { averageRating, totalReviews } from '../utilities.js';
import ProductOverview from './ProductOverview/OverviewIndex.jsx';
import RelatedProducts from './RelatedItems/RelatedProducts.jsx';
import OutfitList from './OutfitList/OutfitList.jsx';
import QandA from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';

const defaultId = 71700;

import RatingAndReview from './RatingsAndReviews/RatingAndReview.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: defaultId,
      productInfo: null,
      productStyles: null,
      rating: null,
      reviewCount: null,
    };
    this.handleProductIdChange = this.handleProductIdChange.bind(this);
  }

  componentDidMount() {
    let productInfo, productStyles;
    const { productId } = this.state;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}`, {
      headers: {
        Authorization: AUTH,
      },
    })
      .then((results) => {
        productInfo = results.data;
      })
      .then(() => {
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/styles`, {
          headers: {
            Authorization: AUTH,
          },
        }).then((results) => {
          productStyles = results.data.results;
        })
          .then(() => {
            axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta/?product_id=${productId}`, {
              headers: {
                Authorization: AUTH,
              },
            }).then((results) => {
              const { ratings } = results.data;
              this.setState({
                productInfo: productInfo,
                productStyles: productStyles,
                rating: averageRating(ratings),
                reviewCount: totalReviews(ratings),
              });
            });
          });
      });
  }

  handleProductIdChange(newId) {
    this.setState({
      productId: newId,
    });
  }

  render() {
    const {
      productInfo,
      productStyles,
      rating,
      reviewCount,
    } = this.state;
    if (!productInfo || !productStyles) {
      return <div />;
    }
    return (
      <>
        <ProductOverview
          productInfo={productInfo}
          productStyles={productStyles}
          rating={rating}
          reviewCount={reviewCount}
        />
        <RelatedProducts />
        <OutfitList />
        <QandA />
        <RatingAndReview />
      </>
    );
  }
}

export default App;
