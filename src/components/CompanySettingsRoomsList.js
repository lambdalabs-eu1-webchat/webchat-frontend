import React from 'react';
import styled from 'styled-components';
import CompanySettingsRoom from './CompanySettingsRoom';
import theme from './../theme/styledTheme';

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
  } = props;
  return (
    <CompanySettingsRoomsListWrapper>
      <h3>To add multiple rooms, separate each room name with a comma</h3>
      <AddRooms>
        <input
          placeholder="Add rooms..."
          name="newRooms"
          value={newRooms}
          onChange={handleInputChange}
        />
        <button type="submit" onClick={addRooms}>
          ADD ROOMS
        </button>
      </AddRooms>
      <section className="rooms-list">
        {rooms &&
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
    width:100%;
  }
  
  h3 {
    font-size: ${theme.fontSize.xs};
    color: ${theme.color.accentPurple};
    padding: 1.5rem 0;
  }
      
  .rooms-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 0;
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
  align-items: baseline;
  @media (max-width: 600px) {
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
    width: 100%;
    &:focus {
      outline: none;
    }
  }
  
  button {
    width: 15rem;
    height: ${theme.button.smallButton};
    font-size: ${theme.fontSize.xxs};
    border-radius: ${theme.border.radius};
    background:${theme.color.accentGreen};
    border: none;
    text-transform: ${theme.textTransform.uppercase};
    color: ${theme.color.white};
    font-weight: ${theme.fontWeight.bold};
    margin: 15px 0;
    box-shadow: ${theme.shadow.buttonShadow};
    &:hover {
      box-shadow: ${theme.shadow.buttonHover};
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
    @media (max-width: 800px) {
      height: ${theme.button.height};
      font-size: ${theme.fontSize.xs};
    }
    @media (max-width: 600px) {
      width: 100%;
      margin: 0 0 2rem;
    }
  }
`;
