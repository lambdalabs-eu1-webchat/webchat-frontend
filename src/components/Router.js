import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';

function Router({ user_type }) {
  if (!user_type) {
    return (
      <React.Fragment>
        <Route exact path='/' component={HomePage} />
        <Route path='/login' component={Login} />
      </React.Fragment>
    );
  }
  else if (user_type ==== 'admin'){
    return <React.Fragment><Route
        path='/logout'
        render={
          Logout
           
          
        }
      /></React.Fragment>
  } else if (user_type ==='super admin'){

  }else if(user_type === 'receptionist'){
  }
    // <Route
    //     exact
    //     path='/chat'
    //     render={props => (
    //       <Chat  />
    //     )}
    //   />
  // } return (
  //   <React.Fragment>
  //     <Route
  //       path='/register'
  //       render={props => (
  //         <Register
  //           {...props}
  //           loggedIn={Boolean(state.authToken)}
  //           registerUser={dispatchRegisterUser}
  //         />
  //       )}
  //     />
      
  //     <Route
  //       path='/logout'
  //       render={props => (
  //         <Logout
  //           {...props}
  //           loggedIn={Boolean(state.authToken)}
  //           logout={dispatchLogout}
  //         />
  //       )}
  //     />
  //     <Route
  //       path='/billing'
  //       render={props => (
  //         <Billing {...props} loggedIn={Boolean(state.authToken)} />
  //       )}
  //     />
  //     <Route
  //       path='/team-members'
  //       render={props => (
  //         <TeamMembers {...props} loggedIn={Boolean(state.authToken)} />
  //       )}
  //     />
  //   </React.Fragment>
  // );
}
