function displayBranches(el) {
  const branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>')}`
  document.getElementById("details").innerHTML = branchList
}

//"http://api.github.com/repos/octocat/Hello-World/branches{/branch}",
function getBranches(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayBranches)
  req.open("GET", `https://api.github.com/repos/${username}/${name}/branches`)
  req.send()
}

function displayCommits(el) {
  const commits = JSON.parse(this.responseText)
  const detailsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + ' - '+ commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = detailsList

}

function getCommits(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(repo => '<li>' + repo.name + ' - ' + repo.owner.login + ' - ' + repo.html_url + ' - <a href="#" data-repository="' + repo.name + '" data-username="' + repo.owner.login + '" onclick="getCommits(this)">Get Commits</a>' + ' ' + '<a href="#" data-repository="' + repo.name + '" data-username="' + repo.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}
