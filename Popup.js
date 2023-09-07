import React, { useEffect } from 'react';
import { Modal, View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Linking } from 'react-native';

const Popup = ({ visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        onClose();
      }, 10000); // 20,000 milliseconds = 20 seconds

      return () => clearTimeout(timeout);
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  const handleClosePopup = () => {
    onClose();
  };

  const handleOpenLink = () => {
    const url = 'https://afonsocosta.shop/fr-popup';
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.error('Cannot open URL:', url);
        }
      })
      .catch((error) => {
        console.error('Error opening URL:', error);
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClosePopup}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={handleClosePopup} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenLink}>
          <Image source={require('./assets/POP-UP.png')} style={styles.image} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 170,
    right: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Popup;
