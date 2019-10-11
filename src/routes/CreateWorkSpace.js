import React, { Component } from 'react';
import { Button, Container, Header, Form } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { observer } from 'mobx-react';
import { extendObservable } from 'mobx';
import { CreateWorkSpaceMutation } from '../graphql/mutation/createWorkSpaceMutation';
import HeaderTitle from '../components/Header'

class CreateWorkSpace extends Component {
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
    const { ok, errors, workSpace } = res.data.createWorkSpace;

    if (ok) {
      this.props.history.push(`/view-workspace/${workSpace.id}`);
    } else {
      const err = {};
      // eslint-disable-next-line
      errors.map(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.errors = err;
    }
  };
  render() {
    return (
      <>
      <HeaderTitle/>
      <Container text>
        <Header as="h2">Create A WorkSpace</Header>
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
          </Form.Field>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
      </Container>
      </>
    );
  }
}

export default graphql(CreateWorkSpaceMutation, {
  // options: {
  //   fetchPolicy: 'network-only'
  // }
})(observer(CreateWorkSpace));
