// set up firebase backend connection

const firebaseConfig = {
    apiKey: "AIzaSyAb0NvP38GJywHwxysYLjFjtzvjdP2Jvpc",
    authDomain: "service-application-aac6d.firebaseapp.com",
    databaseURL: "https://service-application-aac6d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "service-application-aac6d",
    storageBucket: "service-application-aac6d.appspot.com",
    messagingSenderId: "476662918265",
    appId: "1:476662918265:web:672d6b7cab0a0d3a2138a8",
    measurementId: "G-6FPWP8SW2B"
    };
    firebase.initializeApp(firebaseConfig);
    
  // make authentication and firestore references
    const auth = firebase.auth();
    const db = firebase.firestore();
    db.settings({timestampsInSnapshots: true});


  // setup materialize javascript components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  

  
});
  

 



