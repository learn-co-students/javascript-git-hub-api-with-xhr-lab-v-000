function getRepositories() {
  var name = document.getElementById("username").value
  var url = "https://api.github.com/users/" + name + "/repos"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", url)
  req.send()
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + " " + r.owner.login + " " + r.html_url + ' - <a href="#" data-username="' + username.value + '" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>' + ' - <a href="#" data-username="' + username.value + '" data-repository="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  url = "https://api.github.com/repos/" + el.dataset.username + "/" + name + "/commits"
  req.open("GET", url)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li>' + commit.commit.author.name + ' (' + commit.author.login + ')'+ commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const req = new XMLHttpRequest()
  var name = el.dataset.repository
  req.addEventListener("load", displayBranches)
  url = "https://api.github.com/repos/" + el.dataset.username + "/" + name + "/branches"
  req.open("GET", url)
  req.send()
}

function displayBranches(el) {
  var branches = JSON.parse(this.responseText)
  console.log(branches)
  const branchList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchList
}
