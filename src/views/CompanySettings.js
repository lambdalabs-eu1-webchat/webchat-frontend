import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import theme from './../theme/styledTheme';
import { fetchSingleHotel, updateHotel } from '../store/actions/hotel';
import {
  deleteRoomForHotel,
  updateRoomForHotel,
  fetchRoomsForHotel,
  createRoomForHotel,
} from '../store/actions/rooms';
import CompanySettingsRoomsList from '../components/CompanySettingsRoomsList';
import Spinner from '../components/reusable/Spinner';

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
      rooms: hotel.rooms,
      newRooms: '',
      infoModal:false,
    };
    dispatchFetchSingleHotel(currentUser.hotel_id);
    dispatchFetchRoomsForHotel(currentUser.hotel_id);
  }

  componentDidUpdate() {
    if (this.state.currentHotel !== this.props.hotel) {
      this.setState({
        currentHotel: this.props.hotel,
        companyName: this.props.hotel.name,
      });
    }
    if (this.state.rooms !== this.props.rooms) {
      this.setState({ rooms: this.props.rooms });
    }
    if(this.props.room.length === 0 && !this.state.infoModal){
      this.setState({
        infoModal:true
      })
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
      const { companyName } = this.state;
      if (!companyName) {
        return;
      }
      dispatchUpdateHotel(hotelId, companyName);
    };
  }

  handleRevert() {
    return event => {
      event.preventDefault();
      this.setState({
        companyName: this.props.hotel.name,
      });
    };
  }

  clearNewRooms = () => {
    this.setState({
      newRooms: '',
    });
  };

  fileRead = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = event => {
        const rooms = event.target.result;
        // replace return carriages with a comma and a space
        // spacing is used for cleaner display on the Add Rooms input
        const newRooms = rooms.replace(/\n/g, ', ');
        this.setState({
          newRooms,
        });
      };
      reader.readAsText(file);
    }
  };

  addRooms = () => {
    const rooms = this.state.newRooms;
    if (!rooms.length) {
      return alert('Please add at least one room name');
    } else {
      // split the string into an array of room names on the comma separator
      // trim whitespace at the start and end of each string
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
      <CompanySettingsOuterWrapper>
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
              <div className="action-buttons">
                <button className="cancel" onClick={this.handleRevert().bind(this)}>Cancel</button>
                <button
                  onClick={this.handleSubmit(
                    hotel._id,
                    dispatchUpdateHotel,
                  ).bind(this)}
                >
                  {this.props.loading.updateHotel ? <Spinner /> : 'Save'}
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
            loading={this.props.loading}
            fileRead={this.fileRead}
          />
        </CompanySettingsWrapper>
      </CompanySettingsOuterWrapper>
    );
  }
}

CompanySettings.propTypes = {
  hotel: PropTypes.object.isRequired,
  rooms: PropTypes.array.isRequired,
  loading: PropTypes.object.isRequired,
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
    loading: state.loading,
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

const CompanySettingsOuterWrapper = styled.div`
  margin: 0 3rem;
  min-height: 730px;
  @media (max-width: 800px) {
    margin: 0 auto;
  }
  h2 {
    font-size: ${theme.fontSize.l};
    padding: 1.5rem 0;
  }
`;

const CompanySettingsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 5rem 0;
  @media (max-width: 800px) {
    flex-direction: column;
    max-width: 100%;
  }

  .company-details {
    width: 30%;
    @media (max-width: 800px) {
      width: 100%;
    }

    h3 {
      font-size: ${theme.fontSize.xs};
      color: ${theme.color.accentPurple};
      padding: 1.5rem 0;
    }

    form {
      display: flex;
      flex-direction: column;

      input {
        border: none;
        border-bottom: 1px solid ${theme.color.footerText};
        margin-bottom: 20px;
        height: ${theme.input.height};
        font-size: ${theme.fontSize.xs};
        padding: 20px 0;
        border-radius: 0;
        &:focus {
          outline: none;
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
        &:first-child {
          margin-right: 1.5rem;
        }
        @media (max-width: 1200px) {
          width: 100%;
          height: ${theme.button.smallButton};
          margin: 0 0 1.5rem 0;
          &:first-child {
            margin-right: 0;
          }
        }
        @media (max-width: 800px) {
          height: ${theme.button.height};
          font-size: ${theme.fontSize.xs};
        }
      }
      
      .cancel {
        background: ${theme.color.accentPurple};
      }
    }
  }
`;
