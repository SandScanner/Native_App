import React, { useContext, useState }  from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableOpacity,
    } from 'react-native';
    import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
    
const Login = ({navigation}) => {

        const {loginAPI, isLoading, userInfo} = useContext(AuthContext);

        const onPressLogin = (nav) => {
        // Do something about login operation
        console.log('clicked...', state)
        // nav.navigate('Search')
        loginAPI(state.email, state.password);
        };
        const onPressForgotPassword = () => {
        // Do something about forgot password operation
        };
        const onPressSignUp = () => {
        // Do something about signup operation
        };
        const [state,setState] = useState({
        email: '',
        password: '',
        loginError: ''
        })

        




  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
<Text style={styles.title}> Login </Text>
<View style={styles.inputView}>
<TextInput
style={styles.inputText}
placeholder="Username"
placeholderTextColor="#003f5c"
onChangeText={text => setState({...state, email:text})}/>
</View>
<View style={styles.inputView}>
<TextInput
style={styles.inputText}
secureTextEntry
placeholder="Password"
placeholderTextColor="#003f5c"
onChangeText={text => setState({...state, password:text})}/>
</View>
<TouchableOpacity
onPress = {e => onPressLogin(navigation)}
style={styles.loginBtn}>
<Text style={styles.loginText}>LOGIN </Text>
</TouchableOpacity>
<Text style={styles.errorText}>{state.loginError ? state.loginError : ""}</Text>
</View>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#4FD3DA',
    alignItems: 'center',
    justifyContent: 'center',
    },
    title:{
    fontWeight: "bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom: 40,
    },
    inputView:{
    width:"80%",
    backgroundColor:"#3AB4BA",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
    },
    inputText:{
    height:50,
    color:"white"
    },
    forgotAndSignUpText:{
    color:"white",
    fontSize:11
    },
    loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
    },
    errorText: {
      color: "red"
    }
    });

export default Login