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

          <section className="home-features">
            <h1>The easiest path to great customer service</h1>
            <p>
              FrontDesk is designed to help you help your guests.<br />Have a look at some of our key features:
            </p>

            <div className="feature-cards">
              <div className="feature-card">
                <h2>Manage all customer requests in one place</h2>
                <p>Our ticket-based system makes it easy for staff members to quickly connect with guests and resolve requests in real time. </p>
                <p>Guests have a simple way to make requests anytime, and all communications are handled in one place. Requests or complaints will never be overlooked again. </p>
              </div>

              <div className="feature-card">
                <h2>Lightning-fast response times</h2>
                <p>Communicate with your guests immediately! Guests no longer need to queue at the reception desk or stay on the line until a member of staff becomes available. </p>
                <p>You can also easily track how your guests feel about the services your hotel offers with our feedback system.</p>
              </div>

              <div className="feature-card">
                <h2>One click away</h2>
                <p>With FrontDesk you and your guests don't need to worry about having to download or install anything.</p>
                <p>Staff members can simply login, and guests can access services by clicking a link.</p>
              </div>
            </div>
          </section>

          <section className="image-divider">
            <img src={ReceptionStaff} alt="staff"/>
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

