import React, { useState } from 'react';
import styled from 'styled-components';

import theme from './../theme/styledTheme';
import Confirm from './reusable/ConfirmModal';
import Spinner from '../components/reusable/Spinner';

const CompanySettingsRoom = ({
  room,
  name,
  currentUser,
  deleteRoomForHotel,
  updateRoomForHotel,
  loading,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState(name);
  const [isCurrent, setIsCurrent] = useState(false);
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    setIsCurrent(true);
  };
  const handleUpdateClick = () => {
    setIsUpdateModalOpen(true);
    setIsCurrent(true);
  };

  return !room ? (
    <div>Loading</div>
  ) : (
    <RoomWrapper>
      <input
        placeholder="room name"
        name="roomName"
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />
      {loading.updateRoom && isCurrent ? (
        <Spinner />
      ) : (
        <i className="far fa-edit" onClick={handleUpdateClick} disabled={loading.updateRoom} />
      )}
      {loading.deleteRoom && isCurrent ? (
        <Spinner />
      ) : (
        <i className="fas fa-trash-alt" onClick={handleDeleteClick} disabled={loading.deleteRoom}/>
      )}
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
    </RoomWrapper>
  );
};

export default CompanySettingsRoom;

const RoomWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .fa-edit {
    color: ${theme.color.accentPurple};
    font-size: ${theme.fontSize.m};
    &:hover {
      cursor: pointer;
      color: ${theme.color.accentGreen};
      transition: all 0.5s ease;
    }
  }

  .fa-trash-alt {
    color: ${theme.color.accentPurple};
    font-size: ${theme.fontSize.m};
    &:hover {
      cursor: pointer;
      color: ${theme.color.accentGreen};
      transition: all 0.5s ease;
    }
  }
`;
