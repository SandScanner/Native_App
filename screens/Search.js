import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    TextInput,
    TouchableOpacity,
    } from 'react-native';
    import axios from 'axios';
    import { BASE_URL } from '../config';

const Search = ({navigation}) => {

  const { userInfo, vehicleData, setVehicleData} = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSearch = () => {
    if (search.length >= 5) {
        setLoading(true);
        axios.post(`${BASE_URL}/getBookingDetails`, {
            vehicleNumber: search,
            userId: userInfo?.userId
        }).then(res => {
            if(res.status == 200){
              console.log("got vehicle details ", res.data);
              setVehicleData(res.data);
              setSearchError("");
              navigation.navigate('BookingDetails');
            }
            else{
              setSearchError("No data found")
            }
            
            setLoading(false);
        }).catch(err => {
            console.log(`exception while fetch vehicle data - ${err}`)
            setLoading(false);
        })
    }else{
        setSearchError("Invalid Vehicle Number")
    }
  }

  return (
    <View style={styles.container}>
    <Spinner visible={loading} />
<Text style={styles.title}> TNSand  </Text>
<View style={styles.inputView}>
<TextInput
style={styles.inputText}
placeholder="Vehicle Number"
placeholderTextColor="#003f5c"
onChangeText={text => setSearch(text)}/>
</View>
<TouchableOpacity
onPress = {onSearch}
style={styles.loginBtn}>
<Text style={styles.loginText}>SEARCH </Text>
</TouchableOpacity>
<Text style={styles.errorText}>{searchError ? searchError : ""}</Text>
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


export default Search