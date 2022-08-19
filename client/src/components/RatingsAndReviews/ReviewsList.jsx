import React from 'react';

import ReviewTile from './ReviewTile.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    //console.log('Incoming sortedReviews Props: ', this.props.reviews)
    return (
      <div>
        {
            this.props.reviews.map((review) => (
              <ReviewTile review={review} />
            ))
          }
      </div>
    );
  }
}

export default ReviewsList;
