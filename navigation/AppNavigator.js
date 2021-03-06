import React from 'react';
// import ShopNavigator from './ShopNavigator';
import { NavigationActions } from 'react-navigation';
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';

const MyStack = createStackNavigator();

const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);

    // useEffect(() => {
    //         if(!isAuth) {
    //             navRef.current.dispatch(NavigationActions.navigate({routeName: 'Auth' })
    //         );
    //     }
    // }, [isAuth])
    return (
        <NavigationContainer>
            <MyStack.Navigator>
                <MyStack.Screen 
                    name="ProductsOverview" 
                    component={ProductsOverviewScreen} 
                />
            </MyStack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;