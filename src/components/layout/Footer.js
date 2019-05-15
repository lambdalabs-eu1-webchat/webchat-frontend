import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../theme/styledTheme';
import Logo from '../layout/navbar/logo2.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterWrapper>
      <div className="footer-company">
        <img src={Logo} alt="company-logo"/>
        <span>© {currentYear} FrontDesk</span>
        <div className="social-icons">
          <i className="fab fa-github" />
          <i className="fab fa-linkedin-in" />
          <i className="far fa-envelope" />
        </div>
      </div>
      <nav className="footer-nav">
        <Link>About</Link>
        <Link>Help</Link>
        <Link>Terms</Link>
        <Link>Privacy</Link>
      </nav>

    </FooterWrapper>
  )
};

export default Footer;

const FooterWrapper = styled.div`
  background: ${theme.color.secondaryPurple};
  border-top: 4px solid ${theme.color.accentGreen};
  display: flex;
  color: ${theme.color.lightPurple};
  padding: 2% 3%;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1000px) {
    flex-direction: column-reverse;
    padding-top: 0;
  }
  
  nav {
    background: none;
    padding: 0;
    width: 30%;
    display: flex;
    justify-content: space-between;
    @media(max-width: 1000px) {
      width: 85%;
      justify-content: space-between;
      border-bottom: 1px solid ${theme.color.footerText};
      padding: 20px 0;
    }
    
    a {
      font-size: ${theme.fontSize.xxs};
      color: ${theme.color.lightPurple};
      text-decoration: none;
      text-transform: uppercase;
      font-weight: bold;
      margin: 0;
      padding: 0;
      &:hover {
        color: ${theme.color.accentGreen};
        transition: all 0.3s ease-in;
        cursor: pointer;
      }
    }
  }
  
  .footer-company {
    display: flex;
    flex-direction: column;
    
    img {
      width: 60%;
      @media(max-width: 1000px) {
        padding-top: 20px;
        margin: 0 auto;
      }
    }

     span {
      color: ${theme.color.footerText};
      font-size: ${theme.fontSize.xxs};
      font-weight: bold;
      padding: 20px 0;
      @media(max-width: 1000px) {
        text-align: center;
      }
    }
    
    .social-icons {
      @media(max-width: 1000px) {
        text-align: center;
        padding-bottom: 20px;
      }
      
      .fab, .far {
        font-size: ${theme.fontSize.xs};
        padding: 4%;
        background: ${theme.color.accentPurple};
        border-radius: 50%;
        margin-right: 7px;
        &:hover {
          color: ${theme.color.accentGreen};
          transition: all 0.3s ease-in;
          cursor: pointer;
        }
      }
    }
  }
`;
