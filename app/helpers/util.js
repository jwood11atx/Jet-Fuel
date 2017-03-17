const convertDate = (data) => {
  return data.map(urlObj => {
    urlObj.created_at = new Date(urlObj.created_at).getTime();
    return urlObj;
  });
};

const cleanUrl = (url) => {
  if(url.slice(0,7) !== "http://" || url.slice(0,8) !== "https://"){
    return "http://" + url;
  }
};
