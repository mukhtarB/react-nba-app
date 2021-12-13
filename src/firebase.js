import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAcgFmd0AwRF5hCJthkIobWBWRR0DdoPJc",
  authDomain: "nba-react-app-46401.firebaseapp.com",
  databaseURL: "https://nba-react-app-46401-default-rtdb.firebaseio.com",
  projectId: "nba-react-app-46401",
  storageBucket: "nba-react-app-46401.appspot.com",
  messagingSenderId: "128238967683",
  appId: "1:128238967683:web:f47b804b462a10622474b6",
  measurementId: "G-Y3S76FDYXP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const dbArticles = firebaseDB.ref('articles');
const dbTeams = firebaseDB.ref('teams');
const dbVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
    const data = []

    snapshot.forEach(childSnapshot => {
        console.log(childSnapshot.val())
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    });

    return data
}

export {
    firebase,
    firebaseDB,
    dbArticles,
    dbVideos,
    dbTeams,
    firebaseLooper
}