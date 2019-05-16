import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import theme from './../theme/styledTheme';

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
        <h1>Employee Settings</h1>
        <input
          name="name"
          type="text"
          value={employeeChanges.name}
          onChange={handleInputChange}
        />
        <input
          name="email"
          type="text"
          value={employeeChanges.email}
          onChange={handleInputChange}
        />
        <input
          name="password"
          type="password"
          value={employeeChanges.password}
          onChange={handleInputChange}
          placeholder="new password"
        />
        <input
          name="passwordConf"
          type="password"
          value={employeeChanges.passwordConf}
          onChange={handleInputChange}
          placeholder="retype new password"
        />
        <input
          name="motto"
          type="text"
          value={employeeChanges.motto}
          onChange={handleInputChange}
          placeholder="motto"
        />
        <div className="form-buttons">
          <button type="submit" onClick={fireUserUpdates}>
            Update
          </button>
          <button type="submit" onClick={clearChanges}>
            Cancel
          </button>
        </div>
      </EmployeeSettingsFormWrapper>
    </div>
  );
};

export default EmployeeSettingsForm;
