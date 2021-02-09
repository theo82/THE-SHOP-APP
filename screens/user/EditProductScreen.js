import React, { useState, useCallback, useEffect, useReducer } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';

import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if(action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value    
    };
    const updatedValidities= {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for(const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]; 
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
  
    }
  }
  return state;
}

const EditProductScreen = props => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(prod=>prod.id === prodId)
    )

    const dispatch = useDispatch();
    
    // The formReducer function should be
    // able to change that state when an action
    // is dispatched. And that happens when we type
    // in our text inputs.

    // The useReducer will return a state snapshot (formState in our case)
    // and a function that will allow us to dispatch actions. 
    const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
        title: editedProduct ? editedProduct.title : '',
        imageUrl: editedProduct ? editedProduct.imageUrl : '',
        description: editedProduct ? editedProduct.description : '',
        price: '',
      },
      inputValidities: {
        title: editedProduct ? true : false,
        imageUrl: editedProduct ? true : false,
        description: editedProduct ? true : false,
        price: editedProduct ? true : false,
      },
      formIsValid: editedProduct ? true : false
    })

    
    const submitHandler = useCallback(() => {
      if(!formState.formIsValid ) {
        Alert.alert('Wrong input!', 'Please check the errors in the form.',[
          { text: 'Okay' }
        ]);
        return; 
      }
        if (editedProduct) {
          dispatch(
            productsActions.updateProduct(
              prodId, 
              formState.inputValues.title, 
              formState.inputValues.description, 
              formState.inputValues.imageUrl
            )
          );
        } else {
          dispatch(
            productsActions.createProduct (formState.inputValues.title, 
            formState.inputValues.description, 
            formState.inputValues.imageUrl, 
            +formState.inputValues.price)
          );
        }
        props.navigation.goBack();
      }, [dispatch, prodId, formState]);
     
      useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
      }, [submitHandler]);

    const textChangeHandler = (inputIndentifier, text) => {
      let isValid = false;
      if (text.trim().length > 0) {
        isValid = true
      } 
      dispatchFormState({
        type: FORM_INPUT_UPDATE, 
        value: text, 
        isValid: isValid,
        input: inputIndentifier
      })
    }

    return (
        <ScrollView>
        <View style={styles.form}>
          <Input 
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentenses"
            autoCorrect
            returnKeyType="next"
          />
          <Input 
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            autoCapitalize="sentenses"
            returnKeyType="next"
          />
          {editedProduct ? null : (
            <Input 
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
          />
          )}
          <Input 
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentenses"
            autoCorrect
            multiline
            numberOfLines={3}
          />
        </View>
      </ScrollView>
    );
};

EditProductScreen.navigationOptions = navData => {

    const submitFn = navData.navigation.getParam('submit');

    return {
        headerTitle: navData.navigation.getParam('productId') 
            ? 'Edit Product' 
            : 'Add Product',
        headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                        title='Save' 
                        iconName={
                            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                        } 
                        onPress={submitFn}
                    />  
                </HeaderButtons>
            )
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    
});

export default EditProductScreen;