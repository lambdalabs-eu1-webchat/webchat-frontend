import React from 'react';
import styled from 'styled-components';

function Tabs({ options, selected, setSelected }) {
  return (
    <StyledTabs>
      {options.map(option => (
        <span
          className={option === selected ? 'selected tab' : 'tab'}
          onClick={() => setSelected(option)}
          key={options.indexOf(option)}
        >
          {option}
        </span>
      ))}
    </StyledTabs>
  );
}

const StyledTabs = styled.div`
  .tab {
   margin:2rem;
   padding:1rem;
   position: relative;
   width: 100%;
   font-weight: 300;
  }
  .selected {
    background: #0CD4AF;

  }
`;

export default Tabs;
