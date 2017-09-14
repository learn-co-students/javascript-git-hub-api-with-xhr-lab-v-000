function getRepositories() {
  const username = document.getElementById("username").value;

  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories)
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()

}


function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  console.log(repos)
  const repoList = `<ul>${repos.map(r =>
    '<li><a href="' + r.html_url + '">' + r.name + ' - <a href="#" data-repo="' + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repo="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`

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
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li>h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function displayBranches() {
  var branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong> - ' + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

function getBranches(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  url = "https://api.github.com/repos/" + el.dataset.username + "/" + name + "/branches"
  req.open("GET", url)
  req.send()
}
