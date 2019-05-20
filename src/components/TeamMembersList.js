import React from 'react';
import styled from 'styled-components';
import theme from './../theme/styledTheme';
import TeamMember from './TeamMember';

const TeamMembersList = props => {
  const { deleteUser, changeUserType, loading } = props;
  return (
    <TeamMembersListWrapper>
      <ListHeader>
        <h4>Name</h4>
        <h4>Email</h4>
        <h4>Admin</h4>
        <h4>Remove</h4>
      </ListHeader>
      {props.users.map(user => (
        <TeamMember
          key={user._id ||  'new'}
          name={user.name}
          email={user.email}
          currentUser={props.currentUser}
          user_type={user.user_type}
          userId={user._id}
          changeUserType={changeUserType}
          deleteUser={deleteUser}
          loading={loading}
        />
      ))}
    </TeamMembersListWrapper>
  );
};

export default TeamMembersList;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  background: ${theme.color.lightPurple};
  padding: 0 5rem;
  @media (max-width: 600px) {
    display: none;
  }
  
  h4 {
    color: ${theme.color.accentPurple};
    font-size: ${theme.fontSize.xxs};
    padding: 1rem 0;
    width: 20rem;
    &:last-child {
      width: 10rem;
    }
    &:nth-last-child(2) {
      width: 10rem;
    }
  }
`;

const TeamMembersListWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 400px;
  overflow: scroll;
  @media (max-width: 800px) {
    width: 100%;
  }
`;
