function getRepositories(){
  username = document.getElementById("username").value

  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send();
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">' + r.html_url + '</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
  debugger;
}

function getCommits(elm) {
  const name = elm.dataset.repo
  debugger;
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/repos')

  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}
