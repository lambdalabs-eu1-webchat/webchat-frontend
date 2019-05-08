import React from 'react';

const EmployeeSettingsForm = ({
  employeeChanges,
  handleInputChange,
  fireupdateEmployee,
}) => {
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
      <button onClick={fireupdateEmployee}>Update</button>
    </div>
  );
};

export default EmployeeSettingsForm;
