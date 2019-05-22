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
            <div className="backStyle">
                <div className="backmodal">           
                <h2>Welcome to FrontDesk</h2>
           <section>
          <p className="card">
        <ul>
         As the Super Admin for your Hotel, you have access to all areas of the app including company information and billing.
         To get talking to your guests right away, simply add your hotel's rooms on this settings page and check in your first guest.
        You can also add any colleagues you'd like to work with over on the Team Members page. 
           There are two types of user permissions you can assign to your team:
        </ul>
          </p>
          <br />

        <ul>
        <li>Team-Member: Live chat with guests, check guests in/out, track tickets.</li>
        <li>Admin: All of the above, see guest's chat ratings, add team members</li>
       
        </ul>
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
  text-align:center;

  box-shadow: ${theme.shadow.containerShadow};
  overflow-y:scroll;
    button {
      margin: 40px;
      padding: 10px 20px;
      width: 90%;
      border-radius: 5px;
      height: ${theme.button.height};
      font-size: ${theme.fontSize.xs};
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
  }

  .card {
    padding: 10 2.5% 5% 2.5%;
    text-align:left;
    @media (max-width: 1000px) {
      width: 95%;
      padding: 10% 0 15% 0;
      margin: 0 5%;
    }
  
  }
  .backmodal {
    background-color:${theme.color.offWhite};
    border-radius:1rem;
    max-width:80rem;
    min-height:20rem;
    top:8rem;
    margin:0 auto;
    padding:5rem;
    position:relative;
    font-size:22px;
   
  }
  .backStyle {
      position:fixed;
      top:0;
      bottom:0;
      left:0;
      right:0;
      background-color:rgba(0,0,0,0.3);
      padding:5rem;
      overflow:scroll;
  }
`;

