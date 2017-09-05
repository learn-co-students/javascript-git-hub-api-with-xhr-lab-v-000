
function getRepositories() {

  var name=document.getElementById('username').value;


  const req=new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/'+ name +'/repos')
  req.send()


}



function showRepositories() {
  //this is set to the XMLHttpRequest object that fired the event
  //event.preventDefault();

  var repos = JSON.parse(this.responseText)

  const repoList = `<ul>${repos.map(r => '<li>' +
  r.name + '  - '+r.owner.login +' -  ' +r.html_url+' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>'
  + ' - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>' ).join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList


}

function getCommits(el) {
  var uname=document.getElementById("username").value;

  var name = el.dataset.repo;

  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/'+ uname + '/' + name + '/commits')
  req.send()
}


function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name +
  '</strong> - '+ commit.commit.message +'</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  var uname=document.getElementById("username").value;
  var name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/'+ uname + '/' + name + '/branches')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const commitsList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
