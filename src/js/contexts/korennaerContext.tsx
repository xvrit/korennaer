import React, {createContext, useState} from 'react';
import {withApollo} from 'react-apollo';
export const {Provider, Consumer} = createContext<AppContextInterface>(null);

interface State {}

interface Props {
  data?: any;
  client?: any;
  children: any;
}

interface AppContextInterface extends State {}

interface State {}

const KorennaerProvider = ({children}: Props) => {
  const initialState: State = {};

  const [ state, setState ] = useState(initialState);

  return (
    <Provider
      value={{
        ...state
      }}
    >
      {children}
    </Provider>
  );
};

// @ts-ignore
export default withApollo(KorennaerProvider);
