import React from 'react';
import CompanySettingsRoom from "./CompanySettingsRoom";

const CompanySettingsRoomsList = (props) => {
  const { rooms, deleteRoomForHotel, updateRoomForHotel, currentUser, handleInputChange} = props;
  return (
    <div className="rooms-list">
      {rooms && rooms.map(room => (
        <CompanySettingsRoom
          key={room._id}
          name={room.name}
          currentUser={currentUser}
          updateRoomForHotel={updateRoomForHotel}
          deleteRoomForHotel={deleteRoomForHotel}
          handleInputChange={handleInputChange}
        />
      ))}
    </div>
  )
};

export default CompanySettingsRoomsList;
