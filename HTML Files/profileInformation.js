/*jslint esnext:true*/

function dietaryRestrictions() {
    let result = "";
    let search = "";
    for (let i=1; i<=5; i++) {
        search = "diet" + i;
        let checkbox = document.getElementById(search)
        if (checkbox.checked)
            result += checkbox.name + " ";
    }
    console.log(result);
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
    console.log(result);
}