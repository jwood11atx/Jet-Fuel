const getFolders = () => {
  return fetch("http://localhost:3000/folders").then(res => res.json());
};

const postURL = (folder_id, url, website_name) => {
  console.log(website_name);
  return fetch(`http://localhost:3000/folders/${folder_id}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({url, website_name})
  }).then(res => res.json());
};

const patchURL = (views, id) => {
  fetch(`http://localhost:3000/folders/${selected.id}`, {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({views, id})
  })
}
