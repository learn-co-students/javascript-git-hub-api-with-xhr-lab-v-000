function displayRepositories(event, data) {
  // this is set to the XMLHttpRequest object that fired the event
  let repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + '- <a href="'+ r.html_url +'"> URL </a> - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  let username = getUserName()
  req.addEventListener("load", displayRepositories)
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + ' - ' + commit.commit.author.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getCommits(el) {
  const repository = el.dataset.repo
  const username = getUserName()
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/` + repository + '/commits')
  req.send()
}

function displayBranches() {
  console.log("you hit the displayBranches function")
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

function getBranches(el) {
  const repository = el.dataset.repo
  const username = getUserName()
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET",  `https://api.github.com/repos/${username}/` + repository + '/branches')
  req.send()
  console.log("you hit the getBranches function")
}

function getUserName() {
  return document.getElementById("username").value
}
