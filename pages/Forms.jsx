import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {RFValue} from 'react-native-responsive-fontsize';
const Forms = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(
        /^[A-Za-z ]+$/,
        'Name can only contain alphabetic characters and spaces',
      )
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      )
      .required('Password is required'),
  });
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 20,
        }}>
        Login Form
      </Text>
      <Formik
        initialValues={{name: '', email: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log('Submitted:', values);
        }}>
        {({values, handleChange, handleSubmit, errors, touched}) => (
          <KeyboardAwareScrollView>
            <View>
              <View style={style.inputContainer}>
                <Text style={style.inputLabel}>Name:</Text>
                <TextInput
                  placeholder="Name"
                  onChangeText={handleChange('name')}
                  value={values.name}
                  style={style.input}
                />
                {touched.name && errors.name && (
                  <Text style={{color: 'red'}}>{errors.name}</Text>
                )}
              </View>
              <View style={style.inputContainer}>
                <Text style={style.inputLabel}>Email:</Text>
                <TextInput
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  keyboardType="email-address"
                  style={style.input}
                />
                {touched.email && errors.email && (
                  <Text style={{color: 'red'}}>{errors.email}</Text>
                )}
              </View>
              <View style={style.inputContainer}>
                <Text style={style.inputLabel}>Password:</Text>
                <TextInput
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  value={values.password}
                  keyboardType="default"
                  style={style.input}
                />
                {touched.password && errors.password && (
                  <Text style={{color: 'red'}}>{errors.password}</Text>
                )}
              </View>
              <View style={style.buttonContainer}>
                <TouchableOpacity onPress={handleSubmit} style={style.button}>
                  <Text style={style.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  );
};

const style = StyleSheet.create({
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    height: 40,
    width: RFValue(300),
  },
  inputContainer: {
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
  },
  buttonContainer: {
    marginTop: 7,
  },
  button: {
    backgroundColor: '#007AFF', // Change to your desired background color
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // Change to your desired text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default Forms;
