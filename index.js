function getRepositories() {
  var username = document.getElementById("username").value;
  var req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", "https://api.github.com/users/" + username + "/repos");
  req.send();
  return false;
};

function displayRepositories(event, data) {
  var repositories = JSON.parse(this.responseText);
  var repoList = "<ul>";
  var repo;
  for (var i = 0; i < repositories.length; i++) {
    repo = repositories[i];
    repoList += "<li><p><strong>" + repo.name + '</strong> <button type="button" data-repository="' + repo.name + '" data-username="' + repo.owner.login + '" onclick="getCommits(this)">get commits</button> <button type="button" data-repository="' + repo.name + '" data-username="' + repo.owner.login + '" onclick="getBranches(this)">get branches</button></p>' + repo.html_url + '</li>';
  }
  repoList += "</ul>";
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  var username = el.dataset.username;
  var repoName = el.dataset.repository;
  var req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", "https://api.github.com/repos/" + username + "/" + repoName + "/commits");
  req.send();
}

function displayCommits(event, data) {
  var commits = JSON.parse(this.responseText);
  var commitList = "<ul>";
  var commit, commitAuthor, commitAuthorLogin, commitCommit, commitCommitAuthor;
  for (var i = 0; i < commits.length; i++) {
    commit = commits[i];
    commitAuthor = commit.author;
    if (commitAuthor) {
      commitAuthorLogin = commitAuthor.login;
    } else {
      commitAuthorLogin = "null";
    }
    commitCommit = commit.commit;
    commitCommitAuthor = commitCommit.author;
    commitList += "<li><p><strong>" + commitAuthorLogin + "</strong> " + commitCommitAuthor.name + "</p>" + commitCommit.message + "</li>";
  }
  commitList += "</ul>"
  document.getElementById("details").innerHTML = commitList;
}

function getBranches(el) {
  var username = el.dataset.username;
  var repoName = el.dataset.repository;
  var req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", "https://api.github.com/repos/" + username + "/" + repoName + "/branches");
  req.send();
}

function displayBranches(event, data) {
  var branches = JSON.parse(this.responseText);
  var branchList = "<ul>";
  var branch;
  for (var i = 0; i < branches.length; i++) {
    branch = branches[i];
    branchList += "<li>" + branch.name + "</li>";
  }
  branchList += "</ul>";
  document.getElementById("details").innerHTML = branchList;
}
