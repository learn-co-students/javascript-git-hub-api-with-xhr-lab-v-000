function getRepositories() {
  const name = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${name}/repos`)
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(r => {
    return(`
    <li><h2>${r.name}</h2>
    <a href="${r.html_url}">${r.html_url}</a><br>
    <a href="#" data-repository="${r.name} data-username="${r.owner.login}" onclick="getCommits(this)">Get Commits</a><br></li>`)
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${el.dataset.username}/${name}/commits`)
  req.send()
}

function displayCommits() {
  var commits = JSON.parse(this.responseText)
  var commitsList = "<ul>" + commits.map(c => {
    return(`
    <li><h3>${c.commit.author.name} (${c.author.login})</h3>
    ${c.commit.message}</li>`)
  }).join('') + "</ul>";
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${el.dataset.username}/${name}/branches`)
  req.send()
}
function displayBranches() {
  var branches = JSON.parse(this.responseText)
  var branchesList = `<ul>${branches.map(branch =>
    '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
