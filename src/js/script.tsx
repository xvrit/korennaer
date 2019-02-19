import '@babel/polyfill';
import 'whatwg-fetch';

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './containers';
import KorennaerProvider from './contexts/korennaerContext';

import ApolloClient from 'apollo-boost';
import {ErrorResponse} from 'apollo-link-error';
import {ApolloProvider} from 'react-apollo';
import {GRAPHQL_URL} from './lib/globals';
import {clearAccessTokens} from './lib/korennaerClient';

const client = new ApolloClient({
  request: async operation => {
    const token: any = null;
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  onError: (err: ErrorResponse) => {
    console.log(err);
    // @ts-ignore
    if (err.networkError && err.networkError.statusCode === 403) {
      clearAccessTokens();
      document.location.reload();
    }
  },
  uri: GRAPHQL_URL
});

const init = () =>
  render(
    <ApolloProvider client={client}>
      <KorennaerProvider>
        <Router>
          <App />
        </Router>
      </KorennaerProvider>
    </ApolloProvider>,
    document.querySelector(`.react-mount`)
  );

init();
