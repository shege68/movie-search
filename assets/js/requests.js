// CRUD

// Create => POST
// Read => GET
// Update => PUT / PATCH
// Delete => DELETE

// GET
async function getData(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) throw Error(response.status);
  //console.log(response);
  return response.json();
}

getData('https://jsonplaceholder.typicode.com/posts')
  .then((data) => console.log(data))
  .catch(console.log);