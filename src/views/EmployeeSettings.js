import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import theme from './../theme/styledTheme';

import EmployeeSettingsForm from '../components/EmployeeSettingsForm';
import { updateUser } from '../store/actions/users';
import Restricted from '../components/reusable/RestrictedModal';

class EmployeeSettings extends React.Component {
  state = {
    employeeChanges: {
      name: this.props.employee.name,
      email: this.props.employee.email,
      password: '',
      passwordConf: '',
      motto: this.props.employee.motto,
      nameEmailModalOpen: false,
      passwordsModalOpen: false,
    },
  };

  handleInputChange = event => {
    this.setState({
      employeeChanges: {
        ...this.state.employeeChanges,
        [event.target.name]: event.target.value,
      },
    });
  };

  clearChanges = () => {
    this.setState({
      employeeChanges: {
        name: this.props.employee.name,
        email: this.props.employee.email,
        password: '',
        passwordConf: '',
        motto: this.props.employee.motto,
      },
    });
  };

  openPasswordsModal = () => {
    this.setState({ passwordsModalOpen: true });
  };

  openNameEmailModal = () => {
    this.setState({ nameEmailModalOpen: true });
  };

  closeRestrictedModal = () => {
    this.setState({ passwordsModalOpen: false });
    this.setState({ nameEmailModalOpen: false });
  };

  checkPasswordMatch = (password, passwordRetype) => {
    if (password === passwordRetype) {
      return true;
    } else {
      this.setState({
        employeeChanges: {
          ...this.state.employeeChanges,
          password: '',
          passwordConf: '',
        },
      });
      this.openPasswordsModal();
    }
  };

  checkEligibileUpdates = () => {
    const employeeChanges = this.state.employeeChanges;
    if (employeeChanges.name && employeeChanges.email) {
      return true;
    } else {
      this.setState({
        employeeChanges: {
          ...this.state.employeeChanges,
          name: this.props.employee.name,
          email: this.props.employee.email,
        },
      });
      this.openNameEmailModal();
    }
  };

  fireUserUpdates = () => {
    const employeeChanges = this.state.employeeChanges;
    if (
      (!employeeChanges.password ||
        (employeeChanges.password &&
          this.checkPasswordMatch(
            employeeChanges.password,
            employeeChanges.passwordConf,
          ))) &&
      this.checkEligibileUpdates()
    ) {
      const userUpdates = this.state.employeeChanges;
      this.props.updateUser(userUpdates, this.props.employee._id);
    }
  };

  render() {
    return (
      <EmployeeSettingsWrapper>
        <EmployeeSettingsForm
          employee={this.props.employee}
          employeeChanges={this.state.employeeChanges}
          handleInputChange={this.handleInputChange}
          fireUserUpdates={this.fireUserUpdates}
          clearChanges={this.clearChanges}
          loading={this.props.loading}
        />

        {this.state.passwordsModalOpen && (
          <Restricted
            alert="Passwords must match"
            isRestrictedModalOpen={this.state.passwordsModalOpen}
            closeRestrictedModal={this.closeRestrictedModal}
          />
        )}

        {this.state.nameEmailModalOpen && (
          <Restricted
            alert="Name and email cannot be blank"
            isRestrictedModalOpen={this.state.nameEmailModalOpen}
            closeRestrictedModal={this.closeRestrictedModal}
          />
        )}
      </EmployeeSettingsWrapper>
    );
  }
}

EmployeeSettings.propTypes = {
  updateUser: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
  employee: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    hotel_id: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    user_type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  employee: state.currentUser,
  loading: state.loading,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateUser,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeSettings);

const EmployeeSettingsWrapper = styled.div`
  padding: 5rem 5rem 11rem 5rem;
  background: ${theme.color.white};
  margin: 0 5rem;
  @media (max-width: 600px) {
    padding: 3rem;
    margin: 0;
  }
`;
