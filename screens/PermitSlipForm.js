import { View, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { TextInput, Text, Button } from 'react-native-paper';
import moment from 'moment';
import DropDown from "react-native-paper-dropdown";

const PermitSlipForm = ({navigation}) => {

  const {vehicleData, setVehicleData} = useContext(AuthContext);
  const [showDropDown, setShowDropDown] = useState(false);

  const [errState, setErrState] = useState({
    hours: '',

  });

  const districts_list = [
    { label: 'Ariyalur', value: 'Ariyalur' },
  { label: 'Chennai', value: 'Chennai' },
  { label: 'Coimbatore', value: 'Coimbatore' },
  { label: 'Cuddalore', value: 'Cuddalore' },
  { label: 'Dharmapuri', value: 'Dharmapuri' },
  { label: 'Dindigul', value: 'Dindigul' },
  { label: 'Erode', value: 'Erode' },
  { label: 'Kanchipuram', value: 'Kanchipuram' },
  { label: 'Kanyakumari', value: 'Kanyakumari' },
  { label: 'Karur', value: 'Karur' },
  { label: 'Krishnagiri', value: 'Krishnagiri' },
  { label: 'Madurai', value: 'Madurai' },
  { label: 'Nagapattinam', value: 'Nagapattinam' },
  { label: 'Namakkal', value: 'Namakkal' },
  { label: 'Nilgiris', value: 'Nilgiris' },
  { label: 'Perambalur', value: 'Perambalur' },
  { label: 'Pudukkottai', value: 'Pudukkottai' },
  { label: 'Ramanathapuram', value: 'Ramanathapuram' },
  { label: 'Salem', value: 'Salem' },
  { label: 'Sivaganga', value: 'Sivaganga' },
  { label: 'Thanjavur', value: 'Thanjavur' },
  { label: 'Theni', value: 'Theni' },
  {
    label: 'Thoothukudi (Tuticorin)',
    value: 'Thoothukudi (Tuticorin)'
  },
  { label: 'Tiruchirappalli', value: 'Tiruchirappalli' },
  { label: 'Tirunelveli', value: 'Tirunelveli' },
  { label: 'Tiruppur', value: 'Tiruppur' },
  { label: 'Tiruvallur', value: 'Tiruvallur' },
  { label: 'Tiruvannamalai', value: 'Tiruvannamalai' },
  { label: 'Tiruvarur', value: 'Tiruvarur' },
  { label: 'Vellore', value: 'Vellore' },
  { label: 'Viluppuram', value: 'Viluppuram' },
  { label: 'Virudhunagar', value: 'Virudhunagar' }
  ]

  const setPermitExpiry = (hours) => {
    let cur_date = new Date();
    let added_hrs =  Number(cur_date.getHours()) + Number(hours);
    cur_date.setHours(added_hrs);
    console.log("Date ", cur_date);
    setVehicleData({...vehicleData, permitExpiryDate: moment(cur_date).format('DD MMM YYYY hh:mm A'), hours: hours,
    permitExpiryDate1: moment(cur_date).format('DD-MMM-YYYY hh:mm A')})
    setErrState({...errState, hours: ''})
  }

  console.log("vehicle data ", vehicleData)

const setDistrict = (value) => {
    console.log("selected dis", value);
    setVehicleData(prevState => ({...prevState, selectedDistrict: value}));
    setErrState({...errState, district: ''});
}

const submitForm = () => {
  if(! vehicleData.hours >= 1){
    setErrState({...errState, hours: 'Enter valid hours'})
    return
  }
  if(vehicleData.delivery?.length < 4){
    setErrState({...errState, delivery: 'Enter valid delivery address'})
    return
  }
  if(vehicleData.city?.length < 4){
    setErrState({...errState, city: 'Enter valid city name'})
    return
  }
  if(!vehicleData.selectedDistrict){
    setErrState({...errState, district: 'Please select district'})
    return
  }
  setErrState({});
  navigation.navigate('GeneratedPermitSlip')
}

console.log('errstate ', errState)

  return (
    <View style={styles.container}>
        <View style={styles.container1}>
       <TextInput
        label="Enter Hours"
        keyboardType='numeric'
        onChangeText={text => setPermitExpiry(text.replace(/[^0-9]/g, ''))}
        style={styles.hours_inp}
        value={vehicleData.hours}
        error={errState.hours ? true : false}
        
        />
        <Text>
            <Text style={styles.label_txt}> Permit Expiry Date </Text>
            {"\n"}
            {vehicleData.permitExpiryDate}
        </Text>
        </View>

        
        <TextInput
        label="Customer Name"
        value={vehicleData?.customerName}
        editable={false}
        style={styles.big_inp}
        />

        <TextInput
        label="Delivery Address"
        value={vehicleData?.delivery}
        style={styles.big_inp}
        onChangeText={text => {setVehicleData({...vehicleData, delivery: text}); setErrState({...errState, delivery: ''})}}
        error={errState.delivery ? true : false}
        />

        <TextInput
        label="City / Village / Town"
        value={vehicleData?.city}
        style={styles.big_inp}
        onChangeText={text => {setVehicleData({...vehicleData, city: text}); setErrState({...errState, city: ''})}}
        error={errState.city ? true : false}
        />
        
        <View style={styles.drop}> 
        <DropDown
              label={"District"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={vehicleData.selectedDistrict}
              setValue={setDistrict}
              list={districts_list}
            />
            <Text>{errState.district}</Text>
            </View>
        
        <View style={styles.container2}>
        <Text style={styles.label_left}>Axle</Text>
        <Text style={styles.value_right}>{vehicleData?.unit > 2 ? '2' : '1'}</Text>
        </View>

        <View style={styles.container2}>
        <Text style={styles.label_left}>Unit</Text>
        <Text style={styles.value_right}>{vehicleData?.unit}</Text>
        </View>
        
        
        
        <View>
        <TextInput
        label="Volume"
        value={vehicleData?.unit == 3 ? '8.49 m³' : '5.66 m³'}
        style={styles.big_inp}
        editable={false}
        />

        <TextInput
        label="Price"
        value={`Rs. ${vehicleData?.unit * vehicleData?.sandCost}`}
        style={styles.big_inp}
        keyboardType='numeric'
        />
        </View>

        <View style={styles.drop}>
        <Button  mode="contained" onPress={submitForm}>
            Submit
        </Button>
        </View>
        
    </View>
  )
}

export default PermitSlipForm

const styles = StyleSheet.create({
    container: {
        flex: 1
    },  
    container1: {
        flexDirection: 'row'
    },
    container2: {
        margin: 20,
        flexDirection: 'row',
        width: "100%"
    }, 
    label_left: {
        width: "50%"
    } , 
    value_right: {
        width: "50%"
    },
    label_txt: {
        color: "grey"
    },
   hours_inp: {
    margin: 10,
    width: 100
   },
   big_inp: {
    margin: 10
   },
   drop:{
    marginLeft: 10,
    marginRight: 10
   }
})