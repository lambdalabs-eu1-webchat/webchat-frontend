import React from 'react';
import styled from 'styled-components';
import TeamMember from './TeamMember';

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  @media (max-width: 500px) {
  display: none;
  }
`;

const TeamMembersListWrapper = styled.div`
    width: 880px;
    margin: 0 auto;
    height: 400px;
    overflow: scroll;
    @media (max-width: 500px) {
    max-width: 100%;
    }
`;

const TeamMembersList = (props) => {
  const { deleteUser, changeUserType } = props;
  return (
    <TeamMembersListWrapper>
      <ListHeader>
        <p>Name</p>
        <p>Email</p>
        <p>Admin</p>
        <p>Remove</p>
      </ListHeader>
      {props.users.map(user => (
        <TeamMember
          key={user._id}
          name={user.name} email={user.email}
          currentUser={props.currentUser}
          user_type={user.user_type}
          userId={user._id}
          changeUserType={changeUserType}
          deleteUser={deleteUser}
        />
      ))}
    </TeamMembersListWrapper>
  )
};

export default TeamMembersList;
