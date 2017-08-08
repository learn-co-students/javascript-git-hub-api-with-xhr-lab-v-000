function getRepositories() {
  const username = document.getElementById("username").value
  const url = "https://api.github.com" + "/users/" + username + "/repos"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", url)
  req.send()
  return false;
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(r => {
    return(`
    <li>
      <p>${r.name}</p>
      <a href="${r.html_url}">${r.html_url}</a>
      <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>`)
    }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + el.dataset.username + "/" + name + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> - ' + ' ' + commit.author.login + ' ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + el.dataset.username + "/" + name + '/branches')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong> </li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
