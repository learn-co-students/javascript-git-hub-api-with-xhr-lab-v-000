const root = "https://api.github.com"

function getRepositories(){
  const name = document.getElementById("username").value;
  const url = root + "/users/" + name + "/repos"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", url)
  req.send()
  return false;
}


function displayRepositories(){
  const repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList

}

function getCommits(el){
  const repo = el.dataset.repository
  const url= root + "/repos/" + el.dataset.username + "/" + repo + "/commits"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", url)
  req.send()

}

function displayCommits(){
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + (commit.author.login) + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el){
  const repo = el.dataset.repository
  const url= root + "/repos/" + el.dataset.username + "/" + repo + "/branches"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", url)
  req.send()

}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
