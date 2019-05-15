import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchSingleHotel, updateHotel } from '../store/actions/hotel';
import {
  deleteRoomForHotel,
  updateRoomForHotel,
  fetchRoomsForHotel,
  createRoomForHotel,
} from '../store/actions/rooms';

import CompanySettingsRoomsList from '../components/CompanySettingsRoomsList';

const CompanySettingsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 800px;
  margin: 0 auto 100px;
  @media (max-width: 500px) {
    flex-direction: column;
    max-width: 100%;
  }
`;

class CompanySettings extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;

    const {
      hotel,
      currentUser,
      dispatchFetchSingleHotel,
      dispatchFetchRoomsForHotel,
    } = this.props;
    this.state = {
      currentHotel: {},
      companyName: hotel.name,
      companyMotto: hotel.motto,
      rooms: hotel.rooms,
      newRooms: '',
    };
    dispatchFetchSingleHotel(currentUser.hotel_id);
    dispatchFetchRoomsForHotel(currentUser.hotel_id);
  }

  componentDidUpdate() {
    if (this.state.currentHotel !== this.props.hotel) {
      this.setState({
        currentHotel: this.props.hotel,
        companyName: this.props.hotel.name,
        companyMotto: this.props.hotel.motto,
      });
    }
    if (this.state.rooms !== this.props.rooms) {
      this.setState({ rooms: this.props.rooms });
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleRoomInputChange = (event, index) => {
    const newRoomName = event.target.value;
    this.setState(cState => ({
      rooms: [...cState.rooms, (cState.rooms[index].name = newRoomName)],
    }));
  };

  handleSubmit(hotelId, dispatchUpdateHotel) {
    return event => {
      event.preventDefault();
      const { companyName, companyMotto } = this.state;
      if (!companyMotto || !companyName) {
        return;
      }
      dispatchUpdateHotel(hotelId, companyName, companyMotto);
    };
  }

  handleRevert() {
    return event => {
      event.preventDefault();
      this.setState({
        companyName: this.props.hotel.name,
        companyMotto: this.props.hotel.motto,
      });
    };
  }

  clearNewRooms = () => {
    this.setState({
      newRooms: '',
    });
  };

  addRooms = () => {
    const rooms = this.state.newRooms;
    if (!rooms.length) {
      return alert('Please add at least one room name');
    } else {
      // split the string into an array of room names on the comma separator
      // trim all whitespace at the start and end of each string
      // create a new array of objects with each room name set to the name key
      const roomsToAdd = rooms.split(',').map(room => ({ name: room.trim() }));
      this.props.dispatchCreateRoomForHotel(roomsToAdd, this.props.hotel._id);
      this.clearNewRooms();
    }
  };

  render() {
    const {
      hotel,
      rooms,
      dispatchUpdateHotel,
      dispatchDeleteRoomForHotel,
      dispatchCreateRoomForHotel,
      currentUser,
      dispatchUpdateRoomForHotel,
    } = this.props;

    return (
      <div className="company-settings">
        <h2>Company Settings</h2>
        <CompanySettingsWrapper>
          <section className="company-details">
            <h3>Update company details</h3>
            <form>
              <input
                name="companyName"
                className="form-input"
                value={this.state.companyName}
                placeholder="hotel motto"
                onChange={this.handleInputChange.bind(this)}
              />
              <input
                name="companyMotto"
                className="form-input"
                value={this.state.companyMotto}
                placeholder="hotel motto"
                onChange={this.handleInputChange.bind(this)}
              />
              <div className="action-buttons">
                <button onClick={this.handleRevert().bind(this)}>Revert</button>
                <button
                  onClick={this.handleSubmit(
                    hotel._id,
                    dispatchUpdateHotel,
                  ).bind(this)}
                >
                  Save
                </button>
              </div>
            </form>
          </section>
          <CompanySettingsRoomsList
            rooms={rooms}
            hotelId={hotel.id}
            currentUser={currentUser}
            newRooms={this.state.newRooms}
            handleInputChange={this.handleInputChange.bind(this)}
            handleRoomInputChange={this.handleRoomInputChange.bind(this)}
            createRoomForHotel={dispatchCreateRoomForHotel}
            deleteRoomForHotel={dispatchDeleteRoomForHotel}
            updateRoomForHotel={dispatchUpdateRoomForHotel}
            addRooms={this.addRooms}
          />
        </CompanySettingsWrapper>
      </div>
    );
  }
}

CompanySettings.propTypes = {
  hotel: PropTypes.object.isRequired,
  rooms: PropTypes.array.isRequired,
  dispatchFetchSingleHotel: PropTypes.func.isRequired,
  dispatchUpdateHotel: PropTypes.func.isRequired,
  dispatchFetchRoomsForHotel: PropTypes.func.isRequired,
  dispatchDeleteRoomForHotel: PropTypes.func.isRequired,
  dispatchUpdateRoomForHotel: PropTypes.func.isRequired,
  dispatchCreateRoomForHotel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    hotel: state.hotel,
    rooms: state.rooms.rooms,
    currentUser: state.currentUser,
  };
};

export default connect(
  mapStateToProps,
  {
    dispatchFetchSingleHotel: fetchSingleHotel,
    dispatchUpdateHotel: updateHotel,
    dispatchFetchRoomsForHotel: fetchRoomsForHotel,
    dispatchDeleteRoomForHotel: deleteRoomForHotel,
    dispatchUpdateRoomForHotel: updateRoomForHotel,
    dispatchCreateRoomForHotel: createRoomForHotel,
  },
)(CompanySettings);
