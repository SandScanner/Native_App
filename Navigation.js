const { useContext } = require("react")
const { AuthContext } = require("./context/AuthContext")
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Search, PermitSlipForm, Details, GeneratedPermit, TestPdf, TestBluetooth } from './screens';
import Tsc from './screens/tsc';
import EscPos from './screens/escpos';

const Stack = createNativeStackNavigator();
const Navigation = () => {
    const {isLoading, userInfo} = useContext(AuthContext);

    return (

    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
            {
                userInfo.userId ? (
                <>
                <Stack.Screen name="Search"
                component={Search}
                options={{headerShown: true, title: "Manual Entry"}}
                />

                <Stack.Screen name="BookingDetails"
                component={Details}
                options={{headerShown: true, title: "Booking Details"}}
                />

                <Stack.Screen name="PermitSlipForm"
                component={PermitSlipForm}
                options={{headerShown: true, title: "Permit Slip"}}
                />

                <Stack.Screen name="GeneratedPermitSlip"
                component={GeneratedPermit}
                options={{headerShown: true, title: "Permit Slip Generated"}}
                />

                <Stack.Screen name="connectPrinter"
                component={TestBluetooth}
                options={{headerShown: true, title: "Connect to Printer"}}
                />

                
                <Stack.Screen name="tscPrinter"
                component={Tsc}
                options={{headerShown: true, title: "TSC printer"}}
                />

                <Stack.Screen name="escPrinter"
                component={EscPos}
                options={{headerShown: true, title: "ESC printer"}}
                />
                </>
                ) : 
                <>
                <Stack.Screen name="test1"
                component={TestBluetooth}
                options={{headerShown: true, title: "Permit Slip Generated"}}
                />
                <Stack.Screen name="Login"
                component={Login}
                options={{headerShown: false}}
            />
            </>
            }
        </Stack.Navigator>
    </NavigationContainer>

    );
}

export default Navigation;