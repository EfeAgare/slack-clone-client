import React, { Component } from 'react';
import { Button, Container, Header, Form } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { observer } from 'mobx-react';
import { extendObservable } from 'mobx';
import { LoginMutation } from '../graphql/mutation/loginMutation';

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
      this.props.history.push('/');
    } else {
      const err = {};
      // eslint-disable-next-line
      errors.map(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.errors = err;
    }
    console.log(this.errors);
  };
  render() {
    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Form error>
          <Form.Field>
            <Form.Input
              fluid
              error={this.errors.emailError}
              name="email"
              placeholder="Email"
              value={this.email}
              onChange={this.onChange}
            />
            {/* {this.errors.emailError && (
              <Message error list={[this.errors.emailError]} />
            )} */}
          </Form.Field>
          <Form.Field>
            <Form.Input
              type="password"
              fluid
              error={this.errors.passwordError}
              name="password"
              placeholder="Password"
              value={this.password}
              onChange={this.onChange}
            />
          </Form.Field>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default graphql(LoginMutation)(observer(Login));
