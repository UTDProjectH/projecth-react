import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCfkBsk-wraKbR5uGy1jd9oEbf9ZCiONLU",
    authDomain: "projecth-589ec.firebaseapp.com",
    databaseURL: "https://projecth-589ec-default-rtdb.firebaseio.com",
    projectId: "projecth-589ec",
    storageBucket: "projecth-589ec.appspot.com",
    messagingSenderId: "78549388378",
    appId: "1:78549388378:web:9eebaa848aaafba390dc63",
    measurementId: "G-PNSM1FNRLX"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

document.querySelector('#login-button').addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var userEmail = document.getElementById("login_email_field").value;
    var userPass = document.getElementById("login_password_field").value;

    signInWithEmailAndPassword(auth, userEmail, userPass).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
    });
})

document.querySelector('#signup-button').addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var userEmail = document.getElementById("signup_email_field").value;
    var userPass = document.getElementById("signup_password_field").value;

    createUserWithEmailAndPassword(auth, userEmail, userPass).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
    });
})

document.querySelector('#logout_button').addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    signOut(auth);

    hideAll();
    document.getElementById("home_div").style.display = 'block';

})

document.querySelector('#login-view-button').addEventListener('click', function (e) {
    hideAll();
    document.getElementById("login_div").style.display = 'block';
})

document.querySelector('#signup-view-button').addEventListener('click', function (e) {
    hideAll();
    document.getElementById("signup_div").style.display = 'block';
})

onAuthStateChanged(auth, (user) => {
    hideAll();
    if(user != null) {
        document.getElementById("user_div").style.display = 'block';
    } else {
        document.getElementById("home_div").style.display = 'block';
    }
    console.log(user);
})


function hideAll() {
    var elems = document.getElementsByClassName('main-div')
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        elem.style.display = 'none';
    }

    var elems = document.getElementsByClassName('loggedin-div')
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        elem.style.display = 'none';
    }
}

