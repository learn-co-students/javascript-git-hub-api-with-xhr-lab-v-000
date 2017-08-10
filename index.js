const rootURL = "https://api.github.com"

function getRepositories() {
  //get username and url values
  const username = document.getElementById("username").value
  const url = rootURL + "/users/" + username + "/repos"

  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", url)
  req.send()
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map( (repo) => {
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepo = 'data-repository="' + repo.name + '"'
    return (`<li>
              <h2>${repo.name}</h2>
              <a href="${repo.html_url}">${repo.html_url}</a><br>
              <a href="#" ${dataRepo} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
              <a href="#" ${dataRepo} ${dataUsername} onclick="getBranches(this)">Get Branches</a><br>
            </li>`)
  }).join('') + "</ul>"
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(element) {
  const repoName = element.dataset.repository
  const url = rootURL + "/repos/" + element.dataset.username + "/" + repoName + "/commits"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", url)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map((commit) => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(element) {
  const repoName = element.dataset.repository
  const url = rootURL + "/repos/" + element.dataset.username + "/" + repoName + "/branches"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", url)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map((branch) => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
