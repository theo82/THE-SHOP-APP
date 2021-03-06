import React from 'react';
import { ProductsNavigator } from './ShopNavigator';
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';

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
            <ProductsNavigator />
        </NavigationContainer>
    );
}

export default AppNavigator;