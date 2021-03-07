import React from 'react';
import { 
  createAppContainer, 
} from 'react-navigation';
import { Platform, SafeAreaView, Button, View } from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";

import ProductsOverViewScreen, { 
  screenOptions as productsOverViewScreenOptions 
} from '../screens/shop/ProductOverviewScreen';

import ProductDetailScreen, { 
  screenOptions as productDetailScreenOptions
} from '../screens/shop/ProductDetailsScreen';

import CartScreen, { 
  screenOptions as cartScreenOptions
} from '../screens/shop/CartScreen';

import OrdersScreen, { 
  screenOptions as ordersScreenOptions
} from "../screens/shop/CartScreen";

import UserProductsScreen, { 
  screenOptions as userProductsScreenOptions
} from "../screens/user/UserProductsScreen";

import EditProductsScreen, { 
  screenOptions as editProductScreenOptions
} from "../screens/user/UserProductsScreen";

import Colors from '../constants/Colors';
import Order from '../models/order';


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
          options={productsOverViewScreenOptions}
       />
       <ProductsStackNavigator.Screen 
          name="ProductDetails" 
          component={ProductDetailScreen}
          options={productDetailScreenOptions}
       />
       <ProductsStackNavigator.Screen 
          name="Cart" 
          component={CartScreen}
          options={cartScreenOptions}
       />
     </ProductsStackNavigator.Navigator>
  )
}

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen 
        name="Orders" 
        component={OrdersScreen} 
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  )
}

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminNavigator.Screen 
        name="UserProducts" 
        component={UserProductsScreen} 
        options={userProductsScreenOptions}
      />
      <AdminNavigator.Screen 
        name="EditProduct" 
        component={EditProductScreen} 
        option={editProductScreenOptions} 
      />
    </AdminStackNavigator.Navigator>
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
