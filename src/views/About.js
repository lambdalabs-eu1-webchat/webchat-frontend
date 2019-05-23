import React from 'react';
import styled from 'styled-components';
import theme from '../theme/styledTheme';
import luke from '../avatar/luke.jpg';
import talent from '../avatar/talent.jpeg';
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
              <img src={luke} alt=""/>
               <h2>Lukasz Busk</h2>
               <p>Project Manager</p>
               <a href="https://github.com/Velsu"><i class="fab fa-github gh"></i></a>
               <a href="https://twitter.com"><i class="fab fa-twitter tw "></i></a>
               </div>  
               <div class="card">
              <img src={diana} alt=""/>
               <h2>Diana Ignatescu</h2>
               <p>Full Stack Developer</p>
               <a href="https://github.com/DianaIgnatescu"><i class="fab fa-github gh"></i></a>
               <a href="https://twitter.com"><i class="fab fa-twitter tw "></i></a>
               </div> 
               <div class="card">
              <img src={mark} alt=""/>
               <h2>Mark Marshall</h2>
               <p>Full Stack Developer</p>
               <a href="https://github.com/mark-marshall"><i class="fab fa-github gh"></i></a>
               <a href="https://twitter.com"><i class="fab fa-twitter tw "></i></a>
               </div> 
               <div class="card">
              <img src={connor} alt=""/>
               <h2>Connor Robertson</h2>
               <p>Full Stack Developer</p>
               <a href="https://github.com/ConConRob"><i class="fab fa-github gh"></i></a>
               <a href="https://twitter.com"><i class="fab fa-twitter tw "></i></a>
               </div> 
               <div class="card">
              <img src={pavol} alt=""/>
               <h2>Pavol Karas</h2>
               <p>Full Stack Developer</p>
               <a href="https://github.com/Pav0l"><i class="fab fa-github gh"></i></a>
               <a href="https://twitter.com/KarasPavol"><i class="fab fa-twitter tw "></i></a>
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
background: ${theme.color.white};
`;

const PageContainer = styled.div`
  background: ${theme.color.lightPurple};
  margin: 5rem 5rem;
  box-shadow: ${theme.shadow.containerShadow};
  border:none;

  section {
    text-align: center;
    padding: 5px 2px;
    border:none;
}
  .about-container {
      display:flex;
      justify-content:space-evenly;
      padding: 100px 0;
      flex-flow: wrap;
      
      .card{
        padding: 20px;
        border-bottom:2px solid ${theme.color.accentPurple};
        margin: 16px 10px;
      }
       
      img{
        width: 180px;
        border-radius: 60%;
      }
      
      h2 {
        font-size: ${theme.fontSize.l};
        color: ${theme.color.textColor};
      }
      p {
        font-size: ${theme.fontSize.xs};
        color: ${theme.color.textColor};
        padding: 5px;
      }
    
      a {
        text-decoration: none;
        color: ${theme.color.footerText};
        height:30px;
        width:30px;
        font-weight: bold;
      }
  }
`;
