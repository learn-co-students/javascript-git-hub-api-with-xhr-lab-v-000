function getRepositories(){
  var username = document.getElementById("username").value;
  console.log(username);
  // console.log(this)
  var req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", "https://api.github.com/users/" + username + "/repos")
  req.send()
}

function displayRepositories(){
  var response = JSON.parse(this.responseText)

  var repoList = `<ul>${response.map(element => {
    return '<li><a href="' + element.html_url + '">' + element.name + '</a> - <a href="#" data-repository="' + element.name + '" data-username="' + element.owner.login + '" onclick="getCommits(this)">Get commits</a> - <a href="#" data-repository="' + element.name + '" data-username="' + element.owner.login + '" onclick="getBranches(this)">Get branches</a></li>'}).join("")}</ul>`

  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el){
  var repo = el.dataset.repository
  var owner = el.dataset.username
  // console.log(el.dataset)
  var req = new XMLHttpRequest
  req.addEventListener("load", displayCommits)
  req.open("GET", "https://api.github.com/repos/" + owner + "/" + repo + "/commits")
  req.send()
}

function displayCommits(){
  var response = JSON.parse(this.responseText)
  console.log(response)
  var commitList = `<ul>${response.map(commit => {
    return '<li>' + commit.author.login + ' - ' + commit.commit.author.name + ' - ' + commit.commit.message + '</li>'
  }).join('')}</ul>`
  document.getElementById("details").innerHTML = commitList
}

function getBranches(el){
  var repo = el.dataset.repository
  var owner = el.dataset.username

  var req = new XMLHttpRequest
  req.addEventListener("load", displayBranches)
  req.open("GET", "https://api.github.com/repos/" + owner + "/" + repo + "/branches")
  req.send()
}

function displayBranches(){
  var response = JSON.parse(this.responseText)
  var branchList = `<div>This is the list of branches</div><ul>${response.map(branch => {
    return '<li>' + branch.name + '</li>'
  }).join('')}</ul>`

  document.getElementById("details").innerHTML = branchList
}
