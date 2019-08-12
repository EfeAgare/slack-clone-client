import React, { Component } from 'react';
import { Message, Button, Container, Header, Input } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { observer } from 'mobx-react';
import { extendObservable } from 'mobx';
import gql from 'graphql-tag';

const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

class Login extends Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      email: '',
      password: '',
      errors: {}
    });
  }

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  onSubmit = async () => {
    const { email, password } = this;
    const res = await this.props.mutate({
      variables: { email, password }
    });

    const { ok, errors, token, refreshToken } = res.data.login;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      const err = {};
      errors.map(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.errors = err;
    }
    console.log(res.data);
  };
  render() {
    return (
      <Container text>
        <Header as="h2">Register</Header>

        <Input
          fluid
          // error={!!emailError}
          name="email"
          placeholder="Email"
          value={this.email}
          onChange={this.onChange}
        />
        <Input
          type="password"
          fluid
          // error={!!passwordError}
          name="password"
          placeholder="Password"
          value={this.password}
          onChange={this.onChange}
        />
        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    );
  }
}

export default graphql(LOGIN)(observer(Login));
