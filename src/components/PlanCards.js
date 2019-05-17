import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';

import PlanCard from '../components/PlanCard';
import { freePlan, plusPlan, proPlan } from '../utils/plans';

const PlanCards = ({ hotel, fireSwitchCustomerPlan, loading }) => {
  return (
    <PlanCardWrapper>
      <PlanCard
        plan={freePlan}
        current={hotel.plan === 'free' ? true : false}
        fireSwitchCustomerPlan={fireSwitchCustomerPlan}
        loading={loading}
      />
      <PlanCard
        plan={plusPlan}
        current={hotel.plan === 'plus' ? true : false}
        fireSwitchCustomerPlan={fireSwitchCustomerPlan}
        loading={loading}
      />
      <PlanCard
        plan={proPlan}
        current={hotel.plan === 'pro' ? true : false}
        fireSwitchCustomerPlan={fireSwitchCustomerPlan}
        loading={loading}
      />
    </PlanCardWrapper>
  );
};

PlanCards.propTypes = {
  hotel: PT.object.isRequired,
  fireSwitchCustomerPlan: PT.func.isRequired,
};

export default PlanCards;

const PlanCardWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 6.5rem;
  margin: 2rem;
  @media (max-width: 1400px) {
    padding-top: 0;
  }
  @media (max-width: 1000px) {
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    padding-top: 0;
  }
    @media (max-width: 600px) {
    width: 100%;
    margin: 0;
  }
`;
