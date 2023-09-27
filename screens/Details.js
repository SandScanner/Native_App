import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext} from 'react'
import { AuthContext } from '../context/AuthContext'

const numColumns = 2;

const Details = ({navigation}) => {

const { vehicleData } = useContext(AuthContext);

  let dateOfBooking = new Date(vehicleData?.dateOfBooking);
  let month = dateOfBooking.toLocaleString('en-US', { month: 'short' })
  let year = dateOfBooking.getFullYear()
  let date_number = dateOfBooking.getDate()
  let formatted_dob =  `${date_number} ${month} ${year}`
  let price = vehicleData?.sandCost * vehicleData?.unit

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
  
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
  
    return data;
  };

  const data1 = [
    {key : 'Order Status', value: 'Confirmed'},
    {key : 'Date of booking', value : formatted_dob},
    {key : 'Vehicle No' , value: vehicleData?.vehicleRegNumber},
    {key : 'Axle' , value: 'Axle'},
    {key : 'Engine No' , value: 'NA'},
    {key : 'Chassis No' , value: 'NA'},
    {key : 'Volume' , value: '8.49 m3'},
    {key : 'Price', value: `₹ ${price}`}
  ]

  const renderItem1 = ({item, index}) => {
    
    return (
        <View key={index} style={styles.item}>
            <Text>{item.key}</Text>
            <Text>{item.value}</Text>
        </View>
    )
  }

  return (

        //  <FlatList data={formatData(data1, numColumns)} 
        //  renderItem={renderItem1}
        //  style={styles.container}
        //  />
        <View style={styles.container}>
            <View style={styles.container1}>
            {
                data1.map((item, index) => (
                    // <View style={styles.miniContainer}>
                    <Text style={styles.keyText} key={`${index}key`}>{item.key}

                        {"    "}<Text style={styles.valText} key={`${index}val`}>{item.value}</Text>
                    </Text>
                    
                    // </View>
                ))
            }
            
            <View style={styles.container}>
            <Text style={styles.keyText1}>Quarry</Text>
            <Text style={styles.valText}>{` ${vehicleData?.name.split('Lorry-')[1]}`}</Text>
            <Text style={styles.keyText1}>{vehicleData?.riverBedName}</Text>
            </View>

            <View style={styles.container}>
            <Text style={styles.keyText1}>Delivery Address</Text>
            <Text style={styles.valText}>{vehicleData?.customerName}</Text>
            <Text style={styles.valText}>{vehicleData?.delivery}</Text>
            <Text style={styles.valText}>{`${vehicleData?.city}, ${vehicleData?.district} - ${vehicleData?.pincode}`}</Text>
            </View>

            <TouchableOpacity
            onPress = {e => navigation.navigate('PermitSlipForm')}
            style={styles.loginBtn}>
            <Text style={styles.loginText}>ACCEPT</Text>
            </TouchableOpacity>
            
            </View>
        </View>
    
  )
}

export default Details

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        // flexDirection: 'row'
    },
    container1: {
        flex: 1,
        flexDirection : 'row',
        flexWrap: 'wrap'
    },
    item: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        width: '50%'
      },
    itemInvisible: {
        backgroundColor: 'transparent',
      },
    keyText: {
        color: 'gray',
        fontSize: 10,
        height: 100,
        width: "50%",
    },
    keyText1: {
        color: 'gray',
        fontSize: 10,
        height: 15,
        marginTop: 5
    },
    valText: {
        color: 'black',
        fontSize: 12
    },
    miniContainer: {
        flex: 1,
        height: 100,
        width: 200
    },    
    loginBtn:{
    width:"100%",
    backgroundColor:"blue",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
    },
})