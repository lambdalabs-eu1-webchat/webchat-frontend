import React from 'react';
import TeamMember from './TeamMember';

const TeamMembersList = (props) => {
  return (
      <div className="team-members-list">
        <div className="list-header">
          <p>Name</p>
          <p>Email</p>
          <p>Admin</p>
          <p>Remove</p>
        </div>
        {props.users.map(user => (
            <TeamMember
                key={`${user.id} + ${user.name}`}
                name={user.name} email={user.email}
                currentUser={props.currentUser}
                user_type={user.user_type}
            />
        ))}
      </div>
  )
};

export default TeamMembersList;
