function getRepositories() {
  const req = new XMLHttpRequest()
  let username = document.getElementsByName("username")[0].value
  req.addEventListener("load", displayRepositories)
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send
}

function displayRepositories(){
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="https://github.com/' + r.owner.login + '/' + r.name +'" repo="' + r.name  +  '"> View Repo </a> - <a href="#" onclick="getCommits(this)">Get Commits</a> - <a href="#" onclick="getBranches(this)">View Branches</a> </li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el){
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username +'/' + name + '/commits')
  req.send()
}

function displayCommits(){
  var commits = JSON.parse(this.responseText)
  const commitList = `<ul>${commits.map(c => '<li><strong>' + c.author.login+ ' - ' + c.commit.author.name + '</strong> - ' + c.commit.message + '</li>').join('')}</ul>`

  document.getElementById("details").innerHTML = commitList
}

function getBranches(el){
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + username +'/' + name + '/branches')
  req.send()
}

function displayBranches(){
  var branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`

  document.getElementById("details").innerHTML = branchesList
}