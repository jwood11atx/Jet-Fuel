const getFolders = () => {
  return fetch("http://localhost:3000/folders").then(res => res.json());
};

const postFolder = (folder_name) => {
  return fetch("http://localhost:3000/folders", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({folder_name})
        }).then(res => res.json());
};

const getURLs = () => {
  return fetch(`http://localhost:3000/folders/${selected.id}`)
    .then(res => res.json());
};

const postURL = (folder_id, url, website_name) => {
  return fetch(`http://localhost:3000/folders/${folder_id}/urls`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({url, website_name})
        }).then(res => res.json());
};

const patchURL = (id, key, value) => {
  fetch(`http://localhost:3000/urls/${id}`, {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({key, value})
  });
};
