import React from 'react';
import styled from 'styled-components';
import CompanySettingsRoom from "./CompanySettingsRoom";

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

const handleClick = (
    createRoomForHotel,
    id
) => event => {
  event.preventDefault();
  let roomName = '';
  event.target.parentNode.childNodes.forEach(childNode => {
    if (childNode.name === 'roomName') {
      roomName = childNode.value;
    }
  });
  let blank = false;
  if (roomName ) {
    createRoomForHotel(roomName, id);
  } else {
    blank = true;
  }

  if (blank) {
    event.target.parentNode.childNodes.forEach(childNode => {
      if (childNode.getAttribute('id') === 'add-room-message') {
        childNode.textContent = 'Please fill in all the required fields.';
      }
    });
  } else {
    event.target.parentNode.childNodes.forEach(childNode => {
      if (childNode.name === 'roomName') {
        childNode.value = '';
      }
    });
  }
};


const CompanySettingsRoomsList = (props) => {
  const { rooms, deleteRoomForHotel, updateRoomForHotel, currentUser, handleInputChange, createRoomForHotel } = props;
  return (
    <div className="company-rooms-list">
      <AddRooms>
        <input placeholder="Add rooms..." name="roomName"/>
        <button type="submit" onClick={handleClick(createRoomForHotel, currentUser.hotel_id)}>ADD ROOMS</button>
      </AddRooms>
      <section className="rooms-list">
        {rooms && rooms.map(room => (
            <CompanySettingsRoom
                key={room._id}
                name={room.name}
                room={room._id}
                hotelId={currentUser.hotel_id}
                currentUser={currentUser}
                updateRoomForHotel={updateRoomForHotel}
                deleteRoomForHotel={deleteRoomForHotel}
                handleInputChange={handleInputChange}
            />
        ))}
      </section>

    </div>
  )
};

export default CompanySettingsRoomsList;
