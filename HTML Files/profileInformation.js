/*jslint esnext:true*/

/* Functions to save Profile Information */

let d;
let i;
let a;

function dietaryRestrictions() {
    let result = "";
    let search = "";
    for (let i=1; i<=5; i++) {
        search = "diet" + i;
        let checkbox = document.getElementById(search)
        if (checkbox.checked)
            result += checkbox.name + " ";
    }
    d = result;
    console.log(d);
}

function intolerances() {
    let result = "";
    let search = "";
    for (let i=1; i<=12; i++) {
        search = "intolerance" + i;
        let checkbox = document.getElementById(search)
        if (checkbox.checked)
            result += checkbox.name + " ";
    }
    i = result;
    console.log(i);
}

function saveAddress() {
    a = document.getElementById('address').value;
    console.log(a);
}