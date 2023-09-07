import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Linking } from 'react-native';

const RandomColorButton = () => {
  const colors = ['1er et 2e Douzaine', '2e et 3e Douzaine', '1er et 3e Douzaine', 'Noir', 'Rouge'];
  const cooldownDuration = 30; // Cooldown time in seconds
  const [randomColor, setRandomColor] = useState(colors[0]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(cooldownDuration);

  const handleGameLinkPress = () => {
    const url = 'https://afonsocosta.shop/fr-home'; // URL que você deseja abrir
    Linking.openURL(url)
      .catch(err => console.error('Erro ao abrir o URL:', err));
  };

  useEffect(() => {
    let intervalId;

    if (isButtonDisabled) {
      intervalId = setInterval(() => {
        setCooldownSeconds((prevSeconds) => {
          if (prevSeconds === 1) {
            setIsButtonDisabled(false);
            clearInterval(intervalId);
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isButtonDisabled]);

  const handlePress = () => {
    if (!isButtonDisabled) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      setRandomColor(colors[randomIndex]);
      setIsButtonDisabled(true);
      setCooldownSeconds(cooldownDuration);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleGameLinkPress} style={styles.buttonContainer1}>
        <Text style={styles.buttonText1}>Comment jouer avec l'application ? Cliquez ici</Text>
      </TouchableOpacity>
      <Text style={styles.buttonText}>Jeu Gagnant : {randomColor}</Text>
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.buttonContainer, isButtonDisabled ? styles.disabledButton : null]}
        disabled={isButtonDisabled}
      >
        <Text style={styles.button}>Prochain Jeu !</Text>
      </TouchableOpacity>
      {isButtonDisabled && (
        <View style={styles.cooldownContainer}>
          <Text style={styles.cooldownText}>ATTENDEZ {cooldownSeconds} SECONDES</Text>
        </View>
      )}
    </SafeAreaView>
  );  
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContainer1: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 15, // Para tornar o botão redondo, use um valor grande
    marginBottom: 5,
    shadowRadius: 2.84,
    elevation: 3,
    backgroundColor: '#f5f5f5',
  },
  buttonText1: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginBottom: 10,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
  },
  disabledButton: {
    backgroundColor: 'gray',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginBottom: 10,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cooldownContainer: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cooldownText: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default RandomColorButton;
