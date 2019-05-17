import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';

import PlanCard from '../components/PlanCard';
import { freePlan, plusPlan, proPlan } from '../utils/plans';

const PlanCardWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2rem;
  @media (max-width: 1000px) {
    flex-direction: column;
    width: 90%;
  }
`;

const PlanCards = ({ hotel, fireSwitchCustomerPlan }) => {
  return (
    <PlanCardWrapper>
      <PlanCard
        plan={freePlan}
        current={hotel.plan === 'free' ? true : false}
        fireSwitchCustomerPlan={fireSwitchCustomerPlan}
      />
      <PlanCard
        plan={plusPlan}
        current={hotel.plan === 'plus' ? true : false}
        fireSwitchCustomerPlan={fireSwitchCustomerPlan}
      />
      <PlanCard
        plan={proPlan}
        current={hotel.plan === 'pro' ? true : false}
        fireSwitchCustomerPlan={fireSwitchCustomerPlan}
      />
    </PlanCardWrapper>
  );
};

PlanCards.propTypes = {
  hotel: PT.object.isRequired,
  fireSwitchCustomerPlan: PT.func.isRequired,
};

export default PlanCards;
