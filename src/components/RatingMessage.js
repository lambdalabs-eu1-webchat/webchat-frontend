import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import theme from './.././theme/styledTheme';

function RatingMessage({ rating }) {
  const stars = [];
  for (let i = 1; i < 6; i++) {
    if (i > rating) {
      // return a empty star
      stars.push(<i key={i} className="far fa-star" />);
    } else if (i <= rating)
      // return a full star
      stars.push(<i key={i} className="fas fa-star" />);
  }
  return <StyledRatingMessage>{stars}</StyledRatingMessage>;
}
RatingMessage.propTypes = {
  rating: propTypes.number.isRequired,
};

const StyledRatingMessage = styled.div`
  padding: 1rem 1rem;

  .far {
    color: ${theme.color.accentPurple};
    font-size: ${theme.fontSize.m};
  }

  .fas {
    color: ${theme.color.accentPurple};
    font-size: ${theme.fontSize.m};
  }
`;

export default RatingMessage;
