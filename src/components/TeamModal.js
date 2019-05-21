import React from 'react';
import theme from '../theme/styledTheme';
import styled from 'styled-components';

export default class TeamModal extends React.Component {

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <bigContainer>
            <div style={backdropStyle}>
                <div style={modalStyle}>           

                <section className="pricing-plan">
            <h2>Users and their Roles</h2>
              <p>
                You will have 3 types of Users and each User has access to allocated pages depending on their company status 
              </p>
            <div className="pricing-cards">
              <div className="pricing-card">
                <h2><i className="fas fa-user-cog"></i>
                <br></br> Super Admin</h2>
                <ul>
                <li><i className="fas fa-check"></i>Unlimited access</li>
                  <li><i className="fas fa-check"></i>Can register new company</li>
                  <li><i className="fas fa-check"></i>Can Add team members</li>
                  <li><i className="fas fa-check"></i>Can Add rooms</li>
                  <li><i className="fas fa-check"></i>Change company settings</li>
                  <li><i className="fas fa-check"></i>Can monitor everyone</li>
                </ul>
              </div>

              <div className="pricing-card">
              <h2><i className="fas fa-user"></i>
                <br></br> Admin / Manager</h2>
                <ul>
                  <li><i className="fas fa-check"></i>Restricted access</li>
                  <li><i className="fas fa-check"></i>Can not remove Admins</li>
                  <li><i className="fas fa-check"></i>Check guests in and out</li>
                  <li><i className="fas fa-check"></i>Track ticket status</li>
                  <li><i className="fas fa-check"></i>Add team members</li>
                </ul>
              </div>

              <div className="pricing-card">
              <h2><i className="fas fa-user"></i>
                <br></br>Employee / Receptionist </h2>
                <ul>
                  <li><i className="fas fa-check"></i>Restricted access</li>
                  <li><i className="fas fa-check"></i>Live chat with guests</li>
                  <li><i className="fas fa-check"></i>Check guests in and out</li>
                  <li><i className="fas fa-check"></i>Track ticket status</li>
                  <li><i className="fas fa-check"></i>Change their own settings</li>
                </ul>
              </div>
            </div>
          </section>

                <div>
                <button onClick={(e) => { this.onClose(e)}}>
                    Close
                </button>
              </div>
            </div>
        </div>
        </bigContainer>
        )
    }
}

const bigContainer = styled.div`
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
      &:hover {
        box-shadow: ${theme.shadow.buttonHover};
        background: ${theme.color.accentPurple};
        cursor: pointer;
        transition: all 0.3s ease;
      }
      @media(max-width: 600px) {
        width: 90%;
        margin: 5%;
      }
    }
    a {
    align-self: center;
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
        margin: 5% 0;
        height: ${theme.button.height};
        width: 100%;
        color: ${theme.color.white};
        border: none;
        background: ${theme.color.accentGreen};
        text-transform: uppercase;
        font-size: ${theme.fontSize.xs};
        border-radius: ${theme.border.radius};
        font-weight: bold;
        box-shadow: ${theme.shadow.buttonShadow};
        &:hover {
          box-shadow: ${theme.shadow.buttonHover};
          background: ${theme.color.accentPurple};
          cursor: pointer;
          transition: all 0.3s ease;
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
const backdropStyle = {
    position:'fixed',
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor:'rgba(0,0,0,0.3)',
    padding:'50'
};
const modalStyle = {
   backgroundColor:theme.color.offWhite,
   borderRadius:5,
   maxWidth:600,
   minHeight:400,
   margin:'0 auto',
   padding:30,
   position:'relative'
};
// const modalBackDropStyle = styled.div`
// position:fixed;
// top:0;
// bottom:0;
// left:0;
// right:0;
// padding:50;
// background-color:rgba(0,0,0,0.3)
// `;

// const modalBackStyle = styled.div`
//   background-color: #fff;
//   border-radius: 5;
//   max-width: 600;
//   min-height: 400;
//   margin: 0 auto;
//   padding: 30;
//   position:relative;
// `;


