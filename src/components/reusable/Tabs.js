import React from 'react';
import styled from 'styled-components';
import theme from '../../theme/styledTheme'

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
   padding:1.5rem;
   position: relative;
   width: 100%;
   font-weight: 700;
   color: ${theme.color.accentPurple}
   text-transform: uppercase;
  }
  .selected {
    background: ${theme.color.white};

  }
`;

export default Tabs;
