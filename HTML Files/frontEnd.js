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
    callStr += '&number=2';
    console.log(callStr);
   

    let object; 

    fetch(callStr)
        .then(res => res.json())
        .then(data => {
        console.log(data); // Log the data if needed
  
        // Store the JSON object in the variable 'object'
        object = data;
  
        // Now you can use the 'object' variable here or pass it to other functions
        console.log(object.results[0].image);
        loadImages(object)
    })

    
}

function loadImages(object) {

    console.log(object);
    let l = object.results.length

    let imageTable = document.getElementById("recipeImages");
    let tableHTML = "<table>\n\t<tr>\n\t\t";
    let imageURL = "";

    for (let i=0; i<l; i++) {
        imageURL = object.results[i].image;
        tableHTML += "<td><img src=\"";
        tableHTML += imageURL;
        tableHTML += "\" /></td>"
    }

    // End the table
    tableHTML += "</tr>\n </table>";
    // Add the table HTML
    imageTable.innerHTML = tableHTML;

}