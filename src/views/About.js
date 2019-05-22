import React from 'react';
import styled from 'styled-components';
import theme from '../theme/styledTheme';
import luke from '../avatar/luke.jpg';
import talent from '../avatar/talent.jpg';
import diana from '../avatar/diana.jpg';
import mark from '../avatar/mark.jpg';
import pavol from '../avatar/pavol.PNG';
import connor from '../avatar/connor.jpg';

class About extends React.Component {
  render() {
    return (  
      
      <PageOuter>
        <PageContainer>
        <section className="about-container">
            <div class="card">
              <img src={diana} alt=""/>
               <h2>Talent Antonio</h2>
               <p>Full Stack Developer</p>
               <a href="https://github.com/sampler36"><i class="fab fa-github gh"></i></a>
               <a href="https://twitter.com"><i class="fab fa-twitter tw "></i></a>
               </div>  
               <div class="card">
              <img src={talent} alt=""/>
               <h2>Talent Antonio</h2>
               <p>Full Stack Developer</p>
               <a href="https://github.com/sampler36"><i class="fab fa-github gh"></i></a>
               <a href="https://twitter.com"><i class="fab fa-twitter tw "></i></a>
               </div> 
               <div class="card">
              <img src={mark} alt=""/>
               <h2>Talent Antonio</h2>
               <p>Full Stack Developer</p>
               <a href="https://github.com/sampler36"><i class="fab fa-github gh"></i></a>
               <a href="https://twitter.com"><i class="fab fa-twitter tw "></i></a>
               </div> 
               <div class="card">
              <img src={connor} alt=""/>
               <h2>Talent Antonio</h2>
               <p>Full Stack Developer</p>
               <a href="https://github.com/sampler36"><i class="fab fa-github gh"></i></a>
               <a href="https://twitter.com"><i class="fab fa-twitter tw "></i></a>
               </div> 
               <div class="card">
              <img src={pavol} alt=""/>
               <h2>Talent Antonio</h2>
               <p>Full Stack Developer</p>
               <a href="https://github.com/sampler36"><i class="fab fa-github gh"></i></a>
               <a href="https://twitter.com"><i class="fab fa-twitter tw "></i></a>
               </div> 
               <div class="card">
              <img src={talent} alt=""/>
               <h2>Talent Antonio</h2>
               <p>Full Stack Developer</p>
               <a href="https://github.com/sampler36"><i class="fab fa-github gh"></i></a>
               <a href="https://twitter.com"><i class="fab fa-twitter tw "></i></a>
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
    padding: 5px 2px;
}
  .about-container {
      display:flex;
      justify-content:space-around;
      padding: 100px 0;
      flex-flow:row wrap;
       
      img{
        width: 180px;
        border-radius: 60%;
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
        font-size: ${theme.fontSize.xs};
        color: ${theme.color.textColor};
        padding: 5px;
      }
    
      a {
        text-decoration: none;
        color: ${theme.color.accentPurple};
        size:500px;
        font-weight: bold;
      }
  }
`;
