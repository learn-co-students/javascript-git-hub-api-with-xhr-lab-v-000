const root = "https://api.github.com/";

function displayRepositories(event, data) {

  var repos = JSON.parse(this.responseText);
  console.log(this.responseText);
  const repoList = `<ul>${repos.map( r =>
    '<li> <h3><a href="'+ r.html_url +'">' + r.name + '</a></h3>' +
    ' <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a><br><a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a</li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList;
}

function getRepositories() {
  const username = document.getElementById("username").value;
  const uri = root + 'users/' + username + '/repos';
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", uri);
  req.send();
}


function getCommits(el) {
  const repo = el.dataset.repository;
  const username = el.dataset.username;
  const uri = root + "repos/" + username + "/" + repo + '/commits';
  console.log(uri);
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", uri);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + ' (' + commit.commit.author.name + ')</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const repo = el.dataset.repository
  const username = el.dataset.username;
  const uri = root + "repos/" + username + "/" + repo + "/branches"
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayBranches)
  xhr.open("GET", uri)
  xhr.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = branchesList;
}
