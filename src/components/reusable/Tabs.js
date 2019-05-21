import React from 'react';
import styled from 'styled-components';
import theme from '../../theme/styledTheme';

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
  display: flex;
  justify-content: center;
  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    padding-top: 30px;
  }
  .tab {
    text-decoration: none;
    color: ${theme.color.accentPurple};
    text-transform: uppercase;
    padding: 1rem 0;
    width: 15rem;
    font-weight: bold;
    text-align: center;
    border-radius: 5px 5px 0 0;
    background: ${theme.color.lightPurple};
    font-size: ${theme.fontSize.xxs};
    margin: 0 5px;
    &.selected {
      color: ${theme.color.accentPurple};
      border-bottom: 2px solid ${theme.color.accentGreen};
      font-weight: bold;
    }
    &:hover {
      cursor: pointer;
    }
    @media (max-width: 600px) {
      width: 100%;
      background: ${theme.color.lightPurple};
      margin: 0;
      margin-bottom: 1rem;
      &.selected {
        border-bottom: 2px solid ${theme.color.accentGreen};
      }
    }
  }
`;

export default Tabs;
