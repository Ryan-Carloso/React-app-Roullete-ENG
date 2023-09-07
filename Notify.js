import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';


function Notify() {
  const bodyText = [
    'Le jeu de la roulette !',
    'Une journée parfaite pour gagner !',
    'Je veux gagner !',
    'Le jeu qui paie les loyers !',
    'Recevez un bonus sur votre premier dépôt !',
    'Inscrivez-vous et commencez à jouer !',
  ];
  const NameText = ['Martin', 'Thomas', 'Bernard', 'Louise', 'Richard', 'Rose', 'Chloé', 'Petit'];

  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      try {
        const { status } = await Notifications.requestPermissionsAsync();

        if (status !== 'granted') {
          console.log('Permission for notifications not granted!');
          return;
        }

        // Set the notification handler to handle notifications when they are received
        Notifications.setNotificationHandler({
          handleNotification: async (notification) => {
            // This function will be called when a notification is received
            console.log('Received notification - Title:', notification.request.content.title);
            console.log('Received notification - Body:', notification.request.content.body);
            // Add more specific properties as needed
            return {
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: false,
            };
          },
        });

        // Function to add minutes to a given time
        function addMinutesToTime(time, minutes) {
          return new Date(time.getTime() + minutes * 60000); // 60000 milliseconds in a minute
        }

        // When the app is opened (you can place this code where your app initialization happens)
          const now = new Date(); // Current time
          const targetTime = addMinutesToTime(now, 1); // Add 5 minutes to the current time
          
          const timeUntilNotification = targetTime.getTime() - now.getTime();
          
          setTimeout(() => {
            sendNotification("Hé, n'oubliez pas !", "Les gains vous attendent ! Cliquez ici et inscrivez-vous dès maintenant pour obtenir 100 % sur votre premier dépôt !");
          }, timeUntilNotification);

          
        // Schedule notifications loop with the specified interval
        //const notificationInterval = 5 * 60 * 60 * 1000; // 5 hour's in milliseconds
        const notificationInterval = 5 * 60 * 1000; // 5 hour's in milliseconds

        function scheduleNotificationsLoop() {
          setTimeout(() => {
            sendNotification("The Roulette Game!", getRandomMessage1());
            setTimeout(() => {
              sendNotification(getRandomTitle(), getRandomMessage2());
              setTimeout(() => {
                sendNotification(getRandomTitle(), getRandomMessage3());
                setTimeout(() => {
                  sendNotification(getRandomTitle(), getRandomMessage4());
                  // Call the function again to keep the loop going
                  scheduleNotificationsLoop();
                }, notificationInterval);
              }, notificationInterval);
            }, notificationInterval);
          }, notificationInterval);
        }

        // Start the notifications loop
        scheduleNotificationsLoop();
      } catch (error) {
        console.log('Error requesting notification permissions:', error);
      }
    }

    registerForPushNotificationsAsync();
  }, []);

  async function sendNotification(title, body) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        sound: true,
      },
      trigger: null, // Trigger is set to null to send the notification immediately
    });

    console.log('Notification sent!');
  }

  function getRandomTitle() {
    const randomString = bodyText[Math.floor(Math.random() * bodyText.length)];
    return randomString;
  }

function getRandomMessage1() {
  const randomNumber = generateRandomNumber();
  const name = NameText[Math.floor(Math.random() * NameText.length)];
  return name + " a remporté " + randomNumber + " € juste maintenant en jouant à ce jeu ! Faites un dépôt et obtenez un bonus de 100 % !";
}

function getRandomMessage2() {
  const randomNumber1 = generateRandomNumber1();
  const randomEuros2x = generateEuros2x();
  return "un total de " + randomNumber1 + " joueurs ont gagné " + randomEuros2x + " € en jouant simplement à ce jeu ! Cliquez ici et commencez dès maintenant !";
}

function getRandomMessage3() {
  const randomNumber = generateRandomNumber();
  return "Cliquez ici pour vous inscrire au jeu dès aujourd'hui et recevoir un bonus de 100 % sur votre dépôt ! Aujourd'hui, un total de " + randomNumber + " personnes gagnent avec ce jeu !";
}

function getRandomMessage4() {
  const name = NameText[Math.floor(Math.random() * NameText.length)];
  const randomNumber = generateRandomNumber();
  return "Inscrivez-vous dès aujourd'hui, cliquez ici pour commencer à gagner en jouant avec cette application ! Obtenez un bonus sur votre premier dépôt, comme " + name + " qui a gagné " + randomNumber + " € aujourd'hui !";
}


  function generateRandomNumber() {
    const min = 7000;
    const max = 40000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateRandomNumber1() {
    const min = 40;
    const max = 150;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateEuros2x() {
    const min = 7000;
    const max = 40000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return null; // You can return any JSX here or just `null` if you don't want to render anything
}

export default Notify;
