import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import 'semantic-ui-css/semantic.min.css';

import * as serviceWorker from './serviceWorker';
import { Routes } from './routes/index';


const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request:  operation => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    operation.setContext({
      headers: {
        'x-token': token,
        'x-refresh-token': refreshToken
      }
    });
  }
});

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
