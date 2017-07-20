function displayRepositories(event, data) {
  //this is set to the XMLHttpRequest object that fired the event
  var repos = JSON.parse(this.responseText);
  console.log(repos)

  const repoList = `<ul>${repos.map(r => '<li><strong>' + r.name + '</strong> | <span class="url">' + r.html_url + '</span> | <a href="#" data-repo="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a> | <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`

  document.getElementById("repositories").innerHTML = repoList;
}

function getRepositories(){
  var username = document.getElementById("username").value;
  var req = new XMLHttpRequest();

  req.addEventListener("load", displayRepositories);
  req.open("GET", "https://api.github.com/users/" + username + "/repos");
  req.send();
}

function getCommits(el) {
  const repo = el.dataset.repository;
  const username = el.dataset.username;

  const req = new XMLHttpRequest();
  // TODO commit author's Github name, full name, commit message
  req.addEventListener("load", displayCommits);
  req.open("GET", "https://api.github.com/repos/" + username + "/" + repo + "/commits");
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + `${commit.commit.committer.name}` + '</strong>(' + commit.author.login + ') - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const repo = el.dataset.repository;
  const username = el.dataset.username;

  const req = new XMLHttpRequest();
  // TODO branch names
  req.addEventListener("load", displayBranches);
  req.open("GET", "https://api.github.com/repos/" + username + "/" + repo + "/branches");
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  console.log(branches)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + `${branch.name}` + '</strong></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
