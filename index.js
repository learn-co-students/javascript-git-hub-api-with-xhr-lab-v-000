const  root = "https://api.github.com/"

function getRepositories(){
  const name = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", root+"users/"+name+"/repos")
  req.send()
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)

   const repoList = `<ul>` + repos.map(repo => {
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


function getCommits(commit){
  const name = commit.dataset.repository
  const user = commit.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", root+"repos/"+user+"/"+name+"/commits")
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul> ${commits.map(commit =>
    '<li>'+ commit.author.login + '(' + commit.commit.author.name + ') - ' +
    commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}



function getBranches(branch){
  const branchName = branch.dataset.repository
  const user = branch.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", root+"repos/"+user+"/"+branchName+"/branches")
  req.send()
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchList
}
