function getUsername() {
  return document.getElementById("username").value;
}

function getRepositories() {
  const username = getUsername();

  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", "https://api.github.com/users/" + username + "/repos");
  req.send();
}

function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText);
  const repoTemplate = document.getElementById("repo-template").innerHTML;

  let template = Handlebars.compile(repoTemplate);
  let result = "";

  for (let repo of repos) {
    result += template(repo);
  }

  document.getElementById("repositories").innerHTML = result;
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsTemplate = document.getElementById("commit-template").innerHTML;

  let template = Handlebars.compile(commitsTemplate);
  let result = "";

  for (let commit of commits) {
    result += template(commit);
  }

  document.getElementById("details").innerHTML = result;
}

function getCommits(el) {
  const repository = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();

  req.addEventListener("load", displayCommits);
  req.open("GET", "https://api.github.com/repos/" + username 
      + "/" + repository + "/commits");
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesTemplate = document.getElementById("branch-template").innerHTML;

  let template = Handlebars.compile(branchesTemplate);
  let result = "";

  for (let branch of branches) {
    result += template(branch);
  }

  document.getElementById("details").innerHTML = result;
}

function getBranches(el) {
  const repository = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();

  req.addEventListener("load", displayBranches);
  req.open("GET", "https://api.github.com/repos/" + username 
      + "/" + repository + "/branches");
  req.send();
}
