function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  let repoList = `<ul>${repos.map(r => '<li>'+'<a href="'+r.html_url+'">'+r.name+'</a> - <a href="#" data-repository="'+r.name+'" data-username="'+r.owner.login+'"onclick="getCommits(this)">Get Commits</a> <a href="#" data-repository="'+r.name+'" data-username="'+r.owner.login+'"onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest();
  var username = document.getElementById("username").value;
  req.addEventListener("load",displayRepositories);
  req.open("GET",`https://api.github.com/users/${username}/repos`)
  req.send()
}

function getCommits(repo) {
  const req = new XMLHttpRequest();
  req.addEventListener("load",displayCommits);
  req.open("GET",`https://api.github.com/repos/${repo.dataset.username}/${repo.dataset.repository}/commits`)
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login+ '</strong> '+commit.commit.committer.name+' -'+commit.commit.message+'</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList;
}

function getBranches(repo) {
  const req = new XMLHttpRequest();
  req.addEventListener("load",displayBranches);
  req.open("GET",`https://api.github.com/repos/${repo.dataset.username}/${repo.dataset.repository}/branches`);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li>'+branch.name+'</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList;
}
