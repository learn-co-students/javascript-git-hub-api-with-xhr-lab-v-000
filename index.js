
function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches.map(function(b) {
    return '<li>' + b.name + '</li>';
  }).join('')}</ul>`;
  document.getElementById("details").innerHTML = branchList;
}

function getBranches(elem) {
  const username = elem.dataset.username;
  const repo = elem.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/branches`);
  req.send();
}


function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitList = `<ul>${commits.map(function(commit) {
    return '<li>' + commit.commit.author.name + commit.author.login + commit.commit.message + '</li>';
  }).join('')}</ul>`;
  document.getElementById("details").innerHTML = commitList;
}

function getCommits(e) {
  const username = e.dataset.username;
  const repo = e.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/commits`);
  req.send();
}

function getRepositories() {
  const username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  const uri = "https://api.github.com/users/" + username + "/repos";

  req.addEventListener('load', displayRepositories);
  req.open('GET', uri);
  req.send();

  return(false);
}


function displayRepositories() {
  const repos = JSON.parse(this.responseText);

  const repoList = "<ul>" + repos.map(function(repo){
      const userName = 'username="' + repo.owner.login + '"';
      const repoName = 'repository="' + repo.name + '"';

      return(`<li>
        <p>${repo.name}</p>
        <a href="${repo.html_url}">${repo.html_url}</a>
        <a href="#" ${repoName} ${userName} onclick="getCommits(this)">Get Commits</a>
        <a href="#" ${repoName} ${userName} onclick="getBranches(this)">Get Branches</a>
        </li>`
          );
  }).join('') + "</ul>";

  document.getElementById("repositories").innerHTML = repoList;
}
