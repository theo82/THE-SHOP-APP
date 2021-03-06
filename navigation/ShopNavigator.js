import React from 'react';
import { 
  createAppContainer, 
} from 'react-navigation';
import { Platform, SafeAreaView, Button, View } from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";
import ProductsOverViewScreen, { screenOptions } from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailsScreen';
import Colors from '../constants/Colors';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import { Ionicons } from '@expo/vector-icons';

import StartupScreen from "../screens/StartupScreen";
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";

import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';

const defaultNavOptions = {
  headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
      fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
      fontFamily: 'opens-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
     <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
       <ProductsStackNavigator.Screen 
          name="ProductsOverview" 
          component={ProductsOverViewScreen}
          options={screenOptions}
       />
       <ProductsStackNavigator.Screen 
          name="ProductDetails" 
          component={ProductDetailScreen}
       />
       <ProductsStackNavigator.Screen 
          name="Cart" 
          component={CartScreen}
       />
     </ProductsStackNavigator.Navigator>
  )
}

// const ProductsNavigator = createStackNavigator(
// {
//   ProductsOverview: ProductsOverViewScreen,
//   ProductDetails: ProductDetailScreen,
//   Cart: CartScreen
// },
// {
// navigationOptions: {
//   drawerIcon: drawerConfig => (
//     <Ionicons
//       name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//       size={23}
//       color={drawerConfig.tintColor}
//     />
//   )
// },
// defaultNavigationOptions: defaultNavOptions
// })

// const OrdersNavigator = createStackNavigator({
// Orders: OrdersScreen
// },
// {
// navigationOptions: {
//   drawerIcon: drawerConfig => (
//   <Ionicons
//     name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//     size={23}
//     color={drawerConfig.tintColor}
//   />
//   )
// },
// defaultNavigationOptions: defaultNavOptions
// })

// const AdminNavigator = createStackNavigator({
//   UserProducts: UserProductsScreen,
//   EditProduct: EditProductScreen
// },
// {
// navigationOptions: {
//   drawerIcon: drawerConfig => (
//     <Ionicons
//     name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//     size={23}
//     color={drawerConfig.tintColor}
//     />
//   )
//   },
//   defaultNavigationOptions: defaultNavOptions
// })

// const ShopNavigator = createDrawerNavigator({
//   Products: ProductsNavigator,
//   Orders: OrdersNavigator,
//   Admin: AdminNavigator
//   }, {
//   contentOptions: {
//     activeTintColor: Colors.primary
//   },
//   contentComponent: props => {
//     const dispatch = useDispatch();
//     return (
//       <View style={{ flex: 1, paddingTop: 20 }}>
//         <SafeAreaView forceInset={{top: 'always', horizontal: 'never' }} >
//           <DrawerItems {...props} />
//           <Button title="Logout" color={Colors.primary} onPress={() => {
//             dispatch(authActions.logout());
//             // props.navigation.navigate('Auth');
//           }}/>
//         </SafeAreaView>
//       </View>
//     );
//   }
// });

// const AuthNavigator = createStackNavigator(
// {
//   Auth: AuthScreen
// });

// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator
// });

// export default createAppContainer(MainNavigator)
