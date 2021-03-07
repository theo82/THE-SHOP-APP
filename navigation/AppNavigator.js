import React from 'react';
import { ShopNavigator, AuthNavigator } from './ShopNavigator';
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';
import StartupScreen from '../screens/StartupScreen';

const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);
    const didTryAutoLogin = useSelector(state => !!state.auth.didTryAutoLogin);

    // useEffect(() => {
    //         if(!isAuth) {
    //             navRef.current.dispatch(NavigationActions.navigate({routeName: 'Auth' })
    //         );
    //     }
    // }, [isAuth])
    return (
        <NavigationContainer>
            {isAuth && <ShopNavigator />}
            {!isAuth && didTryAutoLogin && <AuthNavigator />}
            {!isAuth && !didTryAutoLogin && <StartupScreen />}
        </NavigationContainer>
    );
}

export default AppNavigator;