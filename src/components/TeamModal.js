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
            <Container>
            <div style={backdropStyle}>
                <div style={modalStyle}>           

                <section className="pricing-plan">
            <h2>User guide :</h2>
              <p>
                You will have 3 types of Users and each User has access to allocated pages depending on their company status 
              </p>
            <div className="pricing-cards">
              <div className="pricing-card">
                <h2> Super Admin</h2>
                <ul>
                <li>- Unlimited access</li>
                  <li>- Can Add new team members</li>
                  <li>- Can Add and delete rooms</li>
                  <li>- Can change company settings</li>
                  <li>- Live chat with guests</li>
                  <li>- Can monitor everything</li>
                </ul>
              </div>

              <div className="pricing-card">
              <h2>Admin</h2>
                <ul>
                  <li>- Restricted access</li>
                  <li>- Can not remove Admins</li>
                  <li>- Can check guests in and out</li>
                  <li>- Live chat with guests</li>
                  <li>- Track ticket status</li>
                  <li>- Add team members </li>
                </ul>
              </div>

              <div className="pricing-card">
              <h2>Employee</h2>
                <ul>
                  <li>- Restricted access</li>
                  <li>- Live chat with guests</li>
                  <li>- Check guests in and out</li>
                  <li>- Track ticket status</li>
                  <li>- Change their own settings</li>
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
        </Container>
        )
    }
}

const Container = styled.div`
  background: ${theme.color.white};
  margin: 0 5rem;

  box-shadow: ${theme.shadow.containerShadow};
  overflow-y:scroll;
    button {
      margin: 40px;
      padding: 10px 20px;
      width: 90%;
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
    padding: 10 2.5% 5% 2.5%;
    @media (max-width: 1000px) {
      width: 95%;
      padding: 10% 0 15% 0;
      margin: 0 5%;
    }
      
    .pricing-cards {
      display: column;
      justify-content: space-evenly;
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
      text-align:left;
      width: 30%;
      padding: 3%;
      margin: 2.5%;
      box-shadow: 0 16px 48px rgba(32, 41, 50, 0.21);
      @media (max-width: 1000px) {
        padding: 10%;
        margin: 10% auto;
        width: 100%;
      }
    }
  }
`;

// need to change these to styled components
const backdropStyle = {
    flexDirection:'column',
    position:'fixed',
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor:'rgba(0,0,0,0.3)',
    padding:'50',
    overflow:'scroll',
};
const modalStyle = {
   backgroundColor:theme.color.offWhite,
   borderRadius:5,
   maxWidth:800,
   minHeight:200,
   margin:'0 auto',
   padding:30,
   position:'relative',
  
};

