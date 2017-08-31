const rootURL = "https://api.github.com"

function getRepositories(form) {
  const username = document.getElementById("username").value
  const request = new XMLHttpRequest
  request.open("GET", "https://api.github.com/users/" + username + "/repos");
  request.addEventListener('load', displayRepositories);
  request.send();
}

function displayRepositories() {
  var response = JSON.parse(this.responseText)
  var repoList = response.map((repo) => `<li><a href='#' onclick='getCommits(this)' data-username="${repo.owner.login}" data-repository='${repo.name}'> https://github.com/${repo.owner.login}/${repo.name}</a> - <a href='#' data-username='${repo.owner.login}' data-repository='${repo.name}' onclick='getBranches(this)'>Get Branches</a></li>`).join("")
  document.getElementById('repositories').innerHTML = `<ul>${repoList}</ul>`


}

function getCommits(li) {
  const request = new XMLHttpRequest
  request.open("GET", `https://api.github.com/repos/${li.dataset.username}/${li.dataset.repository}/commits`)
  request.addEventListener("load", displayCommits)
  request.send()
}

function displayCommits(event) {
  const response = JSON.parse(this.responseText)
  const commitList = response.map((commit) => `<li>${commit.commit.author.name} - ${commit.author.login} - ${commit.commit.message}</li>`).join("")
  document.getElementById('details').innerHTML = `<ul>${commitList}</ul>`

}

function getBranches(li) {
  const request = new XMLHttpRequest
  request.open('GET', `https://api.github.com/repos/${li.dataset.username}/${li.dataset.repository}/branches`)
  request.addEventListener('load', displayBranches)
  request.send()

}

function displayBranches(event) {
  const response = JSON.parse(this.responseText)
  const branches = response.map((branch) => `<li>${branch.name}</li>`).join('')
  document.getElementById('details').innerHTML = `<ul> ${branches} </ul>`

}
