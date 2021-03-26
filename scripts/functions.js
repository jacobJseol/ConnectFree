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