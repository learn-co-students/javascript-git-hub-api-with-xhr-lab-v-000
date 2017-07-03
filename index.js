
// API calling functions

function callAPI(path, callback, method = "GET"){
  const req = new XMLHttpRequest();
  req.addEventListener("load", callback);
  req.open(method, 'https://api.github.com/' + path);
  req.send();
}

function getRepositories(){
  const username = document.getElementById("username").value;
  callAPI(`users/${username}/repos`, displayRepositories);
}

function getCommits(element){
  callAPI(`repos/${element.dataset.username}/${element.dataset.repository}/commits`, displayCommits);
}

function getBranches(element){
  callAPI(`repos/${element.dataset.username}/${element.dataset.repository}/branches`, displayBranches);
}

// Display functions
function displayCommits(event) {
  const commits = JSON.parse(this.responseText);
  const commitsList = "<ul>" + commits.map(commit => {
    commit.author ? login_name = commit.author.login : login_name = "N/A"
    return '<li><strong>' + commit.commit.author.name + "/" + login_name + "</strong> - " + commit.commit.message + "</li>"
  }).join("") + "</ul>";
  document.getElementById("details").innerHTML = commitsList
}

function displayBranches(event){
  const branches = JSON.parse(this.responseText);
  const branchesList = "<ul>" + branches.map(branch => {
    return `<li>${branch.name}</li>`
  }).join("") + "</ul>";
  document.getElementById("details").innerHTML = branchesList
}

function displayRepositories(event){
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(repo => '<li>' + repo.name + ' - ' + repo.owner.login + ' ()<a href="' + repo.html_url + '">Github page</a></li>)').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}
