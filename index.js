function getRepositories(){
  const name = document.getElementById("username").value
  const url = `https://api.github.com/users/${name}/repos`
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load",displayRepositories)
  xhr.open("GET", url)
  xhr.send()
  return false;
}
function displayRepositories(){
  const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(repo => {
    const dataUsername = `data-username="${repo.owner.login}"`
    const dataReponame = `data-repository="${repo.name}"`
    return (
      `<li>
        <h2>${repo.name}</h2>
        <a href="${repo.html_url}">${repo.html_url}</a><br>
        <a href="#" ${dataReponame} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" ${dataReponame} ${dataUsername} onclick="getBranches(this)">Get Branches</a>
      </li>`
    )
  }).join('') + "</ul>"
  document.getElementById("repositories").innerHTML = repoList
}

function getBranches(el){
  const repoName = el.dataset.repository
  const url = `https://api.github.com/repos/${el.dataset.username}/${repoName}/branches`
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load",displayBranches)
  xhr.open("GET", url)
  xhr.send()
}

function getCommits(el){
  const repoName = el.dataset.repository
  const url = `https://api.github.com/repos/${el.dataset.username}/${repoName}/commits`
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayCommits)
  xhr.open("GET", url)
  xhr.send()
}

function displayCommits(){
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
