import React from 'react';

const handleAdminPromotion = (changeUserType, id, currentUser, user_type) => {
  if (currentUser.user_type !== 'super admin') {
    return () => {};
  }
  return (event) => {
    if (user_type === 'super admin') {
      event.preventDefault();
      return;
    }
    if (!event.target.checked) {
      changeUserType(id, 'receptionist');
    } else {
      changeUserType(id, 'admin');
    }
  };
};
  }
const TeamMember = ({ name, email, user_type, currentUser, changeUserType, userId, deleteUser }) => {
  const isAdmin = user_type === 'admin' || user_type === 'super admin';
  return (
    <div className="hotel-staff">
      <p>{ name }</p>
      <p>{ email }</p>
      <input
        type="checkbox"
        checked={isAdmin}
        disabled={user_type === 'super admin'}
        onChange={handleAdminPromotion(changeUserType, userId, currentUser, user_type)}
      />
    </div>
  );
};

export default TeamMember;
