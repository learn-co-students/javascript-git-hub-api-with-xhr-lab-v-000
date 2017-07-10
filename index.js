function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  let repoList = `<ul>${repos.map(r => '<li>'+'<a href="'+r.html_url+'">'+r.name+'</a> - <a href="#" data-repo="'+r.name+'" data-user="'+r.owner.login+'"onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest();
  var username = document.getElementById("username").value;
  req.addEventListener("load",showRepositories);
  req.open("GET",`https://api.github.com/users/${username}/repos`)
  req.send()
}

function getCommits(repo) {
  const req = new XMLHttpRequest();
  req.addEventListener("load",displayCommits);
  req.open("GET",`https://api.github.com/repos/${repo.dataset.user}/${repo.dataset.repo}/commits`)
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login+ '</strong> '+commit.commit.committer.name+' -'+commit.commit.message+'</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList;
}
