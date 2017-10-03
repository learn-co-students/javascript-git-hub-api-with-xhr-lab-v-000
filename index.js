function getRepositories() {
  const name = document.getElementById("username").value
  const URI = 'https://api.github.com/users/' + name + '/repos'
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", URI)
  req.send()
}

function displayRepositories() {
  //this is set to the XMLHttpRequest object that fired the event
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = "<ul>" + repos.map(r => {
    const dataUsername = 'data-username="' + r.owner.login + '"'
    const dataRepoName = 'data-repository="' + r.name + '"'
    return (`
      <li>
      <h2> ${r.name} </h2>
      <a href="${r.html_url}">${r.html_url}</a><br>
      <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
      <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a>
      </li>
    `) }).join("") + "</ul>"
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const username = el.dataset.username
  const repoName = el.dataset.repository
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' +  repoName + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + ' (' +  commit.author.login + ')</strong>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const username = el.dataset.username
  const repoName = el.dataset.repository
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' +  repoName + '/branches')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
