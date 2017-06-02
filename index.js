function getRepositories() {
  var name = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open('Get', `https://api.github.com/users/${name}/repos`)
  req.send()
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  console.log(repos);
  const repoList = "<ul>" + repos.map(function(repo) {
    return(`
          <li>
            <header>${repo.name}</header>
            <a href="${repo.html_url}">This repo on Github</a><br>
            <a href="#" data-commit="${repo.owner.login}/${repo.name}" onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" data-repository="${repo.owner.login}/${repo.name}" onclick="getBranches(this)">Get Branches</a></li>
          </li>`
          )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}


function getCommits(el) {
  const repo = el.dataset.repository
  const name = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/'+ name +'/' + repo+'/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li>' + commit.commit.author.name + ' - ' + commit.author.login + ' - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const repo = el.dataset.repository
  const name = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/'+ name +'/' + repo+'/branches')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

