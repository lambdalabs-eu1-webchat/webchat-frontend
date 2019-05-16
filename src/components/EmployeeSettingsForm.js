import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import theme from './../theme/styledTheme';


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

const EmployeeSettingsFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 50rem;
  height: 60vh;
  @media (max-width: 1000px) {
    width: 100%;
    height: 100%;
  }
  
  h1 {
    font-size: ${theme.fontSize.xl};
    padding: 20px 0;
    color: ${theme.color.textColor};
  }
  
  input {
    border: none;
    border-bottom: 1px solid ${theme.color.footerText};
    margin-bottom: 20px;
    width: 100%;
    height: ${theme.input.height};
    font-size: ${theme.fontSize.xs};
    padding: 20px 0;
    border-radius: 0;
    &:focus {
      outline: none;
    }
  }
  
  .form-buttons {
    display: flex;
    @media(max-width: 600px) {
      flex-direction: column;
      width: 100%;
      margin: 0;
    }
    button {
      width: 15rem;
      height: ${theme.button.height};
      font-size: ${theme.fontSize.s};
      border-radius: ${theme.border.radius};
      background:${theme.color.accentGreen};
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
      &:first-child {
      margin-right: 1.5rem;
      }
      @media (max-width: 600px) {
        width: 100%;
      }
    }
  } 
`;
