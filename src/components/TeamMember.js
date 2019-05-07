import React from 'react';

const TeamMember = (props) => {
  const { name, email, user_type, currentUser } = props;
  if(user_type === 'admin' || user_type === 'super admin' && currentUser.user_type === 'super admin') {
    return (
        <div className="hotel-staff">
          <p>{ name }</p>
          <p>{ email }</p>
          <input type="checkbox" defaultChecked/>
          <p><i className="fas fa-trash-alt"></i></p>
        </div>
    );
  }
  return (
      <div className="hotel-staff">
        <p>{ name }</p>
        <p>{ email }</p>
        <input type="checkbox" disabled="disabled" readOnly/>
        <p><i className="fas fa-trash-alt"></i></p>
      </div>
  )
};

export default TeamMember;
