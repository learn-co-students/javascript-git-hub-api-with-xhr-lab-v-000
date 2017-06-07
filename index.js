'use strict';

function getRepositories() {
  const req = new XMLHttpRequest()
  const username = document.getElementById("username").value

  req.addEventListener("load", displayRepositories)
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories() { //console.log(this.responseText)
  const repos = JSON.parse(this.responseText)
  const repoList = `${repos.map(repo =>
    `<li> Repo name: ${repo.name} <br> Login Name: ${repo.owner.login} <br> <a href=${repo.html_url} </li> <br> `
).join(' ')}`

  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(eventListener) {
  const req = new XMLHttpRequest()
  const name = eventListener.dataset.username
  const repoName = eventListener.dataset.repository

  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${name}/${repoName}/commits`)
  req.send()
}

function displayCommits() { //console.log(this.responseText)
  const commits = JSON.parse(this.responseText)
  const commitsList = `${commits.map(commit =>
    `<li> Commit message: ${commit.commit.message} <br> Author Name: ${commit.commit.author.name} <br> <a href=${commit.html_url} </li> <br>`
).join(' ')}`

  document.getElementById("details").innerHTML = commitsList
}

function getBranches(eventListener) {
  const req = new XMLHttpRequest()
  const repoName = eventListener.dataset.repository
  const name = eventListener.dataset.username

  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${name}/${repoName}/branches`)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  console.log(branches)
  const branchesList = `${branches.map(branch =>
    `<li> Branch name: ${branch.name} <br> Commit message: ${branch.commit} <br> <a href=${branch.commit.url} </li> <br>`
).join(' ')}`

  document.getElementById("details").innerHTML = branchesList
}
