import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import PT from 'prop-types';
import styled from 'styled-components';
import { validate } from 'email-validator';

import theme from '../theme/styledTheme';
import { messages } from '../utils/messages';
import Spinner from '../components/reusable/Spinner';

class PlanCheckoutForm extends Component {
  state = {
    flashMessage: messages.allRequiredFields
  };

  setFlashMessage = flashMessage => {
    this.setState({
      flashMessage
    });
  };

  createCustomer = async () => {
    if (validate(this.props.billingEmail)) {
      const { token } = await this.props.stripe.createToken();
      this.props.fireCreateNewCustomer(token);
    } else {
      this.setFlashMessage(messages.validEmail);
    }
  };

  editPaymentMethod = async () => {
    if (validate(this.props.billingEmail)) {
      const { token } = await this.props.stripe.createToken();
      this.props.fireUpdateCustomerMethod(token);
    } else {
      this.setFlashMessage(messages.validEmail);
    }
  };

  render() {
    return (
      <FormWrapper>
        <StyledInput
          name="billingEmail"
          type="text"
          placeholder="Billing Email*"
          value={this.props.billingEmail}
          onChange={event => this.props.handleInputChange(event)}
        />
        <CardElement hidePostalCode={true} {...createOptions()} />
        <StyledBtn
          onClick={
            this.props.mode === 'edit'
              ? () => this.editPaymentMethod()
              : () => this.createCustomer()
          }
        >
          {this.props.loading.createCustomer ||
          this.props.loading.updateCustomerMethod ? (
            <Spinner />
          ) : (
            this.props.buttonText
          )}
        </StyledBtn>
        <p>*{this.state.flashMessage}</p>
      </FormWrapper>
    );
  }
}

PlanCheckoutForm.defaultProps = {
  billingEmail: ''
};

PlanCheckoutForm.propTypes = {
  stripe: PT.shape({
    createToken: PT.func.isRequired
  }).isRequired,
  fireCreateNewCustomer: PT.func.isRequired,
  fireUpdateCustomerMethod: PT.func.isRequired,
  billingEmail: PT.string.isRequired,
  handleInputChange: PT.func.isRequired,
  buttonText: PT.string.isRequired
};

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: theme.fontSize.xxs,
        fontFamily: theme.font.fontFamily
      },
      invalid: {
        color: '#9e2146'
      },
      empty: {
        color: '#333'
      }
    }
  };
};

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 3rem 0;
  overflow: hidden;
  
  p {
    font-size: ${theme.fontSize.xs};
  }
`;

const StyledBtn = styled.button`
  width: 100%;
  height: ${theme.button.smallButton};
  font-size: ${theme.fontSize.xxs};
  border-radius: ${theme.border.radius};
  background: ${theme.color.accentGreen};
  border: none;
  text-transform: ${theme.textTransform.uppercase};
  color: ${theme.color.white};
  font-weight: ${theme.fontWeight.bold};
  margin: 2.5rem 0 1.5rem 0;
  box-shadow: ${theme.shadow.buttonShadow};
  &:hover {
    box-shadow: ${theme.shadow.buttonHover};
    cursor: pointer;
    transition: all 0.3s ease;
  }
  &:focus {
    outline: none;
  }
`;

const StyledInput = styled.input`
  border: none;
  margin: 2rem 0;
  width: 100%;
  border-radius: 5px;
  padding: 1rem;
  font-size: ${theme.fontSize.xs};
`;

export default injectStripe(PlanCheckoutForm);
