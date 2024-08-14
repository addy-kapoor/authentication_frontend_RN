import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Button} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the token from local storage
        // const token = localStorage.getItem('authToken');
        const token = await AsyncStorage.getItem('authToken');

        // If no token, handle as needed
        if (!token) {
          setError('No token found');
          return;
        }

        // Make authenticated request
        const response = await axios.get('http://192.168.1.4:8080/auth/test', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        // Set the response data
        setData(response.data);
      } catch (err) {
        // Handle errors
        console.error(
          'Request failed:',
          err.response ? err.response.data : err.message,
        );
        setError('Request failed. Please try again.');
      }
    };

    fetchData();
  }, []);

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {data ? (
            <Text style={styles.dataText}>{JSON.stringify(data)}</Text>
          ) : (
            <Text>Loading...</Text>
          )}
          <Button
            title="Logout"
            onPress={() => {
              // Clear the token from local storage on logout
              localStorage.removeItem('authToken');
              // Optionally navigate to login screen
              // navigation.navigate('LoginScreen');
            }}
          />
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  dataText: {
    fontSize: 16,
    color: 'black',
  },
  errorText: {
    color: 'red',
  },
});
