import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
  createCustomer = async () => {
    const { token } = await this.props.stripe.createToken();
    this.props.fireCreateNewCustomer(token);
  };

  render() {
    return (
      <div>
        <input 
        name='billingEmail'
        type='text'
        placeholder='billing email'
        value={this.props.billingEmail}
        onChange={event => this.props.handleInputChange(event)}
        />
        <CardElement />
        <button onClick={() => this.createCustomer()}>Add payment method</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
