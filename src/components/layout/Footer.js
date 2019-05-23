import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../theme/styledTheme';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterWrapper className="hide-on-print">
      <div className="footer-company">
        <div className="social-icons">
          <i className="fab fa-github" />
          <i className="fab fa-linkedin-in" />
          <i className="far fa-envelope" />
        </div>
        <span>© {currentYear} FrontDesk</span>
      </div>
      <nav className="footer-nav">
        <Link to="/about">About</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/privacy">Privacy</Link>
      </nav>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  background: ${theme.color.secondaryPurple};
  border-top: 4px solid ${theme.color.accentGreen};
  display: flex;
  color: ${theme.color.lightPurple};
  padding: 1.5rem 5rem;
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
      width: 100%;

      justify-content: space-between;
      border-bottom: 1px solid ${theme.color.footerText};
      padding: 20px 0;
    }
    
    a {
      font-size: ${theme.fontSize.xxs};
      color: ${theme.color.lightPurple};
      text-decoration: none;
      background: none;
      border:none;
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
    @media (max-width: 1000px) {
    flex-direction: column;
    }

    span {
      color: ${theme.color.footerText};
      font-size: ${theme.fontSize.xxs};
      font-weight: bold;
      padding: 20px 0;
      @media (max-width: 1000px) {
        text-align: center;
        padding: 0 1.5rem 0 0;
      }
    }

    .social-icons {
      display: flex;
      align-items: center;
      margin-right: 1rem;
      @media(max-width: 1000px) {
        text-align: center;
        padding: 1.5rem;
        margin: 0 auto;
      }

      .fab,
      .far {
        font-size: ${theme.fontSize.xs};
        padding: 1rem;
        background: ${theme.color.accentPurple};
        border-radius: 50%;
        margin-right: 1rem;
        &:hover {
          color: ${theme.color.accentGreen};
          transition: all 0.3s ease-in;
          cursor: pointer;
        }
      }
    }
  }
`;
