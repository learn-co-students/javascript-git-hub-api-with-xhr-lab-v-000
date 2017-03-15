function getRepositories() {
  let name = document.getElementById('username').value
  let xhr = new XMLHttpRequest()
  xhr.addEventListener('load', displayRepositories)
  xhr.open('GET', `https://api.github.com/users/${name}/repos`)
  xhr.send()
  return false;
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText)
  let repoList = '<ul>' + repos.map(repo => {
    let dataUsername = 'data-username="' + repo.owner.login + '"'
    let dataRepoName = 'data-repository="' + repo.name + '"'
    return(
      `
      <li>
        <h2>${repo.name}</h2>
        <a href="${repo.html_url}">${repo.html_url}</a><br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
      </li>
      `
    )
  }).join('') + "</ul>";
  document.getElementById('repositories').innerHTML = repoList
}

function getCommits(el) {
  const repoName = el.dataset.repository
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayCommits)
  xhr.open("GET", `https://api.github.com/repos/${el.dataset.username}/${repoName}/commits`)
  xhr.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const repoName = el.dataset.repository
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayBranches)
  xhr.open("GET", `https://api.github.com/repos/${el.dataset.username}/${repoName}/branches`)
  xhr.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
