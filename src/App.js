import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import Routes from './Routes';
import { Provider } from 'react-redux';
import store from './store';
import { client } from './config/ApolloClient';



function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
