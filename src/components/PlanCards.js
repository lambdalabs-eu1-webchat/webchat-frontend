import React from 'react';
import styled from 'styled-components';

import PlanCard from '../components/PlanCard';
import { freePlan, plusPlan, proPlan } from '../utils/plans';

const PlanCardWrapper = styled.div`
  display: flex;
`;

const PlanCards = ({ hotel }) => {
  return (
    <PlanCardWrapper>
      <PlanCard
        plan={freePlan}
        current={hotel.plan === 'free' ? 'current' : false}
      />
      <PlanCard
        plan={plusPlan}
        current={hotel.plan === 'plus' ? 'current' : false}
      />
      <PlanCard
        plan={proPlan}
        current={hotel.plan === 'pro' ? 'current' : false}
      />
    </PlanCardWrapper>
  );
};

export default PlanCards;
