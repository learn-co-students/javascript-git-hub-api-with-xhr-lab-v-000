function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  console.log(this.responseText);
  const repoList = `<ul>${repos.map(repo => '<li>' + repo.name + ' - <a href="' + repo.html_url + '">  Visit Repo</a><br><a href="#" onclick="getCommits(this)" data-repository="' + repo.name + '" data-username="' + repo.owner.login + '">View Details</a> | <a href="#" onclick="getBranches(this)" data-repository="' + repo.name + '" data-username="' + repo.owner.login + '">View Branches</a></li>').join('')}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(element) {
  const repository = element.dataset.repository;
  const username = element.dataset.username;
  const req = new XMLHttpRequest;
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/commits`);
  req.send()
}

function displayCommits() {
  console.log(this.responseText);
  const commits = JSON.parse(this.responseText);
  const commitList = `<ul>${commits.map(commit => '<li>Username: ' + commit.author.login + '<br>Name: ' + commit.commit.author.name + '<br>Commit Message:  ' + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = commitList;
}

function getBranches(element) {
  const repository = element.dataset.repository;
  const username = element.dataset.username;
  const req = new XMLHttpRequest;
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/branches`);
  req.send();
}

function displayBranches() {
  console.log(this.responseText);
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches.map(branch => '<li>Name: ' + branch.name + '</li>').join('')}</ul>`;
    document.getElementById("details").innerHTML = branchList;
}

/*  name
  username
  repository
} */
