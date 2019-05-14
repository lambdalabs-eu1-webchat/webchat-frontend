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

  }
}

export default withStyles(styles)(Footer);
