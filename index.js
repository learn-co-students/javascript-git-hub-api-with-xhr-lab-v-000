function getRepositories() {
  const uname = document.getElementById("username").value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", 'https://api.github.com/users/' + uname + '/repos');
  req.send();
}

function displayRepositories() {
    const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepoName = 'data-repository="' + repo.name + '"'
    return(`
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`
          )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const repoName = el.dataset.repository
  const req = new XMLHttpRequest() 
  req.addEventListener("load", displayCommits);
  req.open("GET",
    'https://api.github.com/repos/' + el.dataset.username + '/' + repoName +
    '/commits' )
  req.send();
}

function displayCommits(el) {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(c => '<li><h3>' + c.commit.author.name + ' (' + c.author.login + ')</h3>' + c.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const repoName = el.dataset.repository
  const uri = 'https://api.github.com' + "/repos/" + el.dataset.username + "/" + repoName + "/branches"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", uri)
  req.send()

}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

