import React from 'react';

// func here takes the hotel on state and checks satff count against plan/team-members

const checkAddEligibility = (plan, staffAmount) => {
  if (plan === 'free' && staffAmount === 5) {
    return alert('Please upgrade your account to add more users');
  } else if (plan === 'pro' && staffAmount === 15) {
    return alert('Please upgrade your account to add more users');
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

const TeamMembersAddNewMemberModal = ({
  createUser,
  modalShown,
  handleHideModal,
  plan,
  staffAmount,
}) => {
  const showHideClassName = modalShown
    ? 'modal display-block'
    : 'modal display-none';
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button type="button" className="close" onClick={handleHideModal}>
          X
        </button>
        <p>Name</p>
        <input type="text" name="name" placeholder="Name..." />
        <p>Email</p>
        <input type="email" name="email" placeholder="Email..." />
        <p>Password</p>
        <input
          type="password"
          name="password"
          placeholder="Default password..."
        />
        <button
          type="submit"
          onClick={handleClick(createUser, handleHideModal, plan, staffAmount)}
        >
          Add Member
        </button>
        <p id="add-member-message" />
      </section>
    </div>
  );
};

export default TeamMembersAddNewMemberModal;
