function getRepositories() {
  const req = new XMLHttpRequest()
  username = document.getElementById('username').value
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/'+username+'/repos')
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li><a href="' + r.html_url + '">' + 
    r.name + '</a> - <a href="#" data-repository="' + r.name + 
    '" data-username="' + r.owner.login +
    '" onclick="getCommits(this)">Get Commits</a> - ' +
    '<a href="#" data-repository="' + r.name + 
    '" data-username="' + r.owner.login +
    '" onclick="getBranches(this)">Get Branches</a></li>'
    ).join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository;
  const user = el.dataset.username;
  const req = new XMLHttpRequest()
  commits_url = 'https://api.github.com/repos/' + user +'/' + name + '/commits'
  req.addEventListener("load", displayCommits);
  req.open("GET", commits_url)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => 
    '<li>'+ commit.author.login + '(' + commit.commit.author.name + ') - ' + 
    commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const name = el.dataset.repository;
  const user = el.dataset.username;
  const req = new XMLHttpRequest()
  branches_url = 'https://api.github.com/repos/' + user +'/' + name + '/branches'
  req.addEventListener("load", displayBranches);
  req.open("GET", branches_url)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => 
    '<li>'+ branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}