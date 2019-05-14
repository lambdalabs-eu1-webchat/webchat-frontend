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

const HomePageContainer = styled.div`
  background: ${theme.color.white};
  margin: 0 5rem;
  box-shadow: ${theme.shadow.containerShadow};

  h1 {
    font-size: ${theme.fontSize.xl};
    padding: 25px;
    font-weight: bold;
    width: 60%;
    color: ${theme.color.textColor};
    @media (max-width: 1000px) {
      width: 90%;
    }
  }
  h2 {
    font-size: ${theme.fontSize.l};
    color: ${theme.color.textColor};
  }
  h3 {
    font-size: ${theme.fontSize.m};
    color: ${theme.color.textColor};
  }
  p {
    font-size: ${theme.fontSize.m};
    color: ${theme.color.textColor};
    padding: 25px;
  }
  
  a {
    text-decoration: none;
    color: ${theme.color.white};
    font-weight: bold;
  }

  .home {
    display: flex;
    @media (max-width: 1000px) {
    flex-direction: column;
    }
    
    img {
      padding: 2.5%;
      width: 50%;
      @media (max-width: 1000px) {
      margin: 0 auto;
      padding-bottom: 10%;
      }
    }
  }

  .home-header {
    padding: 10% 2.5%;
    width:50%;
    @media (max-width: 1000px) {
      width: 100%;
    }

    button {
      margin: 25px;
      padding: 10px 20px;
      color: ${theme.color.white};
      background: ${theme.color.accentGreen};
      font-weight: bold;
      box-shadow: ${theme.shadow.buttonShadow};
      &:hover {
        box-shadow: ${theme.shadow.buttonHover};
        background: ${theme.color.accentPurple};
      }
    }
  }

  .home-features {
    padding: 10% 2.5%;
    background: ${theme.color.lightPurple};
    @media (max-width: 1000px) {
      width: 100%;
    }
    .feature-cards {
      display: flex;
      margin: 0 2.5%;
      @media (max-width: 1000px) {
        flex-direction: column;
      }
      .feature-card {
        background: ${theme.color.white};
        padding: 2.5%;
        margin: 2.5%;
        width: 30%;
        box-shadow: ${theme.shadow.cardShadow};
        @media (max-width: 1000px) {
        padding: 10% 5%;
        width: 95%;
      }

        h2 {
          font-size: ${theme.fontSize.m};
          color: ${theme.color.accentText};
          font-weight: bold;
          padding: 6% 2.5%;
        }
        p {
        font-size: ${theme.fontSize.s};
        padding: 2.5%;
        }
      }
    }
  }
  .image-divider {
    padding: 10% 2.5% 0 2.5%;
    img {
      width: 40%;
      margin: 0 30%;
      align-self: center;
      @media (max-width: 1000px) {
      width: 95%;
      margin: 2.5%;
      padding: 5% 0;
      }
    }
  }

  .home-feedback {
    padding: 6% 2.5%;
    @media (max-width: 1000px) {
      width: 100%;
    }
    
    .feedback-cards {
      display: flex;
      margin: 0 2.5%;
      @media (max-width: 1000px) {
        flex-direction: column;
      }
      
      .feedback-card {
        background: linear-gradient(65deg, #6876CB 0, #5B66AC 100%);
        border-radius: 3px;
        padding: 2.5%;
        margin: 2.5%;
        width: 30%;
        box-shadow: 0 16px 48px rgba(32, 41, 50, 0.21);
        @media (max-width: 1000px) {
          padding: 10% 5%;
          width: 95%;
        }
        
        p {
          color: #FFFFFF;
          font-size: ${theme.fontSize.s};
        }
        
        p.feedback-name {
          color: #0CD4AF;
          font-style: italic;
        }
      }
    }
  }

  .pricing-plan {
    padding: 0 2.5% 5% 2.5%;
    @media (max-width: 1000px) {
      width: 95%;
      padding: 10% 0 15% 0;
      margin: 0 auto;
    }
      
    .pricing-cards {
      display: flex;
      justify-content: space-around;
      margin: 0 2.5%;
      @media (max-width: 1000px) {
        flex-direction: column;
        width: 90%;
        margin: 0 5%;
      }
    }
    
    .pricing-card {
      background: ${theme.color.lightPurple};
      border-radius: 3px;
      text-align: center;
      width: 30%;
      padding: 2.5%;
      margin: 2.5%;
      box-shadow: 0 16px 48px rgba(32, 41, 50, 0.21);
      @media (max-width: 1000px) {
        padding: 10%;
        margin: 10% auto;
        width: 100%;
      }
      
      h2 {
        font-weight: bold;
        text-align: center;
        font-size: ${theme.fontSize.m};
        color: ${theme.color.accentText};
      }
      
      ul {
        padding: 0 5%;
        
        li {
          font-size: ${theme.fontSize.xs};
          padding: 5% 0;
          text-align: left;
        }
      }
      
      h3 {
        color: ${theme.color.accentText};
        text-align: center;
        font-size: ${theme.fontSize.s};
        font-weight: bold;
        padding: 5% 0;
      }
      
      button {
        margin: 5% 2.5%;
        padding: 10px 20px;
        width: 95%;
        color: ${theme.color.white};
        font-weight: bold;
        box-shadow: ${theme.shadow.buttonShadow};
        &:hover {
          box-shadow: ${theme.shadow.buttonHover};
          background: ${theme.color.accentPurple};
        }
        @media(max-width: 500px) {
          margin: 0 auto;
        }
      }
      
      .fa-check {
        background: #e2fdf8;
        border: 1px solid white;
        border-radius: 50%;
        padding: 2.5%;
        color: ${theme.color.accentGreen};
        font-size: 1rem;
        margin-right: 2.5%;
      }
    }
  }
`;
