import react, {useState} from "react"
import axios from "axios";
import React, { createContext } from "react";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [initialPdf, setInitialPdf] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [vehicleData, setVehicleData] = useState();
    const [bluetoothInfo, setBlueToothInfo] = useState({
        name: '',
        boundAddress: ''
    })
    const loginAPI = (username, password) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}/login`, {
            username, password
        }).then(res => {
            setUserInfo(res.data);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            console.log("user info ", userInfo)
        }).catch(e => {
            console.log(`login error ${e}`)
            setIsLoading(false);
        })
    }

    return (
    <AuthContext.Provider value={{loginAPI, userInfo, isLoading, vehicleData, setVehicleData, bluetoothInfo, setBlueToothInfo, initialPdf, setInitialPdf}}>
        {children}
    </AuthContext.Provider>
    );
    
}