import React, { useState } from 'react';
import Confirm from './reusable/ConfirmModal';

const CompanySettingsRoom = ({
  room,
  index,
  name,
  currentUser,
  deleteRoomForHotel,
  updateRoomForHotel,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState(name);
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };
  const handleUpdateClick = () => {
    setIsUpdateModalOpen(true);
    // updateRoomForHotel(hotelId, id, roomName);
  };

  return !room || !room[index] ? (
    <div>Loading</div>
  ) : (
    <div className="room">
      <input
        placeholder="room name"
        name="roomName"
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />
      <i className="far fa-edit" onClick={handleUpdateClick} />
      <i className="fas fa-trash-alt" onClick={handleDeleteClick} />
      {
        <React.Fragment>
          <Confirm
            isOpen={isDeleteModalOpen}
            question={`Are you sure you want to delete room ${name}?`}
            closeModal={() => setIsDeleteModalOpen(false)}
            yesCallBack={() => deleteRoomForHotel(room, currentUser.hotel_id)}
          />
          <Confirm
            isOpen={isUpdateModalOpen}
            question={`Are you sure you want to update room ${name} to ${inputValue}?`}
            closeModal={() => setIsUpdateModalOpen(false)}
            yesCallBack={() =>
              updateRoomForHotel(room, currentUser.hotel_id, inputValue)
            }
          />
        </React.Fragment>
      }
    </div>
  );
};

export default CompanySettingsRoom;
