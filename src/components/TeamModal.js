import React from 'react';
import theme from '../theme/styledTheme';
import modalTheme from '../theme/modalTheme';
import styled from 'styled-components';

export default class TeamModal extends React.Component {

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    if (!this.props.show) {
        return null;
    }
    return (
      <Container>
        <div className="backStyle">
          <div className="backmodal">
            <h2>Welcome to FrontDesk</h2>
            <ul>
              <li>
                As the Super Admin for your Hotel, you have access to all areas of the app including company information and billing.
              </li>
              <li>
                To get talking to your guests right away, simply add your hotel's rooms on this settings page and check in your first guest.
              </li>
              <li>
                You can also add any colleagues you'd like to work with over on the Team Members page.
              </li>
              <li>
                There are two types of user permissions you can assign to your team:
              </li>
              <li>
                <span>
                  Team Member:
                </span>
                Live chat with guests, check guests in/out, track tickets.
              </li>
              <li>
                <span>
                  Admin:
                </span>
                All of the above, see guest's chat ratings, add team members.
              </li>
            </ul>

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
  
  ul {
    font-size: ${theme.fontSize.xs};
    text-align: left;
    list-style: disc;
    
    li {
    padding-top: 1.5rem;
      &:nth-last-child(2) {
        padding-top:15px;
        list-style: none;
      }
      &:nth-last-child(1) {
        list-style: none;
        padding-top: 0;
        padding-bottom: 2rem;
      }
      span {
        font-weight: bold;
        color: ${theme.color.accentPurple};
        padding-right: 5px;
      }
    }
  }
    button {
      margin-top: 2rem;
      text-transform: uppercase;
      width: 15rem;
      border-radius: ${theme.border.radius};
      height: ${theme.button.smallButton};
      font-size: ${theme.fontSize.xs};
      color: ${theme.color.white};
      background: ${theme.color.accentGreen};
      font-weight: bold;
      box-shadow: ${theme.shadow.buttonShadow};
      position: absolute;
      right: 2rem;
      bottom: 2rem;
      &:hover {
        box-shadow: ${theme.shadow.buttonHover};
        cursor: pointer;
        transition: all 0.3s ease;
      }
    }
  }

  .backmodal {
    background-color:${theme.color.offWhite};
    border-radius: ${theme.border.radius};
    box-shadow: ${theme.shadow.cardShadow};
    z-index: 55;
    max-width:80rem;
    min-height:20rem;
    top:8rem;
    margin:0 auto;
    padding:5rem;
    position:relative;
    font-size:22px;
    @media(max-width: 600px) {
      top: 2rem;
    }  
  }
  
  .backStyle {
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background:${modalTheme.overlay.background};
    padding:5rem;
    overflow:scroll;
  }
`;

