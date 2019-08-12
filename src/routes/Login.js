import React, { Component } from 'react';
import { Message, Button, Container, Header, Input } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { observer } from 'mobx-react';
import { extendObservable } from 'mobx';
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

export default observer(
  class Login extends Component {
    constructor(props) {
      super(props);
      extendObservable(this, {
        email: '',
        password: ''
      });
    }

    onChange = e => {
      const { name, value } = e.target;
      this[name] = value;
    };

    onSubmit = async () => {
      const { email, password } = this;
      console.log(email)
      console.log(password)
      // const res = await this.props.mutate({
      //   variables: this.state
      // });

      // const { ok, errors } = res.data.register;

      // if (ok) {
      //   this.props.history.push('/');
      // } else {
      //   const err = {};
      //   errors.map(({ path, message }) => {
      //     err[`${path}Error`] = message;
      //   });
      //   this.setState(err);
      // }
      // console.log(res.data.register.errors);
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
);
// export default graphql(SIGN_UP)(Register);
