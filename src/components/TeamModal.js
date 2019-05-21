import React from 'react';
import theme from '../theme/styledTheme';

export default class TeamModal extends React.Component {

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
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
        )
    }
}
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


