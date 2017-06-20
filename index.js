function getRepositories(){
  var username = document.getElementById("username").value
  var url = "https://api.github.com/users/" + username + "/repos"
  var req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", url)
  req.send()
  return false;
}

function displayRepositories(){
  var repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(repo => {
  const repoUsername = 'data-repo-username="' + repo.owner.login + '"'
  const repoName = 'data-repository="' + repo.name + '"'
  return(`<li> <a href="${repo.html_url}">${repo.name}</a><br> <a href="#" ${repoName} ${repoUsername} onclick="getCommits(this)">Get Commits</a><br> <a href="#" ${repoName} ${repoUsername} onclick="getBranches(this)">Get Branches</a></li>`)}).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(repo){
  const repoName = repo.dataset.repository
  const username = repo.dataset.repoUsername
  debugger
  const url = "https://api.github.com/repos/" + username + "/" + repoName + "/commits"
  var req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", url)
  req.send()
}

function displayCommits(){
  var commits = JSON.parse(this.responseText)
  const commitList = "<ul>" + commits.map(commit => {
  return(`<li>${commit.author.login} - ${commit.commit.author.name}: ${commit.commit.message}</li>`)}) + "</ul>"
  document.getElementById("details").innerHTML = commitList
}

function getBranches(repo){
  const repoName = repo.dataset.repository
  const username = repo.dataset.repoUsername
  const url = "https://api.github.com/repos/" + username + "/" + repoName + "/branches"
  var req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", url)
  req.send()
}

function displayBranches(){
  var branches = JSON.parse(this.responseText)
  const branchList = "<ul>" + branches.map(branch => {
  return(`<li>${branch.name}</li>`)}) + "</ul>"
  document.getElementById("details").innerHTML = branchList
}