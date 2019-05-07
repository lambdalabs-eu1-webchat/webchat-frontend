import React from 'react';
import { connect } from 'react-redux';
import PlanCard from '../components/PlanCard';
import { freePlan, plusPlan, proPlan } from '../utils/plans';
import styled from 'styled-components';

const PlanCardWrapper = styled.div`
  display: flex;
`;

class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div>
        <h2>Billing</h2>
        <PlanCardWrapper>
          <PlanCard plan={freePlan} />
          <PlanCard plan={plusPlan} />
          <PlanCard plan={proPlan} />
        </PlanCardWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(Billing);
