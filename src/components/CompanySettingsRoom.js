import React from 'react';

const getRoomNameFromInput = parentNode => {
  let roomName = '';
  parentNode.childNodes.forEach(childNode => {
    if (childNode.name === 'roomName') {
      roomName = childNode.value;
    }
  });
  return roomName;
};

const handleUpdateClick = (updateRoomForHotel, id, hotelId) => {
  return event => {
    event.preventDefault();
    const roomName = getRoomNameFromInput(event.target.parentNode);
    if (window.confirm('Are you sure you want to edit this room?')) {
      if (roomName) {
        updateRoomForHotel(hotelId, id, roomName);
      }
    }
  };
};

const handleDeleteClick = (deleteRoomForHotel, id, hotelId) => {
  return event => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      event.preventDefault();
      deleteRoomForHotel(id, hotelId);
    }
  };
};

const CompanySettingsRoom = ({
  room,
  rooms,
  index,
  name,
  currentUser,
  handleRoomInputChange,
  deleteRoomForHotel,
  updateRoomForHotel,
}) => {
  return !room[index] ? (
    <div>Loading</div>
  ) : (
    <div className="room">
      <input
        placeholder="room name"
        name="roomName"
        value={rooms[index].name}
        onChange={event => handleRoomInputChange(event, index)}
      />
      <i
        className="far fa-edit"
        onClick={handleUpdateClick(
          updateRoomForHotel,
          currentUser.hotel_id,
          room,
          name,
        )}
      />
      <i
        className="fas fa-trash-alt"
        onClick={handleDeleteClick(
          deleteRoomForHotel,
          room,
          currentUser.hotel_id,
        )}
      />
    </div>
  );
};

export default CompanySettingsRoom;
