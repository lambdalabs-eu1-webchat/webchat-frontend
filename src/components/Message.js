import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import theme from '../theme/styledTheme';
import titleCase from '../utils/titleCase';

function Message({ message, guest_id }) {
  return (
    <StyledMessage left={guest_id === message.sender.id}>
      <span className="sender-name">{titleCase(message.sender.name)} : </span>
      <div className="bubble-container">
        <span className="bubble me">{message.text}</span>
      </div>
    </StyledMessage>
  );
}

Message.propTypes = {
  message: propTypes.shape({
    _id: propTypes.string.isRequired,
    sender: propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
    }).isRequired,
  }),
  guest_id: propTypes.string.isRequired,
};

const StyledMessage = styled.div`
  margin: 1.25rem 1rem;
  position: relative;
  max-width: 65%;
  border-radius: 2em;
  padding: 2rem;
  font-size: ${theme.fontSize.message};
  line-height: 1.25;
  .sender-name {
    font-weight: bold;
  }

  ${props =>
    props.left
      ? `background:${theme.color.lightPurple};`
      : `background:${theme.color.footerText};`}
  ${props => (props.left ? `text-align: left;` : 'text-align: right;')}
  ${props => (props.left ? `margin-right:auto;` : 'margin-left:auto;')}
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 0.3rem;
    height: -0.2em;
    border: 1em solid transparent ;
    border-top-color: #00aabb;
    border-bottom: 0;
    margin-left: -0.1em;
    margin-bottom: -0.562em;
    ${props =>
      props.left
        ? `
    border-left:0;
    left: 3%;
    border-top-color: ${theme.color.lightPurple};
    `
        : `
        border-right:0;
        right:3%;
        border-top-color:${theme.color.footerText};
  `}
  }
`;
// need a MediaQuery when the chat hits 616px and below for the little loopy thing
export default Message;
