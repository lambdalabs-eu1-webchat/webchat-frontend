import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import theme from '../theme/styledTheme';
import HeaderImage from '../assets/chatting.svg';
import ReceptionStaff from '../assets/staff.svg';

class HomePage extends React.Component {
  render() {
    return (
      <HomePageOuter>
        <HomePageContainer>
          <section className="home">
            <section className="home-header">
              <h1>Cater to your guests requests at the touch of a button.</h1>
              <p>
                FrontDesk is an easy to use hotel chat application which allows hotels to manage all of their guests needs in one place.
              </p>
              <p>
                Whether it's room service, restaurant recommendations, or noise complaints, guests can use FrontDesk to readily talk with hotel staff and get their issues resolved.
                Offer your guests the customer experience they deserve.
              </p>
              <button>
                <Link to="/register">Register Now</Link>
              </button>
            </section>
            <img src={HeaderImage} alt="chat"/>
          </section>
          </section>
        </HomePageContainer>
      </HomePageOuter>
    );
  };
}

export default HomePage;

const HomePageOuter = styled.div`
  background: ${theme.color.offWhite};
`;

