import React, { Component } from 'react';
import { Button, Container, Header, Form } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { observer } from 'mobx-react';
import { extendObservable } from 'mobx';
import gql from 'graphql-tag';

const CreateTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

class CreateTeam extends Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      name: '',
      errors: {}
    });
  }

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  onSubmit = async () => {
    const { name } = this;
    const res = await this.props.mutate({
      variables: { name }
    });

    const { ok, errors } = res.data.createTeam;

    if (ok) {
      this.props.history.push('/');
    } else {
      const err = {};
      errors.map(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.errors = err;
    }
  };
  render() {
    return (
      <Container text>
        <Header as="h2">Create Team</Header>
        <Form error>
          <Form.Field>
            <Form.Input
              fluid
              error={this.errors.nameError}
              name="name"
              placeholder="Name"
              value={this.name}
              onChange={this.onChange}
            />
            {/* {this.errors.emailError && (
              <Message error list={[this.errors.emailError]} />
            )} */}
          </Form.Field>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default graphql(CreateTeamMutation)(observer(CreateTeam));
