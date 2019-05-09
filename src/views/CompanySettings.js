import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { fetchSingleHotel, updateHotel } from '../store/actions/hotel';

import SuperAdminNav from '../components/SuperAdminNav';
import CompanySettingsRoomsList from "../components/CompanySettingsRoomsList";
import {deleteRoomForHotel, updateRoomForHotel, fetchRoomsForHotel} from "../store/actions/rooms";


class CompanySettings extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;
    const { hotel, rooms, currentUser, dispatchFetchSingleHotel, dispatchFetchRoomsForHotel } = this.props;
    this.state = {
      companyName: hotel.name,
      companyMotto: hotel.motto,
    };
    dispatchFetchSingleHotel(currentUser.hotel_id);
    dispatchFetchRoomsForHotel(currentUser.hotel_id);
  }

  handleInputChange = (event) => {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit(hotelId, dispatchUpdateHotel) {

    return (event) => {
      console.log(event);
      event.preventDefault();
      const { companyName, companyMotto } = this.state;
      if (!companyMotto || !companyName) {
        return;
      }
      dispatchUpdateHotel(hotelId, companyName, companyMotto);
      document.querySelectorAll('.form-input').forEach(input => input.value = '');
    };
  }

  handleClear() {
    return(event) => {
      event.preventDefault();
      document.querySelectorAll('.form-input').forEach(input => input.value = '');
    };
  }

  render() {
    const { hotel, rooms, dispatchUpdateHotel, dispatchDeleteRoomForHotel, currentUser, dispatchUpdateRoomForHotel } = this.props;

    return (
        <div className="company-settings" >
          <SuperAdminNav/>
          <div>
            <h2>Company Settings</h2>
            <section className="company-details">
              <h3>Update company details</h3>
              <form>
                <label>Name</label>
                <input name="companyName" className="form-input" placeholder={hotel.name} onChange={this.handleInputChange.bind(this)}  />
                <label>Company Motto</label>
                <input name="companyMotto" className="form-input" placeholder={hotel.motto} onChange={this.handleInputChange.bind(this)} />
                <div className="action-buttons">
                  <button onClick={this.handleClear().bind(this)}>Clear</button>
                  <button onClick={this.handleSubmit(hotel._id, dispatchUpdateHotel).bind(this)}>Save</button>
                </div>
              </form>
            </section>
            <CompanySettingsRoomsList rooms={rooms} currentUser={currentUser} deleteRoomForHotel={dispatchDeleteRoomForHotel} updateRoomForHotel={dispatchUpdateRoomForHotel} handleInputChange={this.handleInputChange} />
          </div>
        </div>
    );
  };
}

CompanySettings.propTypes = {
  hotel: PropTypes.object.isRequired,
  rooms: PropTypes.array.isRequired,
  dispatchFetchSingleHotel: PropTypes.func.isRequired,
  dispatchUpdateHotel: PropTypes.func.isRequired,
  dispatchDeleteRoomForHotel: PropTypes.func.isRequired,
  dispatchUpdateRoomForHotel: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  hotel: state.hotel,
  currentUser: state.currentUser,
  rooms: state.rooms,
});

export default connect(mapStateToProps, {
  dispatchFetchSingleHotel: fetchSingleHotel,
  dispatchUpdateHotel: updateHotel,
  dispatchFetchRoomsForHotel: fetchRoomsForHotel,
  dispatchDeleteRoomForHotel: deleteRoomForHotel,
  dispatchUpdateRoomForHotel: updateRoomForHotel,
})(CompanySettings);
