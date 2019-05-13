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

          <section className="home-feedback">
            <h1>FrontDesk is changing the way hotel staff interact with their guests.</h1>
            <p>Here is some of the feedback we have received since starting FrontDesk:</p>
            <div className="feedback-cards">
              <div className="feedback-card">
                <p>
                  “Our team has seen significant improvements from using FrontDesk and our reception duties are much less chaotic.“
                </p>
                <p className="feedback-name"> - Fiona Mulligan, Receptionist</p>
              </div>
              <div className="feedback-card">
                <p>“I have thoroughly enjoyed using FrontDesk. I can communicate with the hotel anytime and from wherever I happen to be.“</p>
                <p className="feedback-name"> - Richard Stamos, Guest</p>
              </div>
              <div className="feedback-card">
                <p>“FrontDesk has changed the way in which I conduct my business. My reception is now clear and my guests are happy.“ </p>
                <p className="feedback-name"> - Michelle Matthews, Hotel Manager</p>
              </div>
            </div>
          </section>

          <section className="pricing-plan">
            <h1>Our pricing plans</h1>
              <p>
                No hotel is to big or too small for FrontDesk.<br/> Our services can be customized to suit any need you may have.
              </p>
            <div className="pricing-cards">
              <div className="pricing-card">
                <h2>FREE</h2>
                <ul>
                  <li><i className="fas fa-check"></i>Live chat with guests</li>
                  <li><i className="fas fa-check"></i>Check guests in and out</li>
                  <li><i className="fas fa-check"></i>Track ticket status</li>
                  <li><i className="fas fa-check"></i>Up to 5 users</li>
                </ul>
                <h3>Free</h3>
                <button>
                  <Link to="/register">Register Now</Link>
                </button>
              </div>

              <div className="pricing-card">
                <h2>PLUS</h2>
                <ul>
                  <li><i className="fas fa-check"></i>Live chat with guests</li>
                  <li><i className="fas fa-check"></i>Check guests in and out</li>
                  <li><i className="fas fa-check"></i>Track ticket status</li>
                  <li><i className="fas fa-check"></i>Up to 15 users</li>
                </ul>
                <h3>£59 /month</h3>
                <button>
                  <Link to="/register">Register Now</Link>
                </button>
              </div>

              <div className="pricing-card">
                <h2>PRO</h2>
                <ul>
                  <li><i className="fas fa-check"></i>Live chat with guests</li>
                  <li><i className="fas fa-check"></i>Check guests in and out</li>
                  <li><i className="fas fa-check"></i>Track ticket status</li>
                  <li><i className="fas fa-check"></i>Unlimited users</li>
                </ul>
                <h3>£119 /month</h3>
                <button>
                  <Link to="/register">Register Now</Link>
                </button>
              </div>
            </div>
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

