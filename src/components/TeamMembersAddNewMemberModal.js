import React from 'react';

const handleClick = createUser => (event) => {
  event.preventDefault();
  let name = '';
  let email = '';
  let password = '';
  event.target.parentNode.childNodes.forEach((childNode) => {
    console.log('clicked');
    if (childNode.name === 'name') {
      name = childNode.value;
    } else if (childNode.name === 'email') {
      email = childNode.value;
    } else if (childNode.name === 'password') {
      password = childNode.value;
    }
  });
  if (name && email && password) {
    createUser(name, email, password, 'receptionist');
  }
};

const TeamMembersAddNewMemberModal = ({ createUser}) => {
  return (
      <div className="add-member-modal">
        <button type="button" className="close" onClick={(e) => console.log('hide modal')}>X</button>
        <p>Name</p><input type="text" name="name" />
        <p>Email</p><input type="email" name="email"/>
        <p>Password</p><input type="password" name="password"/>
        <button type="submit" onClick={handleClick(createUser)}>Add Member</button>
      </div>
  );
};

export default TeamMembersAddNewMemberModal;
