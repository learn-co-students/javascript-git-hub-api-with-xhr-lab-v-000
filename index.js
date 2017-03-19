function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-username="' + r.owner.login + '" data-repository="'+ r.name +'" onclick="getCommits(this)">Get Commits</a> - <a href ="#" data-username="' + r.owner.login + '" data-repository="'+ r.name +'" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send()
}

function displayCommits() {
  var commits = JSON.parse(this.responseText)
  console.log(commits)
  const commitList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitList
}

function getCommits(el) {
  const username = el.dataset.username
  const repository = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/commits')
  req.send()
}

function displayBranches() {
  var branches = JSON.parse(this.responseText)
  console.log(branches)
  const branchList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchList
}

function getBranches(el) {
  const username = el.dataset.username
  const repository = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/branches')
  req.send()
}