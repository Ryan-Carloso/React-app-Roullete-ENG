import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import RandomColorButton from './RandomColorButton';
import Notify from './Notify';
import Popup from './Popup';
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {
  const websiteUrl = 'https://rokubet42.com/';
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios.post(`https://app.nativenotify.com/api/analytics`, {
         app_id: 9950,
         app_token: '1hjvHlzzjyDWXhb88rfTqN',
         screenName: 'Home'
     });

    
    // Function to check the popup count and show/hide the popup accordingly
    const checkPopupCount = async () => {
      try {
        const popupCount = await AsyncStorage.getItem('popupCount');
        if (!popupCount) {
          // If it's the first time, set the count to 1 and show the popup
          await AsyncStorage.setItem('popupCount', '1');
          setShowPopup(true);
        } else {
          const count = parseInt(popupCount);
          if (count < 3) {
            // If the count is less than 3, increment the count and show the popup
            await AsyncStorage.setItem('popupCount', (count + 1).toString());
            setShowPopup(true);
          }
        }
      } catch (error) {
        console.error('Error accessing AsyncStorage:', error);
      }
    };

    checkPopupCount();
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.button}>
        <Notify />
        <RandomColorButton />
        <TouchableOpacity onPress={() => setShowPopup(true)}>
          <Text style={styles.buttonText}>Open Popup</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <WebView source={{ uri: websiteUrl }} />

      <Popup visible={showPopup} onClose={handleClosePopup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
