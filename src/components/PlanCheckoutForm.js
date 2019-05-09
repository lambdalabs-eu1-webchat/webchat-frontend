import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import Button from '@material-ui/core/Button';
import PT from 'prop-types';

class PlanCheckoutForm extends Component {
  createCustomer = async () => {
    const { token } = await this.props.stripe.createToken();
    this.props.fireCreateNewCustomer(token);
  };

  editPaymentMethod = async () => {
    const { token } = await this.props.stripe.createToken();
    this.props.fireUpdateCustomerMethod(token);
  };

  render() {
    return (
      <div>
        <input
          name="billingEmail"
          type="text"
          placeholder="Billing Email"
          value={this.props.billingEmail}
          onChange={event => this.props.handleInputChange(event)}
        />
        <CardElement hidePostalCode={true} />
        <Button
          variant="contained"
          color="primary"
          onClick={
            this.props.mode === 'edit'
              ? () => this.editPaymentMethod()
              : () => this.createCustomer()
          }
        >
          {this.props.buttonText}
        </Button>
      </div>
    );
  }
}

PlanCheckoutForm.propTypes = {
  stripe: PT.shape({
    createToken: PT.func.isRequired,
  }).isRequired,
  fireCreateNewCustomer: PT.func.isRequired,
  billingEmail: PT.string.isRequired,
  handleInputChange: PT.func.isRequired,
  buttonText: PT.string.isRequired,
};

export default injectStripe(PlanCheckoutForm);
