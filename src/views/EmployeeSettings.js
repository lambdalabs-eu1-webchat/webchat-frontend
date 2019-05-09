import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import EmployeeSettingsForm from '../components/EmployeeSettingsForm';
import { updateUser } from '../store/actions/users';

const EmployeeSettingsWrapper = styled.div`
  padding: 10% 25%;
`;

class EmployeeSettings extends React.Component {
  state = {
    employeeChanges: {
      name: this.props.employee.name,
      email: this.props.employee.email,
      password: '',
      passwordConf: '',
      motto: this.props.employee.motto,
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

  checkPasswordMatch = (password, passwordRetype) => {
    if (password === passwordRetype) {
      return true;
    } else {
      this.setState({
        employeeChanges: {
          ...this.state.employeeChanges,
          password: '',
          passwordConf: '',
        }
      })
      return alert('Passwords must match');
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
      return alert('Name and email cannot be blank');
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
        <h1>Employee Settings</h1>
        <EmployeeSettingsForm
          employee={this.props.employee}
          employeeChanges={this.state.employeeChanges}
          handleInputChange={this.handleInputChange}
          fireUserUpdates={this.fireUserUpdates}
          clearChanges={this.clearChanges}
        />
      </EmployeeSettingsWrapper>
    );
  }
}

const mapStateToProps = state => ({
  employee: state.currentUser,
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
