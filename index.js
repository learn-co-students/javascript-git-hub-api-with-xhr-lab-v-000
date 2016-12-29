function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  var repoList = `<ul>${repos.map(repo => '<li>' + repo.name + ' - <a href="' + repo.html_url + '">URL</a> - <a href="#" data-repo="' + repo.name + '" data-author="' + repo.owner.login + '" onclick="getCommits(this)">Commits</a></li>').join('')}</ul>`
  document.getElementById('repositories').innerHTML = repoList
}

function displayCommits(event, data) {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong></strong> - ' + commit.commit.message + '</li>').join('')}`
  document.getElementById("details").innerHTML = commitsList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  const username = document.getElementById('username').value
  req.addEventListener('load', displayRepositories)
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function getCommits(el) {
  const name = el.dataset.repo
  const author = el.dataset.author
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayCommits)
  req.open("GET", `https://api.github.com/repos/${author}/${name}/commits`)
  req.send()
}
