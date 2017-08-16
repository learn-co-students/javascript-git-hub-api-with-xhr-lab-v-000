function getRepositories() {
  var username = document.getElementById("username").value;
  console.log('https://api.github.com/repos/' + username);
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos' );
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.full_name + '" onclick="getCommits(this)">Get Commits</a>' + ' - <a href="' + r.html_url + '">See Repository</a> - <a href="#" data-branch="' + r.full_name + '" onclick="getBranches(this)">See Branches</a></li>').join('')}`
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repo;
  console.log(name);
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + name + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit =>  '<li><strong>' + commit.committer.login + '</strong> - ' + commit.commit.author.name + '<br>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList;
}

function getBranches(el) {
  const name = el.dataset.branch;
  console.log(name);
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + name + '/branches')
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log(branches);
  const branchList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchList;
}
