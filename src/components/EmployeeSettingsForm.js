import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const EmployeeSettingsFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmployeeSettingsForm = ({
  employeeChanges,
  handleInputChange,
  fireUserUpdates,
  clearChanges,
}) => {
  return (
    <div>
      <EmployeeSettingsFormWrapper>

          <TextField
            name="name"
            type="text"
            value={employeeChanges.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            name="email"
            type="text"
            value={employeeChanges.email}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            name="password"
            type="password"
            value={employeeChanges.password}
            onChange={handleInputChange}
            placeholder="new password"
            margin="normal"
          />
          <TextField
            name="passwordConf"
            type="password"
            value={employeeChanges.passwordConf}
            onChange={handleInputChange}
            placeholder="retype new password"
            margin="normal"
          />
          <TextField
            name="motto"
            type="text"
            value={employeeChanges.motto}
            onChange={handleInputChange}
            placeholder="motto"
            margin="normal"
          />
      </EmployeeSettingsFormWrapper>
      <Button variant="contained" color="primary" onClick={fireUserUpdates}>
        Update
      </Button>
      <Button variant="contained" color="primary" onClick={clearChanges}>
        Cancel
      </Button>
    </div>
  );
};

export default EmployeeSettingsForm;
