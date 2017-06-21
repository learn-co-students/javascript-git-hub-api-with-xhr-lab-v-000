// Branch Functions
function getBranches(el) {
  const repoName = el.dataset.repository;
  
  const uri = "https://api.github.com/repos/" + el.dataset.username + "/" + repoName + "/branches";
  
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", uri);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;
  
  document.getElementById("details").innerHTML = branchesList;
}

// Commit Functions
function getCommits(el) {
  const repoName = el.dataset.repository;
  
  const uri = "https://api.github.com/repos/" + el.dataset.username + "/" + repoName + "/commits";
  
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", uri);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + " - " + commit.author.login + '</strong>' + commit.commit.message + '</li>').join('')}</ul>`;
  
  document.getElementById("details").innerHTML = commitsList;
}


// Repo Functions
function getRepositories() {
  const username = document.getElementById("username").value;
  
  const uri = "https://api.github.com/users/" + username + "/repos";
  
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", uri);
  req.send();
  
  return(false);
}


function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  
  const repoList = "<ul>" + repos.map(repo => {
      const dataUsername = 'data-username="' + repo.owner.login + '"';
      
      const dataRepoName = 'data-repository="' + repo.name + '"';
      
      return(`
      <li>
        <strong>${repo.name}</strong>
        <a href="${repo.html_url}">${repo.html_url}</a>
        <br>
        
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a>
        <br>
        
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a>
        </li>`
          );
  }).join('') + "</ul>";
  
  document.getElementById("repositories").innerHTML = repoList;
}