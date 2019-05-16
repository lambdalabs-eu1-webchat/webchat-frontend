import React, { useState } from 'react';
import Confirm from './reusable/ConfirmModal';

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
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
  const getRoomNameFromInput = parentNode => {
    let roomName = '';
    parentNode.childNodes.forEach(childNode => {
      if (childNode.name === 'roomName') {
        roomName = childNode.value;
      }
    });
    return roomName;
  };
  return !room || !room[index] ? (
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
      <i className="fas fa-trash-alt" onClick={handleDeleteClick} />
      {
        <Confirm
          isOpen={isDeleteModalOpen}
          question={`Are you sure you want to delete room ${name}`}
          closeModal={() => setIsDeleteModalOpen(false)}
          yesCallBack={() => deleteRoomForHotel(room, currentUser.hotel_id)}
        />
      }
    </div>
  );
};

export default CompanySettingsRoom;
