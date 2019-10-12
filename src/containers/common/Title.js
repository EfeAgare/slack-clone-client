import { Header } from 'semantic-ui-react';
import React from 'react';

 export const Title = ({ title }) => {
  return (
    <Header
      as="h2"
      style={{
        textAlign: 'center',
        marginTop: '40px',
        paddingBottom: '20px'
      }}
    >
      {title}
    </Header>
  );
};

