/*jslint esnext:true*/

/* Get Search Query from HTML page, then call 
Spoonacular API to get list of recipes */

/*let searchFor = document.getElementById("searchFor").value;*/

/*let searchBtn = document.getElementById("searchBtn");*/

function callAPI() {
    let searchFor;
    if (document.getElementById("searchFor").value != null) {
        searchFor = document.getElementById("searchFor");
    } else {
        searchFor = null;
    }

    console.log(searchFor.value);
    str = searchFor.value;

    /* PUT YOUR OWN API KEY HERE */
    let apiKey = ;
    callStr = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=' + apiKey;
    callStr += '&query=' + str;
    console.log(callStr);
   
    fetch(callStr)
        .then(res => res.json())
        .then(data => console.log(data))
}