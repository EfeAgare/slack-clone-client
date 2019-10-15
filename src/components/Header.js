import React from 'react';
import { Header, Segment, Button } from 'semantic-ui-react';
import slackHeader from '../Images/slack.svg';
import { Link } from 'react-router-dom';
import { currentUser } from '../utils/authenticate';
const HeaderTitle = () => {
  return (
    <Segment clearing>
      <Header as="h2" floated="right"> {currentUser() ?  
      <Link to={`/view-workspace`}>
      <Button
              positive
              style={{ backgroundColor: '#611f69', color: '#fff' }}
            >
              View WorkSpace
            </Button> </Link> : <Button.Group>
          <Link to={`/login`}>
            <Button style={{  color: '#611f69' }}>Login</Button>
          </Link>
          <Button.Or />
          <Link to={`/register`}>
            <Button
              positive
              style={{ backgroundColor: '#611f69', color: '#fff' }}
            >
              Get Started
            </Button>
          </Link>
        </Button.Group> }
      </Header>
      <Header as="h2" floated="left">
        <Link to={`/`}>
          <div
            style={{
              display: 'flex',
              height: '40px'
            }}
          >
            <img src={slackHeader} alt="logo" />
          </div>
        </Link>
      </Header>
    </Segment>
  );
};

export default HeaderTitle;
