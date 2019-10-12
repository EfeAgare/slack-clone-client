import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import HeaderTitle from '../components/Header';

const HomeQuery = gql`
  {
    allUsers {
      id
      username
      email
    }
  }
`;

const Home = () => {
  return (
    <>
      <HeaderTitle />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 4, padding: '40px' }}>
          <h1 style={{ marginTop: '40px', fontSize: '3rem' }}>
            Slack is where work happens
          </h1>
          <p>
            Slack is a collaboration hub, where the right people and the right
            information come together, helping everyone get work done.
          </p>

          <Link to={`/register`}>
            <Button style={{ backgroundColor: '#611f69', color: '#fff' }}>
              Get Started
            </Button>
          </Link>
        </div>
        <div style={{ flex: 1, width: '70%' }}>
          {' '}
          <img
            src="https://a.slack-edge.com/80588/marketing/img/features/desktop/devices.png"
            alt="logo"
          />
        </div>
      </div>
    </>
  );
};

export default graphql(HomeQuery)(Home);
