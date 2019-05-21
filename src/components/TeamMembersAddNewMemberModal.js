import React from 'react';
import styled from 'styled-components';
import { validate } from 'email-validator';

import { messages } from '../utils/messages';
import theme from './../theme/styledTheme';
import Spinner from '../components/reusable/Spinner';

const TeamMembersAddNewMemberModal = ({
  createUser,
  modalShown,
  handleHideModal,
  plan,
  staffAmount,
  loading,
  flashMessage,
  handleFlash,
}) => {
  const showHideClassName = modalShown
    ? 'modal display-block'
    : 'modal display-none';

  const handleClick = (createUser, handleHideModal) => async event => {
    const userInfo = event.target;
    event.preventDefault();
    let name = '';
    let email = '';
    let password = '';
    userInfo.parentNode.childNodes.forEach(childNode => {
      if (childNode.name === 'name') {
        name = childNode.value;
      } else if (childNode.name === 'email') {
        email = childNode.value;
      } else if (childNode.name === 'password') {
        password = childNode.value;
      }
    });

    if (name && email && password) {
      if (validate(email)) {
        if (password.length > 3) {
          const res = await createUser(name, email, password, 'receptionist');
          if (!res.user) {
            handleFlash(res.message);
          } else {
            handleHideModal();
            userInfo.parentNode.childNodes.forEach(childNode => {
              if (childNode.name === 'name') {
                childNode.value = '';
              } else if (childNode.name === 'email') {
                childNode.value = '';
              } else if (childNode.name === 'password') {
                childNode.value = '';
              }
            });
          }
        } else {
          handleFlash(messages.tempPasswordLength);
        }
      } else {
        handleFlash(messages.validEmail);
      }
    } else {
      handleFlash(messages.allRequiredFields);
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
          <p id="flash-message">{flashMessage}</p>
          <button
            type="submit"
            onClick={handleClick(
              createUser,
              handleHideModal,
              plan,
              staffAmount,
            )}
          >
            {loading.createUser ? <Spinner /> : 'Add Member'}
          </button>
          <p id="add-member-message" />
        </section>
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
  #flash-message {
    font-size: ${theme.fontSize.xxs};
    color: ${theme.color.textColor};
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
    @media (max-width: 500px) {
      width: 100%;
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
