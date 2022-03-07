// SignUpScreen.js
//template from https://blog.logrocket.com/react-native-form-validations-with-formik-and-yup/ and Youtube Channel "Pradip Debnath"
import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Image,
  TouchableOpacity
} from 'react-native'
import { Formik, Field } from 'formik'
import * as yup from 'yup'

const SignUpScreen = ({navigation}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
      <Image source={require('./assets/se350logo.jpg')} style ={{width:150, height:150}} />
        <Text style={{fontSize:40}}>Rorr</Text>
        <View style={styles.signupContainer}>

        <Text>Sign Up Screen</Text>

        <Formik
            validationSchema={signUpValidationSchema}
            initialValues={{fullName: '', email: '', password: '',}}
            //onSubmit={values => console.log(values)}
            onSubmit={() => navigation.navigate("SignIn")}

        >
          {({  handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, }) => (
            <>
              
              <TextInput
                //component={CustomInput}
                name="fullName"
                placeholder="Full Name"
                style={styles.textInput}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
                //keyboardType="email-address"
              />
              {(errors.fullName && touched.fullName) &&
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                }
              <TextInput
                  name="email"
                  placeholder="Email Address"
                  style={styles.textInput}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                {(errors.email && touched.email) &&
                  <Text style={styles.errorText}>{errors.email}</Text>
                }
              <TextInput
                  name="password"
                  placeholder="Password"
                  style={styles.textInput}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                {(errors.password && touched.password) &&
                  <Text style={styles.errorText}>{errors.password}</Text>
                }
              <TouchableOpacity style = {{margin:5}}>
              <Button
                color="#ffa500"
                onPress={handleSubmit}
                title="SIGN UP"
                disabled={!isValid}
              />
              </TouchableOpacity>

              <TouchableOpacity style = {{margin:5}}>
              <Button
                color="#ffa500"
                title="Go to SignIn screen"
                onPress={()=> navigation.navigate("SignIn")}
              />
              </TouchableOpacity>

            </>
          )}
        </Formik>
        </View>
      </SafeAreaView>
    </>
  )
}
const signUpValidationSchema = yup.object().shape({
    fullName: yup
      .string()
      .matches(/(\w.+\s).+/, 'Enter at least 2 names')
      .required('Full name is required'),
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email is required'),
    password: yup
      .string()
      .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
      .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
      .matches(/\d/, "Password must have a number")
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkgray',

  },
  signupContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6'
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
})
export default SignUpScreen
