import React from 'react';
import styled from 'styled-components';

import CompanySettingsRoom from './CompanySettingsRoom';
import theme from './../theme/styledTheme';
import Spinner from '../components/reusable/Spinner';

const CompanySettingsRoomsList = props => {
  const {
    rooms,
    newRooms,
    deleteRoomForHotel,
    updateRoomForHotel,
    currentUser,
    handleInputChange,
    handleRoomInputChange,
    addRooms,
    loading,
    fileRead,
  } = props;
  return (
    <CompanySettingsRoomsListWrapper>
      <h3>
        Add rooms with a CSV, or type out your hotel's room names, separating
        each with a comma
      </h3>
      <div className="file-upload">
        <label>
          <input
            id="upload"
            name="roomsUpload"
            type="file"
            accept=".csv"
            onChange={fileRead}
          />
        </label>
      </div>
      <AddRooms>
        <input
          placeholder="Add rooms..."
          name="newRooms"
          value={newRooms}
          onChange={handleInputChange}
        />
        <button type="submit" onClick={addRooms} disabled={loading.updateRoom}>
          {loading.createRoom ? <Spinner /> : 'Add Rooms'}
        </button>
      </AddRooms>
      <section className="rooms-list">
        {rooms &&
          rooms.map &&
          rooms.map((room, idx) => (
            <CompanySettingsRoom
              key={room._id || 'new'}
              index={idx}
              name={room.name}
              room={room._id}
              rooms={rooms}
              hotelId={currentUser.hotel_id}
              currentUser={currentUser}
              updateRoomForHotel={updateRoomForHotel}
              deleteRoomForHotel={deleteRoomForHotel}
              handleRoomInputChange={handleRoomInputChange}
              loading={loading}
            />
          ))}
      </section>
    </CompanySettingsRoomsListWrapper>
  );
};

export default CompanySettingsRoomsList;

const CompanySettingsRoomsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  @media (max-width: 800px) {
    width: 100%;
  }

  h3 {
    font-size: ${theme.fontSize.xs};
    color: ${theme.color.accentPurple};
    padding: 1.5rem 0;
  }

  .file-upload {
    align-items: center;
    #upload {
      margin-bottom: 5px;
      display: flex;
      align-self: center;
      border: none;
      width: 100%;
    }
  }

  .rooms-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 20px;
    height: 300px;
    overflow-y: scroll;
  }

  input {
    border: none;
    border-bottom: 1px solid ${theme.color.footerText};
    margin: 0 2rem 2rem 0;
    height: ${theme.input.height};
    font-size: ${theme.fontSize.xs};
    padding: 20px 0;
    border-radius: 0;
    width: 80%;
    &:focus {
      outline: none;
    }
  }
`;

const AddRooms = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  @media (max-width: 800px) {
    max-width: 100%;
    flex-direction: column;
  }

  input {
    border: none;
    border-bottom: 1px solid ${theme.color.footerText};
    margin: 0 2rem 2rem 0;
    height: ${theme.input.height};
    font-size: ${theme.fontSize.xs};
    padding: 20px 0;
    border-radius: 0;
    width: 70%;
    &:focus {
      outline: none;
    }
    @media (max-width: 800px) {
      width: 100%;
    }
  }

  button {
    width: 15rem;
    height: ${theme.button.smallButton};
    font-size: ${theme.fontSize.xxs};
    border-radius: ${theme.border.radius};
    background: ${theme.color.accentGreen};
    border: none;
    text-transform: ${theme.textTransform.uppercase};
    color: ${theme.color.white};
    font-weight: ${theme.fontWeight.bold};
    margin: 15px 0;
    box-shadow: ${theme.shadow.buttonShadow};
    &:hover {
      box-shadow: ${theme.shadow.buttonHover};
      cursor: pointer;
      transition: all 0.3s ease;
    }
    &:focus {
      outline: none;
    }
    @media (max-width: 800px) {
      height: ${theme.button.height};
      font-size: ${theme.fontSize.xs};
      width: 100%;
      margin: 0 0 2rem;
    }
  }
`;
