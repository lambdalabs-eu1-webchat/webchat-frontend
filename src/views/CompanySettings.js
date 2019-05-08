import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { fetchSingleHotel, updateHotel } from '../store/actions/hotel';

import SuperAdminNav from '../components/SuperAdminNav';

class CompanySettings extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;
    const { state, dispatchFetchSingleHotel } = this.props;
    this.state = { companyName: state.hotel.name, companyMotto: state.hotel.motto };
    dispatchFetchSingleHotel(state.currentUser.hotel_id);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(hotelId, dispatchUpdateHotel) {
    return (event) => {
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
    const { state, dispatchUpdateHotel, dispatchFetchSingleHotel } = this.props;
    return (
        <div className="company-settings">
          <SuperAdminNav/>
          <h2>Company Settings</h2>
          <section className="company-details">
            <h3>Update company details</h3>
            <form>
              <label>Name</label>
              <input name="companyName" className="form-input" placeholder={state.hotel.name} onChange={this.handleInputChange.bind(this)}  />
              <label>Company Motto</label>
              <input name="companyMotto" className="form-input" placeholder={state.hotel.motto} onChange={this.handleInputChange.bind(this)} />
              <div className="action-buttons">
                <button onClick={this.handleClear().bind(this)}>Clear</button>
                <button onClick={this.handleSubmit(state.hotel._id, dispatchUpdateHotel).bind(this)}>Save</button>
              </div>
            </form>
          </section>


        </div>
    );
  };
}

CompanySettings.propTypes = {
  state: PropTypes.shape().isRequired,
  dispatchFetchSingleHotel: PropTypes.func.isRequired,
  dispatchUpdateHotel: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps, {
  dispatchFetchSingleHotel: fetchSingleHotel,
  dispatchUpdateHotel: updateHotel,
})(CompanySettings);
