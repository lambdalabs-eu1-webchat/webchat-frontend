import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';

class CheckoutForm extends Component {
  // need to move this submit function up the chain once component structure/layout becomes clearer
  subscribe = async () => {
    const { token } = await this.props.stripe.createToken();
    // need to move this path to a const/util folder
    // plan should be dynamic here
    await axios.post(
      'http://localhost:7000/api/subscription/5ccfe730a3c45a0394b71a1f',
      {
        ...token,
        // plan will be available as consts/utils linked to pro or plus
        plan: 'plan_EzdACF4lzado30',
        // this is a new email for billing purposes
        email: 'victoriafalls@gmail.com',
      },
    );
  };

  changePaidPlan = async () => {
    await axios.put(
      'http://localhost:7000/api/subscription/5ccfe730a3c45a0394b719fc',
      {
        newPlan: 'plan_Ezd8eGcARtKvjs',
      },
    );
  };

  changeToFree = async () => {
    await axios.put(
      'http://localhost:7000/api/subscription/5ccfe730a3c45a0394b719fc',
      {
        newPlan: 'plan_F16WlQMwT3HKCi',
      },
    );
  };

  updatePaymentMethod = async () => {
    const { token } = await this.props.stripe.createToken();
    await axios.put(
      'http://localhost:7000/api/subscription/method/5ccfe730a3c45a0394b719fc',
      {
        ...token,
        email: 'newhoteloneemail@gmail.com',
      },
    );
  };

  render() {
    return (
      <div>
        <CardElement />
        <button onClick={this.subscribe}>Subscribe Test</button>
        <button onClick={this.changePaidPlan}>Change Plan Test</button>
        <button onClick={this.changeToFree}>Change To Free Plan Test</button>
        <button onClick={this.updatePaymentMethod}>
          Change Payment Method
        </button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
