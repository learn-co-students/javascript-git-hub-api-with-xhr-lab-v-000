var username;

function getRepositories() {
  username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + '<a href="' + r.html_url + '" >' + r.name + '</a> - <a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repository="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

var name;

function getCommits(el) {
  name = el.dataset.repository;
  username = el.dataset.username;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + document.getElementById('username').value + '</strong> - ' + commit.commit.author.name + '<br>' + commit.commit.message + '</li>').join('')}</ul>'`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  var repo = el.dataset.repository;
  const branch = el.dataset.branch
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repo + '/branches')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>'`
  document.getElementById("details").innerHTML = branchesList
}
