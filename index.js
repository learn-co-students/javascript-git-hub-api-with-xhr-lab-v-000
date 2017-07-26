function getRepositories(){
  const username = document.getElementById("username").value

  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send();
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)

  const repoList = `<ul>${repos.map(r => '<li>' +
   r.name + ' - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">' + r.html_url + '</a>'+ ' - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">' + "Get BRANCH" + '</a>'+'</li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(elm) {
  const repoName = elm.dataset.repository
  const username = elm.dataset.username

  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repoName + '/commits' )
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  debugger;
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(elm) {
  const repoName = elm.dataset.repository

  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayBranches)
  xhr.open("GET", "https://api.github.com/repos/" + elm.dataset.username + "/" + repoName + "/branches")
  xhr.send()
}
function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
