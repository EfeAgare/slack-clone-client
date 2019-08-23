import styled from 'styled-components';
import React from 'react';
import { Header } from 'semantic-ui-react';

const HeaderWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
`;

export default ({ channelName }) => (
  <HeaderWrapper>
    <Header>#  {channelName}</Header>
  </HeaderWrapper>
);
