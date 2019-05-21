import React from 'react';
import theme from '../theme/modalTheme';
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
            <div style={backdropStyle}>
                <div style={modalStyle}>
               
                {this.props.children}

                <section className="pricing-plan">
            <h1>Users and their Roles</h1>
              <p>
                You will have 3 types of Users and each User has access to allocated pages depending on their company status 
              </p>
            <div className="pricing-cards">
              <div className="pricing-card">
                <h2><i className="fas fa-user-cog"></i>
                <br></br> Super Admin</h2>
                <ul>
                <li><i className="fas fa-check"></i>Unlimited access</li>
                  <li><i className="fas fa-check"></i>Can register</li>
                  <li><i className="fas fa-check"></i>Add team members</li>
                  <li><i className="fas fa-check"></i>Add rooms</li>
                  <li><i className="fas fa-check"></i>Change company settings</li>
                </ul>
              </div>

              <div className="pricing-card">
              <h2><i className="fas fa-user"></i>
                <br></br> Admin</h2>
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
                <br></br>Employee</h2>
                <ul>
                  <li><i className="fas fa-check"></i>Restricted access</li>
                  <li><i className="fas fa-check"></i>Live chat with guests</li>
                  <li><i className="fas fa-check"></i>Check guests in and out</li>
                  <li><i className="fas fa-check"></i>Track ticket status</li>
                  <li><i className="fas fa-check"></i>Change their settings</li>
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
   backgroundColor:'#fff',
   borderRadius:5,
   maxWidth:600,
   minHeight:400,
   margin:'0 auto',
   padding:30,
   position:'relative'
};
const footerStyle = {
 position: 'absolute',
 bottom:20
};

