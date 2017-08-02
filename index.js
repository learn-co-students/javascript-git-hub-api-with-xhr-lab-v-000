function getRepositories() {
  var username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = "<ul>" + repos.map(repo => {
    return (
      `<li>
        <h2>${repo.name}</h2>
        <a href="${repo.html_url}">${repo.html_url}</a><br>
        <a href="#" data-repository="${repo.name}" data-username="${repo.owner.login}" onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" data-repository="${repo.name}" data-username="${repo.owner.login}" onclick="getBranches(this)">Get Branches</a>
      </li>`
    );
  }).join('') + "</ul>";
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  var repository = el.dataset.repository;
  var username = el.dataset.username;
  var url = `https://api.github.com/repos/${username}/${repository}/commits`;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", url);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(c => '<li>' + c.author.login + ' - ' + c.commit.author.name + ' - ' + c.commit.message + '</li>').join("")}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  var repository = el.dataset.repository;
  var username = el.dataset.username;
  var url = `https://api.github.com/repos/${username}/${repository}/branches`;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", url);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
