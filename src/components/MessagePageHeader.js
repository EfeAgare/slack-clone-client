import styled from 'styled-components';
import React from 'react';
import { Header } from 'semantic-ui-react';

import { headerStyle } from '../styles/modalStyles';

const HeaderWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
`;

const MessagePageHeader = ({ channelName, name }) => {
  if (channelName) {
    return (
      <HeaderWrapper>
        <Header dividing style={headerStyle}>
          # {channelName}
        </Header>
      </HeaderWrapper>
    );
  } else {
    return (
      <HeaderWrapper>
        <Header dividing style={headerStyle}>
          {' '}
          {name}
        </Header>
      </HeaderWrapper>
    );
  }
};

export default MessagePageHeader;
