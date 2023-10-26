import React, { useState, useEffect, useContext } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Switch,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  DeviceEventEmitter
} from 'react-native';
import {
  BluetoothEscposPrinter,
  BluetoothManager,
  BluetoothTscPrinter,
} from 'react-native-bluetooth-escpos-printer';
import EscPos from './escpos';
import Tsc from './tsc';
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
const { height, width } = Dimensions.get('window');

export default function TestBluetooth({navigation}) {
  const [devices, setDevices] = useState(null);
  const [pairedDs, setPairedDs] = useState([]);
  const [foundDs, setFoundDs] = useState([]);
  const [bleOpend, setBleOpend] = useState(false);
  const [loading, setLoading] = useState(true);
  const [boundAddress, setBoundAddress] = useState('');
  const [debugMsg, setDebugMsg] = useState('');
  const [name, setName] = useState('');

  const {colors} = useTheme();

  const { bluetoothInfo, setBlueToothInfo } = useContext(AuthContext);

  useEffect(() => {
    BluetoothManager.isBluetoothEnabled().then(
      (enabled) => {
        setBleOpend(Boolean(enabled));
        setLoading(false);
      },
      (err) => {
        err;
        setLoading(false);
      }
    );

    // Add event listeners based on the platform
    if (Platform.OS === 'ios') {
      // iOS specific event listeners
      const bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
      const deviceAlreadyPairedListener = bluetoothManagerEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
        (rsp) => {
          deviceAlreadyPairedHandler(rsp);
        }
      );
      const deviceFoundListener = bluetoothManagerEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_FOUND,
        (rsp) => {
          deviceFoundHandler(rsp);
        }
      );
      const connectionLostListener = bluetoothManagerEmitter.addListener(
        BluetoothManager.EVENT_CONNECTION_LOST,
        () => {
          setName('');
          setBoundAddress('');
          setBlueToothInfo({
            name: '',
            boundAddress: ''
          })
        }
      );

      return () => {
        // Clean up event listeners on unmount
        // deviceAlreadyPairedListener.remove();
        // deviceFoundListener.remove();
        // connectionLostListener.remove();
      };
    } else if (Platform.OS === 'android') {
      // Android specific event listeners
      const deviceAlreadyPairedListener = DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
        (rsp) => {
          deviceAlreadyPairedHandler(rsp);
        }
      );
      const deviceFoundListener = DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_FOUND,
        (rsp) => {
          deviceFoundHandler(rsp);
        }
        );
      const connectionLostListener = DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_CONNECTION_LOST,
        () => {
          setName('');
          setBoundAddress('');
          setBlueToothInfo({
            name: '',
            boundAddress: ''
          })
        }
      );
      const bluetoothNotSupportListener = DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
        () => {
          ToastAndroid.show('Device Not Support Bluetooth!', ToastAndroid.LONG);
        }
      );

      return () => {
        // Clean up event listeners on unmount
        // deviceAlreadyPairedListener.remove();
        // deviceFoundListener.remove();
        // connectionLostListener.remove();
        // bluetoothNotSupportListener.remove();
      };
    }
  }, []);

  const deviceAlreadyPairedHandler = (rsp) => {
    let ds = null;
    if (typeof rsp.devices === 'object') {
      ds = rsp.devices;
    } else {
      try {
        ds = JSON.parse(rsp.devices);
      } catch (e) {
        // Ignore
      }
    }
    if (ds && ds.length) {
      setPairedDs((prevPairedDs) => prevPairedDs.concat(ds || []));
    }
  };

  const deviceFoundHandler = (rsp) => {
    let r = null;
    try {
      if (typeof rsp.device === 'object') {
        r = rsp.device;
      } else {
        r = JSON.parse(rsp.device);
      }
    } catch (e) {
      // Ignore
    }

    if (r) {
      setFoundDs((prevFoundDs) => {
        let found = prevFoundDs || [];
        if (found.findIndex) {
          let duplicated = found.findIndex((x) => x.address === r.address);
          // CHECK DUPLICATED HERE...
          if (duplicated === -1) {
            found.push(r);
          }
        }
        return found;
      });
    }
  };

  const renderRow = (rows) => {
    let items = [];
    for (let i in rows) {
      let row = rows[i];
      if (row.address) {
        items.push(
          <TouchableOpacity
            key={new Date().getTime() + i}
            style={styles.wtf}
            onPress={() => {
              setLoading(true);
              BluetoothManager.connect(row.address)
                .then(
                  (s) => {
                    setLoading(false);
                    setBoundAddress(row.address);
                    setName(row.name || 'UNKNOWN');
                    setBlueToothInfo({
                        name: row.name || 'UNKNOWN',
                        boundAddress: row.address
                    });
                    // navigation.navigate("GeneratedPermitSlip");
                  },
                  (e) => {
                    setLoading(false);
                    alert(e);
                  }
                );
            }}
          >
            <Text style={styles.name}>{row.name || 'UNKNOWN'}</Text>
            <Text style={styles.address}>{row.address}</Text>
          </TouchableOpacity>
        );
      }
    }
    return items;
  };

  const enableBluetooth = (v) => {
    setLoading(true);
    if (!v) {
      BluetoothManager.disableBluetooth().then(() => {
        setBleOpend(false);
        setLoading(false);
        setFoundDs([]);
        setPairedDs([]);
      }, (err) => {
        alert(err);
        setLoading(false);
      });
    } else {
      BluetoothManager.enableBluetooth().then(
        (r) => {
          var paired = [];
          if (r && r.length > 0) {
            for (var i = 0; i < r.length; i++) {
              try {
                paired.push(JSON.parse(r[i]));
              } catch (e) {
                // Ignore
                // setLoading(false);
              }
            }
          }
          setBleOpend(true);
          // setLoading(false);
          setPairedDs(paired);
        },
        (err) => {
          setLoading(false);
          alert(err);
        }
      );
    }
  };

  const scan = () => {
    setLoading(true);
    BluetoothManager.scanDevices()
      .then((s) => {
        var ss = s;
        var found = ss.found;
        alert('found ', found);
        try {
          found = JSON.parse(found); // @FIX_it: the parse action too weired..
        } catch (e) {
          // Ignore
          setLoading(false);
        }
        var fds = foundDs;
        if (found && found.length) {
          fds = found;
        }
        setFoundDs(fds);
        setLoading(false);
      },
      (er) => {
        setLoading(false);
        alert('error 123' + JSON.stringify(er));
      }
    );
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.onError,
    },
    title: {
      width: width,
      backgroundColor: colors.background,
      color: colors.primary,
      paddingLeft: 8,
      paddingVertical: 4,
      textAlign: 'left',
    },
    wtf: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    name: {
      flex: 1,
      textAlign: 'left',
    },
    address: {
      flex: 1,
      textAlign: 'right',
    },
  });

  return (
    <ScrollView style={styles.container}>
      <Text>{debugMsg}</Text>
      <Text style={styles.title}>
        Blutooth Opended:{bleOpend ? 'true' : 'false'} <Text>Open BLE Before Scanning</Text>
      </Text>
      <View>
        <Switch
          value={bleOpend}
          onValueChange={(v) => enableBluetooth(v)}
        />
        <Button
          disabled={loading || !bleOpend}
          onPress={scan}
          title="Scan"
        />
      </View>
      <Text style={styles.title}>Connected:<Text style={{ color: 'blue' }}>{!name ? 'No Devices' : name}</Text></Text>
      <Text style={styles.title}>Found(tap to connect):</Text>
      {loading ? (<ActivityIndicator animating={true} />) : null}
      <View style={{ flex: 1, flexDirection: 'column' }}>
        {renderRow(foundDs)}
      </View>
      <Text style={styles.title}>Paired:</Text>
      {loading ? (<ActivityIndicator animating={true} />) : null}
      <View style={{ flex: 1, flexDirection: 'column' }}>
        {renderRow(pairedDs)}
      </View>
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 30 }}>
        <Button
          disabled={loading || !(bleOpend && boundAddress.length > 0)}
          title="ESC/POS"
          onPress={() => {
            // Handle ESC/POS button press
            navigation.navigate("escPrinter");
          }}
        />
        <Button
          disabled={loading || !(bleOpend && boundAddress.length > 0)}
          title="TSC"
          onPress={() => {
            // Handle TSC button press
            navigation.navigate("tscPrinter");
          }}
        />
      </View> */}
    </ScrollView>
  );
}


