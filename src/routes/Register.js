import React, { Component } from 'react';
import { Form, Button, Container, Header } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const SignUpMutation = gql`
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
    console.log(usernameError);
    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Form error>
          <Form.Field>
            <Form.Input
              fluid
              placeholder="Username"
              error={!!usernameError ? usernameError : null}
              name="username"
              value={username}
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              fluid
              error={!!emailError ? emailError : null}
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.onChange}
            />
            {/* {emailError && <Message error list={[emailError]} />} */}
          </Form.Field>
          <Form.Field>
            <Form.Input
              type="password"
              fluid
              error={!!passwordError ? passwordError : null}
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.onChange}
            />
            {/* {passwordError && <Message error list={[passwordError]} />} */}
          </Form.Field>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default graphql(SignUpMutation)(Register);
