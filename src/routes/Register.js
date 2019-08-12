import React, { Component } from 'react';
import { Button, Container, Header, Input } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import  gql from 'graphql-tag';

const SIGN_UP = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      username
    }
  }
`;

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: ''
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = async () => {
    const res = await this.props.mutate({
      variables: this.state
    });
    console.log(res);
  };
  render() {
    const { username, email, password } = this.state;

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Input
          fluid
          placeholder="Username"
          name="username"
          value={username}
          onChange={this.onChange}
        />
        <Input
          fluid
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.onChange}
        />
        <Input
          type="password"
          fluid
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.onChange}
        />
        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    );
  }
}

export default graphql(SIGN_UP)(Register);
