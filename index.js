function getRepositories(el) {
  var userName = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + userName + '/repos');
  req.send();
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  var userName = repos[0]["owner"]["login"];
  const repoList = `${repos.map(r => `https://github.com/${userName}/${r.name}`)}`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const userName = el.dataset.username;
  const repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + userName + '/' + repo + '/commits');
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commit = '/' + commits[0].author.login + '/' + commits[0].commit.author.name + '/' + commits[0].commit.message + '/';
  document.getElementById("details").innerHTML = commit
}

function getBranches(el) {
  var userName = el.dataset.username;
  var repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + userName + '/' + repo + '/branches');
  req.send()
}

function displayBranches(el) {
  const commit = JSON.parse(this.responseText);
  const branch = '/' + commit[0].name + '/';
  document.getElementById('details').innerHTML += branch
}


