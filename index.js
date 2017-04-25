 function getRepositories() {
 	var username = document.getElementById("username").value;
 	console.log(username);

	const req = new XMLHttpRequest();
	req.addEventListener("load", displayRepositories);
	req.open("GET", 'https://api.github.com/users/' + username + '/repos')
	req.send()
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepoName = 'data-repository="' + repo.name + '"'
    return(`
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`
          )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/'+ el.dataset.username + '/' + name + '/commits')
  req.send()
}

function displayCommits(){
  var response = JSON.parse(this.responseText)
  console.log(response)
  var commitList = `<ul>${response.map(commit => {
    return '<li>' + commit.author.login + ' - ' + commit.commit.author.name + ' - ' + commit.commit.message + '</li>'
  }).join('')}</ul>`
  document.getElementById("details").innerHTML = commitList
}

function getBranches(el){
    var repo = el.dataset.repository
    var owner = el.dataset.username

    const req = new XMLHttpRequest();
    req.addEventListener("load", displayBranches);
    req.open("GET", "https://api.github.com/repos/" + owner + "/" + repo + "/branches")
    req.send()
}

function displayBranches(){
    var branches = JSON.parse(this.responseText)
    var branchList = `<div>This is the list of branches</div><ul>${branches.map(branch => {
    return '<li>' + branch.name + '</li>'
  }).join('')}</ul>`
    document.getElementById("details").innerHTML = branchList
}

