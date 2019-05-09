import React from 'react';
import { updateRoomForHotel } from "../store/actions/rooms";

const getRoomNameFromInput = (parentNode) => {
  let roomName = '';
  parentNode.childNodes.forEach(childNode => {
    if (childNode.name === 'roomName') {
      roomName = childNode.value;
    }
  });
  return roomName;
};

const clearRoomNameField = (parentNode) => {
  parentNode.childNodes.forEach((childNode) => {
    if (childNode.name === 'roomName') {
      childNode.value = '';
    }
  });
};

const handleUpdateClick = (updateRoomForHotel, id, hotelId) => {
  return (event) => {
    event.preventDefault();
    const roomName = getRoomNameFromInput(event.target.parentNode);
    if (window.confirm('Are you sure you want to edit this room?')) {
      if (roomName) {
        updateRoomForHotel(hotelId, id, roomName);
        clearRoomNameField(event.target.parentNode);
      }
    }
  };
};

const handleDeleteClick = (deleteRoomForHotel, id, hotelId) => {
  return (event) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      event.preventDefault();
      deleteRoomForHotel(id, hotelId);
    }
  }
};

const CompanySettingsRoom = ({ room, name, user_type, currentUser, id, deleteRoomForHotel, updateRoomForHotel}) => {
  return (
    <div className="room">
      <input placeholder={ name } name="roomName"/>
      <i className="far fa-edit" onClick={handleUpdateClick(updateRoomForHotel, currentUser.hotel_id, room, name)} />
      <i className="fas fa-trash-alt" onClick={handleDeleteClick(deleteRoomForHotel, room, currentUser.hotel_id)}/>
    </div>
  );
};

export default CompanySettingsRoom;
