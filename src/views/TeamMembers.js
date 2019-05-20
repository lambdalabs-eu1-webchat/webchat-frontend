import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchAllUsers,
  fetchHotelStaff,
  createUser,
  changeUserType,
  deleteUser,
} from '../store/actions/users';
import { fetchSingleHotel } from '../store/actions/hotel';
import TeamMembersList from '../components/TeamMembersList';
import TeamMembersAddNewMemberModal from '../components/TeamMembersAddNewMemberModal';
import Restricted from '../components/reusable/RestrictedModal';
import styled from 'styled-components';
import theme from './../theme/styledTheme';

class TeamMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShown: false,
      isModalOpen: false,
    };
    this.props = props;
    const { currentUser, dispatchFetchHotelStaff } = this.props;
    dispatchFetchHotelStaff(currentUser.hotel_id);
  }

  componentDidMount() {
    this.props.dispatchFetchSingleHotel(this.props.currentUser.hotel_id);
  }

  checkAddEligibility = () => {
    const plan = this.props.hotel.plan;
    const staffAmount = this.props.users.length;
    if (plan === 'free' && staffAmount === 5) {
      return false;
    } else if (plan === 'pro' && staffAmount === 15) {
      return false;
    } else {
      return true;
    }
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  handleShowModal = () => {
    if (this.checkAddEligibility()) {
      this.setState({ modalShown: true });
    } else {
      this.setState({ isModalOpen: true });
    }
  };

  handleHideModal = () => {
    this.setState({ modalShown: false });
  };

  render() {
    const {
      users,
      currentUser,
      dispatchCreateUser,
      dispatchChangeUserType,
      dispatchDeleteUser,
    } = this.props;
    return (
      <TeamMembersOuterWrapper>
        <h2>Team Members</h2>
        <TeamMembersWrapper>
          <h3>Update and Assign Team Members</h3>
          <TeamMembersList
            users={users}
            currentUser={currentUser}
            changeUserType={dispatchChangeUserType}
            deleteUser={dispatchDeleteUser}
            loading={this.props.loading}
          />
          <TeamMembersAddNewMemberModal
            createUser={dispatchCreateUser}
            handleHideModal={this.handleHideModal}
            modalShown={this.state.modalShown}
            plan={this.props.hotel.plan}
            staffAmount={users.length}
            loading={this.props.loading}
          />
          <button onClick={this.handleShowModal}>Add Team Members</button>
          {this.state.isModalOpen && (
            <Restricted
              alert="Please upgrade your account to add more users"
              isRestrictedModalOpen={this.state.isModalOpen}
              closeRestrictedModal={this.closeModal}
            />
          )}
        </TeamMembersWrapper>
      </TeamMembersOuterWrapper>
    );
  }
}

TeamMembers.propTypes = {
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  hotel: PropTypes.object.isRequired,
  dispatchChangeUserType: PropTypes.func.isRequired,
  dispatchDeleteUser: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    users: state.users,
    currentUser: state.currentUser,
    hotel: state.hotel,
    loading: state.loading,
  };
};

export default connect(
  mapStateToProps,
  {
    dispatchFetchAllUsers: fetchAllUsers,
    dispatchFetchHotelStaff: fetchHotelStaff,
    dispatchCreateUser: createUser,
    dispatchChangeUserType: changeUserType,
    dispatchDeleteUser: deleteUser,
    dispatchFetchSingleHotel: fetchSingleHotel,
  },
)(TeamMembers);

const TeamMembersOuterWrapper = styled.div`
  margin: 0 3rem;
  min-height: 730px;
  @media (max-width: 800px) {
    margin: 0 auto;
  }
  h2 {
    font-size: ${theme.fontSize.l};
    padding: 1.5rem 0;
  }
`;

const TeamMembersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 5rem 0 0 0;
  @media (max-width: 800px) {
    flex-direction: column;
    max-width: 100%;
  }

  h3 {
    font-size: ${theme.fontSize.xs};
    color: ${theme.color.accentPurple};
    padding: 1.5rem 0;
  }

  button {
    width: 17rem;
    height: ${theme.button.smallButton};
    font-size: ${theme.fontSize.xxs};
    border-radius: ${theme.border.radius};
    background: ${theme.color.accentGreen};
    border: none;
    text-transform: ${theme.textTransform.uppercase};
    color: ${theme.color.white};
    font-weight: ${theme.fontWeight.bold};
    margin: 15px 0;
    box-shadow: ${theme.shadow.buttonShadow};
    &:hover {
      box-shadow: ${theme.shadow.buttonHover};
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
    @media (max-width: 800px) {
      width: 100%;
      height: ${theme.button.height};
      font-size: ${theme.fontSize.xs};
      margin: 1.5rem 0;
    }
  }
`;
