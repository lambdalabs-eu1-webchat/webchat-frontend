import React from 'react';
import styled from 'styled-components';
import theme from '../theme/styledTheme';

class About extends React.Component {
  render() {
    return (
      <PageOuter>
        <PageContainer>
        <section className="about-container">
            <div class="pers-card">
               <h2>Talent Antonio</h2>
               <p>Full Stack Developer</p>
               <a href="https://github.com/sampler36"><i class="fab fa-github gh"></i></a>
               <a href="https://twitter.com/ConnatserW"><i class="fab fa-twitter tw"></i></a>
               
               </div>  

            </section>
        </PageContainer>
      </PageOuter>
    );
  }
}

export default About;

const PageOuter = styled.div`
  background: ${theme.color.offWhite};
`;

const PageContainer = styled.div`
  background: ${theme.color.white};
  margin: 0 5rem;
  box-shadow: ${theme.shadow.containerShadow};

  section {
    background-color: #e9e9e9;
    text-align: center;
    padding: 50px 20px;
}
  .about-container {
      display:flex;
      justify-content:space-around;
      padding: 100px 0;
      flex-flow:row wrap;
  }

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

  
    button {
      margin: 25px;
      padding: 10px 20px;
      width: 20rem;
      border-radius: 5px;
      height: ${theme.button.height};
      font-size: ${theme.fontSize.xs};
      border: none;
      text-transform: uppercase;
      color: ${theme.color.white};
      background: ${theme.color.accentGreen};
      font-weight: bold;
      box-shadow: ${theme.shadow.buttonShadow};
      position: relative;
      &:hover {
        box-shadow: ${theme.shadow.buttonHover};
        background: ${theme.color.accentPurple};
        cursor: pointer;
        transition: all 0.3s ease;
      }
      @media (max-width: 600px) {
        width: 90%;
        margin: 5%;
      }
    }
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
`;
