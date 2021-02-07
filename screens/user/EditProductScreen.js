import React, { useState, useCallback, useEffect, useReducer } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';

import * as productsActions from '../../store/actions/products';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if(action.type === FORM_INPUT_UPDATE) {
    
  }
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

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [titleIsValid, setTitleIsValid] = useState(false);
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');
    
    const submitHandler = useCallback(() => {
      if(!titleIsValid) {
        Alert.alert('Wrong input!', 'Please check the errors in the form.',[
          { text: 'Okay' }
        ]);
        return; 
      }
        if (editedProduct) {
          dispatch(
            productsActions.updateProduct(prodId, title, description, imageUrl)
          );
        } else {
          dispatch(
            productsActions.createProduct(title, description, imageUrl, +price)
          );
        }
        props.navigation.goBack();
      }, [dispatch, prodId, title, description, imageUrl, price, titleIsValid]);
     
      useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
      }, [submitHandler]);

    const titleChangeHandler = text => {
      let isValid = false;
      if (text.trim().length > 0) {
        
      } else {
        
      }
      dispatchFormState({
        type: FORM_INPUT_UPDATE, 
        value: text, 
        isValid: isValid,
        input: 'title'
      })
    }


    return (
        <ScrollView>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={titleChangeHandler}
              keyboardType='default'
              autoCapitalize='sentences'
              autoCorrect
              returnKeyType='next'
              onEndEditing={() => console.log('onEndEditing')}
              onSubmitEditing={() => console.log('onSubmitEditing')}
            />
            {!titleIsValid && <Text>Please enter a valid title!</Text>}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Image URL</Text>
            <TextInput
              style={styles.input}
              value={imageUrl}
              onChangeText={text => setImageUrl(text)}
              keyboardType="decimal-pad"
            />
          </View>
          {editedProduct ? null : (
            <View style={styles.formControl}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={text => setPrice(text)}
              />
            </View>
          )}
          <View style={styles.formControl}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={text => setDescription(text)}
            />
          </View>
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
    formControl: {},
    label: {
        fontFamily: 'opens-sans-bold',
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1

    }
});

export default EditProductScreen;