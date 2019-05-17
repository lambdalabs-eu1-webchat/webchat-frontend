import React, { useState } from 'react';
import styled from 'styled-components';
import theme from './../theme/styledTheme';
import Restricted from './reusable/RestrictedModal';
import Confirm from './reusable/ConfirmModal';

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
  return (
    <HotelStaffWrapper>
      <p><label>Name:</label>{name}</p>
      <p><label>Email:</label>{email}</p>
      <div className="checkbox-container">
        <label>Admin:</label>
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
      </div>

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
      {
        <Confirm
          isOpen={isConfirmDeleteOpen}
          question={`Are you sure you want to delete the user "${name}"?`}
          yesCallBack={() => deleteUser(userId)}
          closeModal={() => setConfirmDeleteOpen(false)}
        />
      }
    </HotelStaffWrapper>
  );
};

export default TeamMember;

const HotelStaffWrapper = styled.div`
  display: flex;
  padding: 1.5rem;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    text-align: left;
    background: ${theme.color.lightPurple};
    border-radius: ${theme.border.radius};
    margin: 1.5rem 0;
  }
  
  label {
    display: none;
    @media (max-width: 600px) {
    display: inline-flex;
    padding-right: 1rem;
    font-size: ${theme.fontSize.xs};
    color: ${theme.color.accentPurple};
    }
  }
  
  p {
    width: 20rem;
    font-size: ${theme.fontSize.xs};
    @media (max-width: 600px) {
    width: 100%;
    padding: 1.5rem;
    border-bottom: 1px solid ${theme.color.footerText};
    }
  }
  
  input {
    padding-left: 1.5rem;
    margin: 0 auto;
    align-self: center;
    vertical-align:middle;
    text-align: center;
    font-size: 3rem;
    @media (max-width: 600px) {
      padding-bottom: 15px;
    }
  }
  
  .checkbox-container {
    width: 10rem;
    align-items: center;
    @media (max-width: 600px) {
      width: 100%;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid ${theme.color.footerText};
      
      label {
        align-self: center;
      }
    }
  }
  
  .fa-trash-alt {
    color: ${theme.color.accentPurple};
    width: 20rem;
    font-size: ${theme.fontSize.m};
    @media (max-width: 600px) {
      width: 100%;
      padding: 1.5rem;
      text-align: center;
      }
    &:last-child {
      width: 10rem;
    }
  }
`;
