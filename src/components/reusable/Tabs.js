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
   margin-top:10px;
   margin:10px;
   padding:10px;
   position: relative;
   width: 100%;
   margin: 1em 0 2em;
   font-weight: 300;
  }
  .selected {
    background: #0CD4AF;

  }
`;

export default Tabs;
