import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { fetchSingleHotel, updateHotel } from '../store/actions/hotel';

import SuperAdminNav from '../components/SuperAdminNav';

class CompanySettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.props = props;
    const { state, dispatchFetchSingleHotel } = this.props;
    dispatchFetchSingleHotel(state.currentUser.hotel_id);
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
              <input name="name" placeholder={state.hotel.name}  />
              <label>Company Motto</label>
              <input name="motto" placeholder={state.hotel.motto} />

            </form>
          </section>

          <div className="action-buttons">
            <button>Cancel</button>
            <button>Save</button>
          </div>
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
