
function getRepositories() {
  debugger;
  const req = new XMLHttpRequest()
  const username = document.getElementById("username").value
  req.addEventListener("load", displayRepositories)
  req.open("GET", 'https://api.github.com/users/'+username+'/repos')
  req.send();
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>/https:\/\/github.com\/'+ r.owner.login +"/" + r.name+'/ - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a> <a href = "#" onclick = "getBranches(this)" >Display Branches<a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}


function getCommits(el) {
  const repo = el.dataset.repository
  const username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/'+username+'/'+ repo +'/commits')
  req.send()
}


function displayCommits() {
  const commits = JSON.parse(this.responseText)
  console.log(commits)
  const commitsList = `<ul> name= ${commits[0].author.login} ${commits.map(commit => '<li><strong>' + commits[0].commit.author.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
 
  document.getElementById("details").innerHTML = commitsList
}


function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const username = document.getElementById("username")
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`
 
  document.getElementById("details").innerHTML = branchesList 
}

function getBranches(el){
  const repo = el.dataset.repository
  const username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/'+username+'/'+ repo +'/branches')
  req.send()
}
