function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById("username").value;
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(repo => `<li><a href="${repo.html_url}">${repo.name}</a>` + createLink(repo, "Commits") + createLink(repo, "Branches")
                                    ).join('')}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function createLink(repo, funcName) {
  return ` - <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onclick="get${funcName}(this)">Get ${funcName}</a>`;
}

function getCommits(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + getCommitAuthor(commit) + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}

function getCommitAuthor(commit) {
  return ((commit.author != null) ? commit.author.login : 'unk') + ' - ' + commit.commit.author.name;
}

function getBranches(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/branches`);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = branchesList;
}
