function sayHello() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here. 
            console.log(user.uid);
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().name;
                    console.log(n);
                    //using jquery
                    $("#username").text(n);
                    //using vanilla javascript
                    //document.getElementById("username").innerText = n;
                })
        } else {
            // No user is signed in.
        }
    });
}

function writeServices() {
    var servicesRef = db.collection("services");
    servicesRef.add({
        num: 1,
        host: "Ali",
        name: "Teaching you how to fix your laptop",
        type: "technical",
        picture: "laptop.jpg",
        description: "I will teach you how to fix all types of computers"
    });
    servicesRef.add({
        num: 2,
        host: "Jeff",
        name: "Teaching you how to video edit",
        type: "video",
        picture: "video.jpg",
        description: "I will teach you professional cinematic video editing"
    });
    servicesRef.add({
        num: 3,
        host: "Garrett",
        name: "Teaching you how to play the guitar",
        type: "music",
        picture: "guitar.jpg",
        description: "I will teach you how to play your favourite songs"
    });
    servicesRef.add({
        num: 4,
        host: "Jason",
        name: "Teaching you how to play the piano",
        type: "music",
        picture: "piano.jpg",
        description: "I will teach you how to compose your own music"
    });
}
//writeServices();

function servicesQuery() {
    db.collection("services")
        .get()
        .then(function (snap) {
            snap.forEach(function (doc) {
                console.log(doc.data());
                var title = doc.data().name; //key "name"
                var pic = doc.data().picture; //key "picture"
                var desc = doc.data().description;
                var person = doc.data().host;

<<<<<<< HEAD
                // construct the string for card
                var codestring = '<br />' + '<div class="card">' +
                    '<img src="images/' + pic + '" class="card-img-top">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title">' + title + '</h5>' +
                    '<p class="card-text">' + desc + '</p>' +
                    '<p class="card-text"><small class="text-muted">Hosted by ' + person + '</small></p>' +
                    '</div>';
                // append with jquery to DOM
                $("#services-go-here").prepend(codestring);
=======
                    // construct the string for card
                    var codestring = '<br />' + '<div class="card">' +
                        '<img src="images/' + pic + '" class="card-img-top">' +
                        '<div class="card-body">' +
                        '<h5 id="product" class="card-title">' + title + '</h5>' +
                        '<p class="card-text">' + desc + '</p>' +
                        '<p class="card-text"><small class="text-muted">Hosted by '+ person + '</small></p>' +
                        '</div>';
                    // append with jquery to DOM
                    $("#services-go-here").prepend(codestring);
                })
>>>>>>> b9e3c09f1fec9608379574c8ef984a5e11f65fba
            })
        })
}
//servicesQuery();

function getSearch() {
    document.getElementById("search").addEventListener('click', function () {
        var service = document.getElementById("searchBar").value;
        console.log(service);

        //read services collection from firestore, with query
        db.collection("services")
            .where("type", "==", service)
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    console.log(doc.data());
                    var title = doc.data().name; //key "name"
                    var pic = doc.data().picture; //key "picture"
                    var desc = doc.data().description;
                    var person = doc.data().host;

                    // construct the string for card
                    var codestring = '<br />' + '<div class="card">' +
                        '<img src="images/' + pic + '" class="card-img-top">' +
                        '<div class="card-body">' +
                        '<h5 class="card-title">' + title + '</h5>' +
                        '<p class="card-text">' + desc + '</p>' +
                        '<p class="card-text"><small class="text-muted">Hosted by ' + person + '</small></p>' +
                        '</div>';
                    // append with jquery to DOM
                    $("#cards-go-here").prepend(codestring);
                })
            })
    })
}
//getSearch();

<<<<<<< HEAD
function submit() {
    document.getElementById("submission").addEventListener('click', function () {
        var aboutMe = document.getElementById("about").value;
        console.log(aboutMe);
        var myServices = document.getElementById("your-services").value;
        console.log(myServices);

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                // Do something for the user here. 
                console.log(user.uid);
                db.collection("users").doc(user.uid)
                    .get()
                    .then(function (doc) {
                        var usersRef = db.collection("users").doc(user.uid);
                        usersRef.set({
                            about: aboutMe,
                            mystuff: myServices
                        }, {merge: true
                        })
                    })
            } else {
                // No user is signed in.
            }
        });

    })
}
//submit();

function getLessons() {
    db.collection("lessons")
        //.limit(2)
        //.orderBy("price")
        //.orderBy("price", "desc")
        .get()
        .then(function (snap) {
            snap.forEach(function (doc) {
                var num = doc.data().number;
                var pic = doc.data().picture;
                var title = doc.data().name;

                var newdom = '<div class="card">' + '<div class="card-header">' +
                    '<b>Lesson Number</b>' + num + '</div><div class="card-body">' +
                    '<img src="images/' + pic + '"alt="..." class="img-thumbnail">' +
                    title + '</div>';

                $("#lessons-go-here").prepend(newdom);

            })
        })
}
//getLessons();
=======
function getServices() {
        db.collection("services")
            .orderBy("num", "desc")
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    var n = doc.data().num;
                    var pic = doc.data().picture;
                    var title = doc.data().name;

                    var newdom = '<div class="card">' + '<div class="card-header">'
                        + '<b>Lesson Number</b> ' + n + '</div><div class="card-body">'
                        + '<img src="images/' + pic + '"alt="..." class="img-thumbnail">'
                        + title + '</div>';
                    
                    

                    $("#services-go-here").prepend(newdom);
                    
                })
            })
    }
//getServices();

>>>>>>> b9e3c09f1fec9608379574c8ef984a5e11f65fba
