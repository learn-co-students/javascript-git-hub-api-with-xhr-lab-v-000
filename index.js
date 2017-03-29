function getRepositories() {
  const username = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.html_url + 
        ' - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a>' + 
        ' - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a>' +
        '</li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
    const name = el.dataset.repository
    const owner = el.dataset.username
    const url = 'https://api.github.com/repos/' + owner + '/' + name + '/commits'
    console.log(url)
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayCommits)
    req.open("GET", url)
    req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> - ' + commit.author.login + ' - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
    const name = el.dataset.repository
    const owner = el.dataset.username
    const url = 'https://api.github.com/repos/' + owner + '/' + name + '/branches'
    console.log(url)
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayBranches)
    req.open("GET", url)
    req.send()
}

function displayBranches() {
    const branches = JSON.parse(this.responseText)
    console.log(branches[0])
    const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`
    document.getElementById("details").innerHTML = branchesList
}