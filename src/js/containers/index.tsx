import {hot} from 'react-hot-loader';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Consumer} from '../contexts/korennaerContext';

import Routes from '../routes';

import React, {useState} from 'react';
import './index.css';

const App = (props: RouteComponentProps) => {
  const [ redirect, setRedirect ] = useState(false);
  return <Consumer>{() => <Routes />}</Consumer>;
};

// @ts-ignore
export default withRouter(hot(module)(App));
