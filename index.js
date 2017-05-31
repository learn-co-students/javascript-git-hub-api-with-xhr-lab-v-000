function getRepositories() {
  const req = new XMLHttpRequest()
  var user = document.getElementById("username").value
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${user}/repos`)
  req.send()
  console.log(`https://api.github.com/users/${user}/repos`)
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">'+ r.owner.login +'</a></li>').join('')}</ul>`
  document.getElementById('repositories').innerHTML += repoList
}

function getCommits(el) {
  var user = document.getElementById("username").value
  const name = el.dataset.repo
  console.log(el)
  console.log(name)
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/'+ user + "/" + name + "/commits")
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + '- ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById('details').innerHTML += commitsList
}
