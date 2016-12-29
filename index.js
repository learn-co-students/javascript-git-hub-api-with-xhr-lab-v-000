function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  var repoList = `<ul>${repos.map(repo => '<li>' + repo.name + ' - <a href="' + repo.html_url + '">URL</a> - <a href="#" data-repository="' + repo.name + '" data-username="' + repo.owner.login + '" onclick="getCommits(this)">Commits</a></li> - <a href="#" data-repository="' + repo.name + '" data-username="' + repo.owner.login + '" onclick="getBranches(this)">Branches</a></li>').join('')}</ul>`
  document.getElementById('repositories').innerHTML = repoList
}

function displayCommits(event, data) {
  const commits = JSON.parse(this.responseText)
  console.log(this.responseText);
  const commitsList = `<ul>${commits.map(commit => `<li>${commit.commit.committer.name} - ${commit.author.login} - ${commit.commit.message}</li>`).join('')}`
  document.getElementById("details").innerHTML = commitsList
}

function displayBranches(event, data) {
  const branches = JSON.parse(this.responseText)
  console.log(this.responseText);
  const branchesList = `<ul>${branches.map(branch => `<li>${branch.name}</li>`).join('')}`
  document.getElementById("details").innerHTML = branchesList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  const username = document.getElementById('username').value
  req.addEventListener('load', displayRepositories)
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function getCommits(el) {
  const name = el.dataset.repository
  const author = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayCommits)
  req.open("GET", `https://api.github.com/repos/${author}/${name}/commits`)
  req.send()
}

function getBranches(el) {
  const name = el.dataset.repository
  const author = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayCommits)
  req.open("GET", `https://api.github.com/repos/${author}/${name}/branches`)
  req.send()
}
