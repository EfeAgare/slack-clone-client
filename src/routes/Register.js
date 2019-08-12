import React, { Component } from 'react';
import { Message, Button, Container, Header, Input } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    usernameError: '',
    emailError: '',
    passwordError: ''
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      usernameError: '',
      emailError: '',
      passwordError: ''
    });
  };

  onSubmit = async () => {
    const res = await this.props.mutate({
      variables: this.state
    });

    const { ok, errors } = res.data.register;

    if (ok) {
      this.props.history.push('/');
    } else {
      const err = {};
      errors.map(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }
    console.log(res.data.register.errors);
  };
  render() {
    const {
      username,
      email,
      password,
      usernameError,
      passwordError,
      emailError
    } = this.state;

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Input
          fluid
          placeholder="Username"
          error={!!usernameError}
          name="username"
          value={username}
          onChange={this.onChange}
        />
        {usernameError && <Message error list={[usernameError]} />}
        <Input
          fluid
          error={!!emailError}
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.onChange}
        />
        {emailError && <Message error list={[emailError]} />}
        <Input
          type="password"
          fluid
          error={!!passwordError}
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.onChange}
        />
        {passwordError && <Message error list={[passwordError]} />}
        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    );
  }
}

export default graphql(SIGN_UP)(Register);
