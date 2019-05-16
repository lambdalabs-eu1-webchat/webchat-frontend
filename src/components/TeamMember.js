import React, { useState } from 'react';
import styled from 'styled-components';

import Restricted from './reusable/RestrictedModal';
import Confirm from './reusable/ConfirmModal';

const HotelStaffWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 500px) {
    flex-direction: column;
    max-width: 100%;
    text-align: left;
    padding: 20px;
  }
  p {
    width: 50px;
  }
`;

const TeamMember = ({
  name,
  email,
  user_type,
  currentUser,
  changeUserType,
  userId,
  deleteUser,
}) => {
  // use Hooks here, as it's already a func component
  const [isRestrictedModalOpen, setRestrictedModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const isAdmin = user_type === 'admin' || user_type === 'super admin';

  const openModal = () => setRestrictedModalOpen(true);
  const closeModal = () => setRestrictedModalOpen(false);

  const handleAdminPromotion = (changeUserType, id, currentUser, user_type) => {
    if (currentUser.user_type !== 'super admin') {
      return () => {};
    }
    return event => {
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
  const handleDeleteClick = (currentUser, user_type) => {
    if (
      currentUser.user_type !== 'admin' &&
      currentUser.user_type !== 'super admin'
    ) {
      return () => {};
    }
    return event => {
      if (user_type === 'super admin') {
        return;
      }
      if (user_type === 'admin' && currentUser.user_type === 'admin') {
        openModal();
        return;
      }
      setConfirmDeleteOpen(true);
    };
  };
  console.log(isConfirmDeleteOpen);
  return (
    <HotelStaffWrapper>
      <p>{name}</p>
      <p>{email}</p>
      <input
        type="checkbox"
        checked={isAdmin}
        disabled={user_type === 'super admin'}
        onChange={handleAdminPromotion(
          changeUserType,
          userId,
          currentUser,
          user_type,
        )}
      />
      <i
        className="fas fa-trash-alt"
        onClick={handleDeleteClick(currentUser, user_type)}
      />

      {isRestrictedModalOpen && (
        <Restricted
          alert="You are not authorized to delete this user!"
          isModalOpen={isRestrictedModalOpen}
          closeRestrictedModal={closeModal}
        />
      )}
      {isConfirmDeleteOpen && (
        <Confirm
          isOpen={isConfirmDeleteOpen}
          question={`Are you sure you want to delete the user "${name}"?`}
          yesCallBack={() => deleteUser(userId)}
          closeModal={() => setConfirmDeleteOpen(false)}
        />
      )}
    </HotelStaffWrapper>
  );
};

export default TeamMember;
