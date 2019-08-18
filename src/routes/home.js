import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const HomeQuery = gql`
  {
    allUsers {
      id
      username
      email
    }
  }
`;

const Home = ({ data: { loading, allUsers } }) =>
  loading
    ? null
    : allUsers.map(({ id, username, email }) => (
        <div key={id}>
          <p>{username}</p>
          <p>{email}</p>
        </div>
      ));

export default graphql(HomeQuery)(Home);
