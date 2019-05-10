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

import SuperAdminNav from '../components/SuperAdminNav';
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
      companyName: hotel.name,
      companyMotto: hotel.motto,
    };
    dispatchFetchSingleHotel(currentUser.hotel_id);
    dispatchFetchRoomsForHotel(currentUser.hotel_id);
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit(hotelId, dispatchUpdateHotel) {
    return event => {
      event.preventDefault();
      const { companyName, companyMotto } = this.state;
      if (!companyMotto || !companyName) {
        return;
      }
      dispatchUpdateHotel(hotelId, companyName, companyMotto);
      document
        .querySelectorAll('.form-input')
        .forEach(input => (input.value = ''));
    };
  }

  handleClear() {
    return event => {
      event.preventDefault();
      // you shouldn't need this in react
      document
        .querySelectorAll('.form-input')
        .forEach(input => (input.value = ''));
    };
  }

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
      <div className='company-settings'>
        <h2>Company Settings</h2>
        <CompanySettingsWrapper>
          <section className='company-details'>
            <h3>Update company details</h3>
            <form>
              <label>Name</label>
              <input
                name='companyName'
                className='form-input'
                placeholder={hotel.name}
                onChange={this.handleInputChange.bind(this)}
              />
              <label>Company Motto</label>
              <input
                name='companyMotto'
                className='form-input'
                placeholder={hotel.motto}
                onChange={this.handleInputChange.bind(this)}
              />
              <div className='action-buttons'>
                <button onClick={this.handleClear().bind(this)}>Clear</button>
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
            handleInputChange={this.handleInputChange.bind(this)}
            createRoomForHotel={dispatchCreateRoomForHotel}
            currentUser={currentUser}
            deleteRoomForHotel={dispatchDeleteRoomForHotel}
            updateRoomForHotel={dispatchUpdateRoomForHotel}
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
  dispatchDeleteRoomForHotel: PropTypes.func.isRequired,
  dispatchUpdateRoomForHotel: PropTypes.func.isRequired,
  dispatchCreateRoomForHotel: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  hotel: state.hotel,
  currentUser: state.currentUser,
  rooms: state.rooms,
});

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
