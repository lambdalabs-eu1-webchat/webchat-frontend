import React from 'react';
import {deleteRoomForHotel, updateRoomForHotel } from "../store/actions/rooms";



const handleUpdateClick = (updateRoomForHotel, id, currentUser, user_type) => {
  return (event) => {
    if (window.confirm('Are you sure you want to edit this room?')) {
      event.preventDefault();
      updateRoomForHotel(id);
    }
  }
};
const handleDeleteClick = (deleteUser, id, currentUser, user_type) => {
  if (currentUser.user_type !== 'admin' && currentUser.user_type !== 'super admin') {
    return () => {};
  }
  return (event) => {
    if (user_type === 'super admin') {
      return;
    }
    if (user_type === 'admin' && currentUser.user_type === 'admin') {
      alert('You are not authorized to delete this room!');
      return;
    }
    if (window.confirm('Are you sure you want to delete this room?')) {
      event.preventDefault();
      deleteRoomForHotel(id);
    }
  }
};

const CompanySettingsRoom = ({ name, user_type, currentUser, roomId, deleteRoomForHotel}) => {
  return (
      <div className="room">
        <input placeholder={ name } />
        <i className="far fa-edit" onClick={handleUpdateClick(updateRoomForHotel, roomId, currentUser, user_type)} />
        <i className="fas fa-trash-alt" onClick={handleDeleteClick(deleteRoomForHotel, roomId, currentUser, user_type)}/>
      </div>
  );
};

export default CompanySettingsRoom;
