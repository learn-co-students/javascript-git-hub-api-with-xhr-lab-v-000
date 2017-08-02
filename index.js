const rootURL = "https://api.github.com"

function getRepositories() {
  const name = document.getElementById("username").value
  const uri = rootURL + "/users/" + name + "/repos"
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayRepositories)
  xhr.open("GET", uri)
  xhr.send()
}

function displayRepositories(){
  const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(repo => {
     const dataUsername = 'data-username="' + repo.owner.login + '"'
     const dataRepoName = 'data-repository="' + repo.name + '"'
     return(
       `<li>
       <h2>${repo.name}</h2>
       <a href="${repo.html_url}">${repo.html_url}</a><br>
       <a href="#" ${dataRepoName} ${dataUsername} onClick="getCommits(this)">Get Commits<a>
       <a href="#" ${dataRepoName} ${dataUsername} onClick="getBranches(this)">Get Branches<a>
       </li>`)
   }).join('') + "</ul>";
   document.getElementById("repositories").innerHTML = repoList
}

function getCommits(repo) {
   name = repo.dataset.repository
   const uri = rootURL + "/repos/" + repo.dataset.username + "/" + name + "/commits"
   const xhr = new XMLHttpRequest()
   xhr.addEventListener("load", displayCommits)
   xhr.open("GET", uri)
   xhr.send()
 }

 function displayCommits() {
    const commits = JSON.parse(this.responseText)
    const commitsList =
    `<ul>
      ${commits.map(commit =>
        '<li>' +
        '<h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' +
         commit.commit.message +
         '</li>').join('')}
    </ul>`
    document.getElementById("details").innerHTML = commitsList
  }

  function getBranches(repo) {
   name = repo.dataset.repository
   const uri = rootURL + "/repos/" + repo.dataset.username + "/" + name + "/branches"
   const xhr = new XMLHttpRequest()
   xhr.addEventListener("load", displayBranches)
   xhr.open("GET", uri)
   xhr.send()
 }

 function displayBranches() {
   const branches = JSON.parse(this.responseText)
   const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
   document.getElementById("details").innerHTML = branchesList
 }
