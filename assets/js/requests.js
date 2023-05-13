// CRUD

// Create => POST
// Read => GET
// Update => PUT / PATCH
// Delete => DELETE

// // GET
// async function getData(url) {
//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

//   if (!response.ok) throw Error(response.status);
//   //console.log(response);
//   return response.json();
// }

// getData('https://jsonplaceholder.typicode.com/posts')
//   .then((data) => console.log(data))
//   .catch(console.log);

// // POST
// async function postData(url, data) {
//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   });

//   if (!response.ok) throw Error(response.status);
//   //console.log(response);
//   return response.json();
// }

// postData('https://jsonplaceholder.typicode.com/posts', {
//   title: 'Title of my post',
//   description: 'Description text',
//   text: 'Some text'
// })
//   .then((data) => console.log(data))
//   .catch(console.log);

// PUT
async function putData(url, data) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw Error(response.status);
  //console.log(response);
  return response.json();
}

putData('https://jsonplaceholder.typicode.com/posts/11', {
  title: 'Title of my post',
  description: 'Description text',
  text: 'Some text'
})
  .then((data) => console.log(data))
  .catch(console.log);