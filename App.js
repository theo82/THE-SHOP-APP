import React from 'react';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducers from './store/reducers/orders';

import ShopNavigator from './navigation/ShopNavigator';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducers
});

const store = createStore(rootReducer, composeWithDevTools());

export default function App() {

  let [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if (!fontsLoaded) {
    return (
      <AppLoading/>
    );
  }

  return (
    <Provider store={store}>
        <ShopNavigator />
    </Provider>
  );
}

