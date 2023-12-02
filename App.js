import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable
} from 'react-native';



import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const context1 = React.createContext(null); 
const context2 = React.createContext(null);

const Stack = createNativeStackNavigator();

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('User Details')}>
        <Text style={styles.text}>User Details</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('User Address')}>
        <Text style={styles.text}>User Address</Text>
      </Pressable>
    </View>
  );
};


const UserDetails = ({ navigation }) => {
  const context = React.useContext(context1);
  return (

    
    <View style={styles.wrapper}>
      <Text style={styles.box}>{context.name}</Text>
      <Text style={styles.box}>{context.reg}</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Update Details')}>
        <Text style={styles.text}>Update Details</Text>
      </Pressable>
    </View>
    
  );
};

const Update = ({ navigation }) => {
  const context = React.useContext(context1);

  const [name, setName] = useState();
  const [reg, setReg] = useState();

  return (
    <View style={styles.wrapper}>
      <Text style={{ fontWeight: 700 }}>Update Values</Text>

      <TextInput
        placeholder="Change name"
        onChangeText={(txt) => setName(txt)}
        style={styles.box}
      />

      <TextInput
        placeholder="Change Registration Number"
        onChangeText={(txt) => setReg(txt)}
        style={styles.box}
      />

      <Pressable
        style={styles.button}
        onPress={() => context.setData(name, reg)}>
        <Text style={styles.text}>Update</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.text}>Back</Text>
      </Pressable>
    </View>
  );
};


const UserAddress = ({ navigation }) => {
  const contextAddress = React.useContext(context2);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.box}>{contextAddress.city}</Text>
      <Text style={styles.box}>{contextAddress.province}</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Update Address')}>
        <Text style={styles.text}>Update Details</Text>
      </Pressable>
    </View>
  );
};

const UpdateAddress = ({ navigation }) => {
  const contextAddress = React.useContext(context2);

  const [city, setCity] = useState();
  const [province, setProvince] = useState();

  return (
    <View style={styles.wrapper}>
      <Text style={{ fontWeight: 700 }}>Update Values</Text>

      <TextInput
        placeholder="Change City"
        onChangeText={(txt) => setCity(txt)}
        style={styles.box}
      />

      <TextInput
        placeholder="Change Province"
        onChangeText={(txt) => setProvince(txt)}
        style={styles.box}
      />

      <Pressable
        style={styles.button}
        onPress={() => contextAddress.setData1(city,province)}>
        <Text style={styles.text}>Update</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.text}>Back</Text>
      </Pressable>
    </View>
  );
};



const App = () => {
  const [personInfo, setPersonInfo] = useState({
    name: 'Rida Zainab',
    reg: 'FA20-BCS-125',
  });

  const [personAddress, setPersonAddress] = useState({
    city: 'Islamabad',
    province: 'Federal',
  });

  const context1Setters = { setData };

  const context2Setters = { setData1 };

  
  function setData(name, reg) {
    const updatedpersonInfo = { ...personInfo, name, reg };
    setPersonInfo(updatedpersonInfo);
  }

  function setData1(city, province) {
    const updatedAddress = { ...personAddress, city, province };
    setPersonAddress(updatedAddress);
  }

  return (
    <>
      <context1.Provider value={{ ...personInfo, ...context1Setters }}>
       <context2.Provider value={{ ...personAddress, ...context2Setters }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="User Details" component={UserDetails} />
            <Stack.Screen name="Update Details" component={Update} />
            <Stack.Screen name="User Address" component={UserAddress} />
             <Stack.Screen name="Update Address" component={UpdateAddress} />
          </Stack.Navigator>
        </NavigationContainer>
         </context2.Provider>
      </context1.Provider>
    </>
  );
};



const styles = StyleSheet.create({
  box: {
    margin: 6,
    fontWeight: 500,
    width: 200,
    backgroundColor: '#0001',
    textAlign: 'center',
    height: 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#2E1A47',
    margin: 10,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});



export default App;
