import React, { Component } from 'react';
import { Form, Button, Container, Header } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { SignUpMutation } from '../graphql/mutation/signUpMutation';

class Register extends Component {
  search  = this.props.location.search;
  searchParams = new URLSearchParams(this.search);
  state = {
    username: '',
    email: '',
    password: '',
    usernameError: '',
    emailError: '',
    passwordError: '',
    token: this.searchParams.get('q') || ''
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
      variables: this.state,
    });

    
    const { ok, errors, token, refreshToken } = res.data.register;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      this.props.history.push('/view-workspace');
    } else {
      const err = {};
      // eslint-disable-next-line
      errors.map(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }
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
