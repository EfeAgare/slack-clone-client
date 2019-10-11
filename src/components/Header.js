import React from 'react'
import { Header, Segment, Button } from 'semantic-ui-react';
import slackHeader from '../Images/slack.svg';
import { Link } from 'react-router-dom';

const HeaderTitle =()=> {
  return <Segment clearing>
      <Header as="h2" floated="right">
        <Button.Group>
        <Link to={`/login`}>
          <Button>Login</Button>
          </Link>
          <Button.Or />
          <Link to={`/register`}>
          <Button positive>Get Started</Button>
          </Link>
        </Button.Group>
      </Header>
      <Header as="h2" floated="left">
      <Link to={`/`}>
        <div style={{
    display: "flex",
    height: "40px"
}}>
  
          <img src={slackHeader} alt="logo"/>
          
        </div>
</Link> 
      </Header>
    </Segment>
}

export default HeaderTitle