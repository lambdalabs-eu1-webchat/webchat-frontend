import React from 'react';

const EmployeeSettingsForm = ({ employeeChanges, handleInputChange }) => {
  return (
    <div>
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
        placeholder="add new password"
      />
      <input
        name="passwordConf"
        type="password"
        value={employeeChanges.passwordConf}
        onChange={handleInputChange}
        placeholder="retype your new password"
      />
      <input
        name="motto"
        type="text"
        value={employeeChanges.motto}
        onChange={handleInputChange}
        placeholder="add a motto"
      />
    </div>
  );
};

export default EmployeeSettingsForm;
