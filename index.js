function getRepositories(form) {
  let username = form.username.value
  let request = new XMLHttpRequest
  request.open("GET", "https://api.github.com/users/" + username + "/repos");
  request.addEventListener('load', showRepositories);
  request.send();
}


function showRepositories(event, data) {
  console.log("hi")
  alert('hi')
}
