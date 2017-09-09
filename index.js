function getRepositories() {
  var username = document.getElementById('username').value
  var url = 'https://api.github.com/users/' + username + '/repos'
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", url)
  req.send()
  return false
}

function displayRepositories() {

  var repos = JSON.parse(this.responseText)
  console.log(repos)
  var username = repos[0].owner.login
  //var html_url = repos[0].html_url
  const repoList = `<ul><li>${username}</li>${repos.map(r => '<li><a href="' + r.html_url + '">' + r.name + '</a> - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a>' + '</a> - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a>' + '</li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = (el.dataset.repository || el.dataset.repo)
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  var username = document.getElementById('username').value
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList =  `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + " - " + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const name = (el.dataset.repository || el.dataset.repo)
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  var username = document.getElementById('username').value
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/branches')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  debugger
  const branchList = `<ul>${branches.map(branch => '<li><strong>' + branch.name  + '</strong>' + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchList;
}
