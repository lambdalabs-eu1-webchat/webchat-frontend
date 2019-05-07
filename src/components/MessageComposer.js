import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class MessageComposer extends React.Component {
  render() {
    return (
      <StyledMessageComposer>
        <Input className='flex' />
        <Button>Send</Button>
      </StyledMessageComposer>
    );
  }
}

const StyledMessageComposer = styled.div`
  display: flex;
  width: 100%;
  justify-content: stretch;
  .flex {
    flex: 1;
  }
`;

export default MessageComposer;
