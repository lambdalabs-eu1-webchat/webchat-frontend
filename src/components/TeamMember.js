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
const handleDeleteClick = (deleteUser, id, currentUser, user_type) => {
  if (currentUser.user_type !== 'admin' && currentUser.user_type !== 'super admin') {
    return () => {};
  }
  return (event) => {
    if (user_type === 'super admin') {
      return;
    }
    if (user_type === 'admin' && currentUser.user_type === 'admin') {
      alert('You are not authorized to delete this user!');
      return;
    }
    if (window.confirm('Are you sure you want to delete this user?')) {
      event.preventDefault();
      deleteUser(id);
    }
  }
};

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
      <i className="fas fa-trash-alt" onClick={handleDeleteClick(deleteUser, userId, currentUser, user_type)}/>
    </div>
  );
};

export default TeamMember;