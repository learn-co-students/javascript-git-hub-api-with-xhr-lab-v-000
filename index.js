function getRepositories() {
  var username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send()
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  console.log(repos)

  const repoList = "<ul>" + repos.map(repo => {
    const dataRepo = 'data-repository"' + repo.name + '"'
    const dataUserName = 'data-username"' + repo.owner.login + '"'
    return (`<li>${repo.name} - <a href="${repo.html_url}">${repo.html_url}</a><br><a href="#" ${dataRepo} ${dataUserName} onclick="getCommits(this)">Get Commits</a><br><a href="#" ${dataRepo} ${dataUserName} onclick="Branches(this)">Get Branches</a></li>`)}).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const repoName = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repoName + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + ' - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const repoName = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repoName + '/branches')
  req.send
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
