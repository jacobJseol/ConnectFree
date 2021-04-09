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

function writeBalances() {
    var balancesRef = db.collection("balances");
    balancesRef.add({
        balance: 100.00
    });
}
//writeBalances();

function balancesQuery() {
    db.collection("balances")
        .get()
        .then(function (snap) {
            snap.forEach(function (doc) {
                var n = doc.data().balance;
                console.log(n);
                var newdom = "<p>" + "$" + n + "</p>";
                $("#balances-goes-here").append(newdom);
                //document.getElementById("cities-go-here").innerHTML = newdom;
            })
        })
}

function writeServices() {
    var servicesRef = db.collection("services");
    servicesRef.add({
        code: "1",
        name: "Teaching you how to fix your laptop",
        type: "Technical",
        price: 100,
        picture: "laptop.jpeg"
    });
    servicesRef.add({
        code: "2",
        name: "Teaching you how to video edit",
        type: "Video",
        price: 200,
        picture: "video.jpeg"
    });
    servicesRef.add({
        code: "3",
        name: "Teaching you how to play the guitar",
        type: "Music",
        price: 300,
        picture: "guitar.jpeg"
    });
}
//writeServices();

function servicesQuery(){
    db.collection("services")
    //.where("type", "==", "Music")
    //.limit(2)
    .orderBy("code")
    //.orderBy("price")
    //.orderBy("price", "desc")
    .get()
    .then(function(snap){
        snap.forEach(function(doc){
            var n = doc.data().name;
            var p = doc.data().price;
            var pic = doc.data().picture;
            console.log(n);
            var newdom = "<p>" +  n + " " + "$" + p + " " + pic + "</p>";
            $("#services-go-here").append(newdom);
            //document.getElementById("services-go-here").innerHTML = newdom;
        })
    })
}
//servicesQuery();