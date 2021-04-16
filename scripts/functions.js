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
        host: "Ali",
        name: "Teaching you how to fix your laptop",
        type: "technical",
        picture: "laptop.jpg",
        description: "I will teach you how to fix all types of computers"
    });
    servicesRef.add({
        host: "Jeff",
        name: "Teaching you how to video edit",
        type: "video",
        picture: "video.jpg",
        description: "I will teach you professional cinematic video editing"
    });
    servicesRef.add({
        host: "Garrett",
        name: "Teaching you how to play the guitar",
        type: "music",
        picture: "guitar.jpg",
        description: "I will teach you how to play your favourite songs"
    });
    servicesRef.add({
        host: "Jason",
        name: "Teaching you how to play the piano",
        type: "music",
        picture: "piano.jpg",
        description: "I will teach you how to compose your own music"
    });
}
//writeServices();

function writeLessons() {
    var lessonsRef = db.collection("lessons");
    lessonsRef.add({
        number: "001",
        name: "Teaching you how to translate English to French",
        type: "translation",
        price: 50,
        picture: "translate.jpg",
    });
    lessonsRef.add({
        number: "002",
        name: "Teaching you how to design a website",
        type: "design",
        price: 100,
        picture: "web.jpg",
    });
    lessonsRef.add({
        number: "003",
        name: "Teaching you how to model your business",
        type: "business",
        price: 150,
        picture: "guitar.jpg",
    });
    lessonsRef.add({
        number: "004",
        name: "Teaching you how to cook",
        type: "cooking",
        price: 200,
        picture: "piano.jpg",
    });
}
//writeLessons();

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