function displayRepositories(event, data) {
  //this is set to the XMLHttpRequest object that fired the event
  let repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(repo => {
    return(`
          <li>
            <h3>${repo.name}</h3>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" data-repository="${repo.name}" data-username="${repo.owner.login}" onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" data-repository="${repo.name}" data-username="${repo.owner.login}" onclick="getBranches(this)">Get Branches</a></li>
          </li>`
          )
        }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const username = document.getElementById("username").value
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayRepositories);
  xhr.open("GET", `https://api.github.com/users/${username}/repos`)
  xhr.send()
  return false
}

function getCommits(el) {
  const name = el.dataset.repository
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayCommits);
  xhr.open("GET", 'https://api.github.com/repos/' + el.dataset.username + '/' + name + '/commits')
  xhr.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '/username: ' + commit.author.login + '</strong> : ' + commit.commit.message + '</li>').join('')}</ul>`

  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const name = el.dataset.repository
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayBranches);
  xhr.open("GET", 'https://api.github.com/repos/' + el.dataset.username + '/' + name + '/branches')
  xhr.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
