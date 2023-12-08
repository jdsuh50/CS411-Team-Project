fetch('./config411.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Handle the JSON data here
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });