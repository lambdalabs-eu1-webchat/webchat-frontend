import React, { useState } from 'react';
import styled from 'styled-components';

import Restricted from './reusable/RestrictedModal';
import theme from './../theme/styledTheme';
import Spinner from '../components/reusable/Spinner';

const TeamMembersAddNewMemberModal = ({
  createUser,
  modalShown,
  handleHideModal,
  plan,
  staffAmount,
  loading,
}) => {
  // use Hooks here, as it's already a func component
  const [isModalOpen, setModalOpen] = useState(false);

  const showHideClassName = modalShown
    ? 'modal display-block'
    : 'modal display-none';

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const checkAddEligibility = (plan, staffAmount) => {
    if (plan === 'free' && staffAmount === 5) {
      openModal();
    } else if (plan === 'pro' && staffAmount === 15) {
      openModal();
    } else {
      return true;
    }
  };

  const handleClick = (
    createUser,
    handleHideModal,
    plan,
    staffAmount,
  ) => event => {
    event.preventDefault();
    let name = '';
    let email = '';
    let password = '';
    event.target.parentNode.childNodes.forEach(childNode => {
      if (childNode.name === 'name') {
        name = childNode.value;
      } else if (childNode.name === 'email') {
        email = childNode.value;
      } else if (childNode.name === 'password') {
        password = childNode.value;
      }
    });
    let blank = false;
    if (name && email && password && checkAddEligibility(plan, staffAmount)) {
      createUser(name, email, password, 'receptionist');
      setTimeout(handleHideModal, 800);
    } else {
      blank = true;
    }

    if (blank) {
      event.target.parentNode.childNodes.forEach(childNode => {
        if (childNode.getAttribute('id') === 'add-member-message') {
          childNode.textContent = 'Please fill in all the required fields.';
        }
      });
    } else {
      event.target.parentNode.childNodes.forEach(childNode => {
        if (childNode.name === 'name') {
          childNode.value = '';
        } else if (childNode.name === 'email') {
          childNode.value = '';
        } else if (childNode.name === 'password') {
          childNode.value = '';
        }
      });
    }
  };

  return (
    <AddOuterWrapper>
      <AddMembersModalWrapper className={showHideClassName}>
        <section className="modal-main">
          <button type="button" id="close" onClick={handleHideModal}>
            X
          </button>
          <p>Name*</p>
          <input type="text" name="name" placeholder="Name..." />
          <p>Email*</p>
          <input type="email" name="email" placeholder="Email..." />
          <p>Password*</p>
          <input
            type="password"
            name="password"
            placeholder="Default password..."
          />
          <button
            type="submit"
            onClick={handleClick(createUser, handleHideModal, plan, staffAmount)}
          >
            {loading.createUser ? <Spinner /> : 'Add Member'}
          </button>
          <p id="add-member-message" />
        </section>

        {isModalOpen && (
          <Restricted
            alert="Please upgrade your account to add more users"
            isRestrictedModalOpen={isModalOpen}
            closeRestrictedModal={closeModal}
          />
        )}
      </AddMembersModalWrapper>
    </AddOuterWrapper>
  );
};

export default TeamMembersAddNewMemberModal;

const AddOuterWrapper = styled.div`
.display-block {
  display: block;
}

.display-none {
  display: none;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}
`;

const AddMembersModalWrapper = styled.div`
  p {
    font-size: ${theme.fontSize.xs};
    color: ${theme.color.accentPurple};
    padding: 1.5rem 0;
  }
  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid ${theme.color.footerText};
    margin-bottom: 20px;
    height: ${theme.input.height};
    font-size: ${theme.fontSize.xs};
    padding: 20px 0;
    border-radius: 0;
    &:focus {
      outline: none;
    }
    &::placeholder {
    font-weight: normal;
    font-size: ${theme.fontSize.xxs};
    font-family: 'Lato', sans-serif;
    }
  }
  
  .modal-main {
    display: flex;
    flex-direction: column;
    position: fixed;
    background: white;
    width: 40rem;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    border-radius: ${theme.border.radius};
    padding: 0 3rem;
    button {
      width: 100%;
      height: ${theme.button.smallButton};
    }
    @media(max-width: 500px) {
      width:100%;
    }
  }
  
  #close {
    background: none;
    color: ${theme.color.textColor};
    width: 3rem;
    height: 3rem;
    position: relative;
    left: 100%;
    font-size: ${theme.fontSize.s};
    text-align: center;
    box-shadow: none;
    padding: 0.5rem;
    margin: 0;
    &:hover {
      box-shadow: none;
      color: ${theme.color.accentPurple};
    }
  }
`;
