function getRepositories() {
  const req = new XMLHttpRequest()
  var user = document.getElementById("username").value
  req.addEventListener("load", showRepositories);
  req.open("GET", `https://api.github.com/users/${user}/repos`)
  req.send()
}

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + '</li>').join('')}</ul>`
  document.getElementById('repositories').innerHTML += repoList
}
