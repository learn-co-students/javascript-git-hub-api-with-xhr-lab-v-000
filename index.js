
function getRepositories() {
  const username = document.querySelector('#username').value
  const url = "https://api.github.com/users/" + username + "/repos"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", url)
  req.send()
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  const repoList = "<ul>" +
    repos.map(r => {
      var repoUsername = 'data-username="' + r.owner.login +'"'
      var repoRepoName = 'data-repository="' + r.name + '"'
      return (
        `<li>
          <h3>${r.name}</h3>
          <a href="${r.html_url}">${r.html_url}</a><br>
          <a href="#" ${repoRepoName} ${repoUsername} onclick="getCommits(this)">Get Commits</a><br>
          <a href="#" ${repoRepoName} ${repoUsername} onclick="getBranches(this)">Get Branches</a>
        </li>`
        )
  }).join('') + '</ul>'
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const username = el.dataset.repository
  const url = "https://api.github.com/repos/" + el.dataset.username + "/" + username + "/commits"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", url)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const username = el.dataset.repository
  const url = "https://api.github.com/repos/" + el.dataset.username + "/" + username + "/branches"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", url)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
