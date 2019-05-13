import React from 'react';
import styled from 'styled-components';

function Tabs({ options, selected, setSelected }) {
  console.log(options);
  return (
    <StyledTabs>
      {options.map(option => (
        <span
          className={option === selected ? 'selected tab' : 'tab'}
          onClick={() => setSelected(option)}
        >
          {option}
        </span>
      ))}
    </StyledTabs>
  );
}

const StyledTabs = styled.div`
  .tab {
    border: 1px solid black;
  }
  .selected {
    background: salmon;
  }
`;

export default Tabs;
