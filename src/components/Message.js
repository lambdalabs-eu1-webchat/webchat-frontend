import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import theme from '../theme/styledTheme';

function Message({ message, guest_id, translatedMessage }) {
  return (
    <StyledMessage left={guest_id === message.sender.id}>
      <span>{message.sender.name} : </span>
      <div className="bubble-container">
        <span className="bubble me">{message.text}</span>
        <p>
          {translatedMessage
            ? translatedMessage.detectedSourceLanguage !== 'en'
              ? translatedMessage.translatedText
              : null
            : null}
        </p>
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
  margin: 1.25rem;
  position: relative;
  max-width: 65%;
  border-radius: 2em;
  padding: 2rem;


  ${props =>
    props.left
      ? `background:${theme.color.lightPurple};`
      : `background:${theme.color.footerText};`}
  /* ${props => (props.left ? `text-align: left;` : 'text-align: right;')} */
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
