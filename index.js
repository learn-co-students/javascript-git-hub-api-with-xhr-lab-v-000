//getRepositories function that loads the repositories div with a list of public repositories for that user
function getRepositories() {
  const req = new XMLHttpRequest()
  var username = document.getElementById("username").value;
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

//The displayed repositories should include the name and a link to the URL (HTML URL, not API URL).
//Add a link to each repository that calls a getCommits function on click 
//Add a link to each repository that calls a getBranches function when clicked
function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + `<a href="${r.html_url}" >${r.name }</a>`
  + r.owner.login  + '<a href="#" data-repository="' + r.name + '" onclick="getBranches(this)">  Get Branches</a>' + ' ---- <a href="#" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository
  var username = document.getElementById("username").value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`)
  req.send()
}

/*then the request is complete, calls a displayCommits function that fills the details div with a list of commits for that repository. 
The display of commits should include the author's Github name, the author's full name, and the commit message. Give the link data 
attributes of username and repository to be used by the getCommits function.*/

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}


function getBranches(el) {
  const name = el.dataset.repository
  var username = document.getElementById("username").value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${username}/` + name + '/branches')
  req.send()
}


/*when complete, calls a displayBranches function that fills the details div with a list of names of each branch of the repository. 
Give the link data attributes of username and repository for use by the getBranches function.*/
function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(branch => '<li>' + branch.name + ' - </li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchList
 }