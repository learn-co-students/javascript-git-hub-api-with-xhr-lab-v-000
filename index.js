

function getRepositories() {
  const xhr = new XMLHttpRequest()
  const uname = document.getElementById("username").value; 
  const link = 'https://api.github.com/users/' + uname + '/repos'  
  
  xhr.addEventListener("load", displayRepositories);
  xhr.open("GET", link)
  xhr.send()
  return false; 

}
//get value of input and put within link to get info from github api
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
  const name = el.dataset.repository
  const uname = el.dataset.username
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayCommits);
  xhr.open("GET", 'https://api.github.com/repos/' + uname + '/' + name + '/commits')
  xhr.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '-' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`		
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {  
  const name = el.dataset.repository
  const uname = el.dataset.username
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayBranches);
  xhr.open("GET", 'https://api.github.com/repos/' + uname + '/' + name + '/branches')
  xhr.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong>  </li>').join('')}</ul>`		
  document.getElementById("details").innerHTML = branchesList
}


/*author's Github name, the
author's full name, and the commit message. */

