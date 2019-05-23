import React from 'react';
import styled from 'styled-components';
import theme from '../theme/styledTheme';
import NotFound404 from '../assets/not-found.svg';

class NotFound extends React.Component {
  render() {
    return (
      <PrivacyPageContainer>
        <section>
          <div className="page-not-found">
            <img src={NotFound404} alt="not-found" />
            <h1><span>Ooops!</span>We can't seem to find the page you're looking for.</h1>
          </div>
        </section>
      </PrivacyPageContainer>
    );
  }
}

export default NotFound;

const PrivacyPageContainer = styled.div`
  background: ${theme.color.white};
  margin: 0 5rem;
  
  section {
    width: 100%;
    margin: 0 auto;
    align-content: center;
    @media(max-width: 1000px) {
      width: 100%;
      padding: 2rem 1rem;
      height: 100%;
    }
    
    .page-not-found {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      margin: 0 auto;
      @media (max-width: 1000px) {
        width: 100%;
      }
      img {
        width:40%;
        margin: 0 auto;
        align-self: center;
        @media (max-width: 1000px) {
          width: 50%;
        }
        @media (max-width: 800px) {
          width: 80%;
        }
        @media (max-width: 600px) {
          width: 100%;
        }
      }
      
      h1 {
        font-size: ${theme.fontSize.l};
        padding: 3rem 0 2.5rem 0;
        color: ${theme.color.textColor};
      }
      
      span {
        font-size: ${theme.fontSize.l};
  
        padding: 3rem 0.5rem 0 0;
        font-weight: bold;
        color: ${theme.color.accentText};
      }
    }
  }
`;
