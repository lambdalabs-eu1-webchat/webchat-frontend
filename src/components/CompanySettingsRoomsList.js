import React from 'react';
import styled from 'styled-components';
import CompanySettingsRoom from './CompanySettingsRoom';

const AddRooms = styled.section`
  display: flex;
  align-items: center;
  margin: 0 auto;
  @media (max-width: 500px) {
    margin: 0 auto;
    max-width: 100%;
    padding-left: 35px;
  }
`;

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
    <div className="company-rooms-list">
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
    </div>
  );
};

export default CompanySettingsRoomsList;
