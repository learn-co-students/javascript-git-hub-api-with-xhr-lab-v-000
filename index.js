function getRepositories() {
  var req = new XMLHttpRequest(); 
  var username = document.getElementById("username").value; 
  var url = "https://api.github.com/users/" + username + "/repos"; 
  req.addEventListener("load", displayRepositories); 
  req.open("GET", url); 
  req.send(); 
  return false; 
}

function displayRepositories(event, data) {
  //console.log(this.responseText); 
  var repos = JSON.parse(this.responseText); 
  var repoList = `<ul>${repos.map(r => '<li><h3>' + r.name + '</h3>' + r.html_url + '<br>' + getCommitsLink(r) + '<br>' + getBranchesLink(r) + '</li>').join('')}</ul>`; 
  document.getElementById("repositories").innerHTML = repoList; 
}

function getBranchesLink(r) {
  return '<a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getBranches(this)">Get Branches</a>'; 
}

function getBranches(el) {
  var req = new XMLHttpRequest(); 
  var username = el.dataset.username; 
  var repository = el.dataset.repository; 
  var url = "https://api.github.com/repos/" + username + "/" + repository + "/branches"; 
  req.addEventListener("load", displayBranches); 
  req.open("GET", url); 
  req.send(); 
}

function displayBranches() {
  var branches = JSON.parse(this.responseText); 
  var branchesList = `<h2>Branches</h2><ul>${branches.map(b => '<li>Branch name: ' + b.name + '</li>').join('')}</ul>`;  
  document.getElementById("details").innerHTML = branchesList; 
}

function getCommitsLink(r) {
  return '<a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a>'; 
}

function getCommits(el) {
  var req = new XMLHttpRequest(); 
  var repository = el.dataset.repository; 
  var username = el.dataset.username; 

  req.addEventListener("load", displayCommits); 
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/commits'); 
  req.send(); 
}

function displayCommits() {
  //console.log(this.responseText); 
  var commits = JSON.parse(this.responseText); 
  var commitDisplay = `<h2>Commits</h2><ul>${commits.map(c => '<li>Author name: ' + c.commit.author.name + ' - Author username: ' + c.author.login + ' - Commit message: ' + c.commit.message + '</li>').join('')}</ul>`; 
  document.getElementById("details").innerHTML = commitDisplay; 
}
