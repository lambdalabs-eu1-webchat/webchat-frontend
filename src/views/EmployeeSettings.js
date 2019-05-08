import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EmployeeSettingsForm from '../components/EmployeeSettingsForm';
import { updateEmployee } from '../store/actions/users';

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

  fireupdateEmployee = () => {
    const employeeUpdates = {
      ...this.state.employeeChanges,
    };
    this.props.updateEmployee(employeeUpdates, this.props.employee._id);
  };

  render() {
    return (
      <div>
        <h1>Employee Settings</h1>
        <EmployeeSettingsForm
          employee={this.props.employee}
          employeeChanges={this.state.employeeChanges}
          handleInputChange={this.handleInputChange}
          fireupdateEmployee={this.fireupdateEmployee}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  employee: state.currentUser,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateEmployee,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeSettings);
