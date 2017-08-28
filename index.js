function getRepositories(){
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  var username = document.getElementById("username").value;
  var url = "https://api.github.com/users/" + username + "/repos";
  req.open("GET", url)
  req.send()
  return false;
}

function displayRepositories(){
   var repos = JSON.parse(this.responseText)
   console.log(repos)
   const repoList = `<ul>${repos.map(r => '<li>'+ r.name +'<a href="'+ r.html_url +'">'+ r.html_url +'</a> <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login  + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
   document.getElementById("repositories").innerHTML = repoList
}


function getCommits(el){
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  const username = el.dataset.username;
  const url = "https://api.github.com/repos/" + username + "/" + name + "/commits"
  req.addEventListener("load", displayCommits)
  req.open("GET", url)
  req.send()
}

function displayCommits(){
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li>' + commit.author.login + ' <strong>' + commit.commit.author.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el){
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  const username = el.dataset.username;
  const url = "https://api.github.com/repos/" + username + "/" + name + "/branches"
  req.addEventListener("load", displayBranches)
  req.open("GET", url)
  req.send()
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
