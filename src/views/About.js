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
         <h1 className="header">Meet The Team</h1>
        <PageContainer>
         
        <section className="about-container">
            <div className="card">
              <img src={luke} alt=""/>
               <h2>Lukasz Busk</h2>
               <p>Project Manager</p>
               <a href="https://github.com/Velsu"><i class="fab fa-github gh"></i></a>
               <a href="https://twitter.com"><i class="fab fa-twitter tw "></i></a>
               </div>  
               <div className="card">
              <img src={diana} alt="Diana"/>
               <h2>Diana Ignatescu</h2>
               <p>Full Stack Developer</p>
               <a href="https://github.com/DianaIgnatescu"><i class="fab fa-github gh"></i></a>
               <a href="https://twitter.com"><i class="fab fa-twitter tw "></i></a>
               </div> 
               <div className="card">
              <img src={connor} alt=""/>
               <h2>Connor Robertson</h2>
               <p>Full Stack Developer</p>
               <a href="https://github.com/ConConRob"><i class="fab fa-github gh"></i></a>
               <a href="https://twitter.com"><i class="fab fa-twitter tw "></i></a>
               </div> 
               <div className="card">
              <img src={mark} alt=""/>
               <h2>Mark Marshall</h2>
               <p>Full Stack Developer</p>
               <a href="https://github.com/mark-marshall"><i class="fab fa-github gh"></i></a>
               <a href="https://twitter.com"><i class="fab fa-twitter tw "></i></a>
               </div> 
              <div className="card">
              <img src={pavol} alt=""/>
               <h2>Pavol Karas</h2>
               <p>Full Stack Developer</p>
               <a href="https://github.com/Pav0l"><i class="fab fa-github gh"></i></a>
               <a href="https://twitter.com/KarasPavol"><i class="fab fa-twitter tw "></i></a>
               </div> 
               <div className="card">
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

.header {
  font-size:2.5rem;
  color:${theme.color.accentPurple};
  text-align:center;
  padding-top: 1.5625rem;
}
`;

const PageContainer = styled.div`
  background: ${theme.color.lightPurple};
  margin: 5rem 5rem;
  box-shadow: ${theme.shadow.containerShadow};
  border:none;

  section {
    text-align: center;
    padding: 0.3125rem 0.125rem;
    border:none;
}
  .about-container {
      display:flex;
      justify-content:space-evenly;
      padding: 100px 0;
      flex-flow: wrap;
      
      .card{
        width:340px;
        padding: 1.25rem;
        border-bottom:0.125rem solid ${theme.color.accentPurple};
        margin: 1rem 0.625rem;
        &:hover {
          background-color:${theme.color.white}
          transition: all 0.3s ease-in;
          transform: scale(1.2);
        }
      }
       
      img{
        width: 180px;
        border-radius: 60%;
      }
      
      h2 {
        font-size: ${theme.fontSize.l};
        color: ${theme.color.accentPurple};
      }
      p {
        font-size: ${theme.fontSize.xs};
        color:${theme.color.accentPurple};
        padding: 0.3125rem;
      }
    
      a {
        color: ${theme.color.footerText};
      }
      .gh{
        font-size: 1.875rem;
        color: ${theme.color.accentPurple};
        transition: transform 0.2s ease-in-out;
        margin: 0 0.625rem;
        &:hover {
          color: #222;
          transition: all 0.3s ease-in;
          cursor: pointer;
          transform: scale(1.5);
        }
      }
      .tw{
        font-size: 1.875rem;
        color: ${theme.color.accentPurple};
        transition: transform 0.2s ease-in-out;
        margin: 0.625rem;
        &:hover {
          color:#08addd;
          transition: all 0.3s ease-in;
          cursor: pointer;
          transform: scale(1.5);
        }
      
        }
      }
  }
`;
