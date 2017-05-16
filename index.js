const rootURL = "https://api.github.com"

function getRepositories() {
	const username = document.getElementById('username').value;
	document.getElementById("repositories").innerHTML = username;
	const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li><a href="' + r.html_url + '">' + r.name + '</a> - <a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(element) {
	// first we grab the username generated from showRepositories()
	// using dataset
	//const repo = element.dataset.repo 
	const repoName = element.dataset.repository
	const username = element.dataset.username
	// Next we open another XHR request
	const req = new XMLHttpRequest()
	// We add an eventlistener to fire showCommits() once we get the data
  req.addEventListener("load", displayCommits);
  // Here we dynamically insert the data
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repoName + '/commits')
  req.send()
}

function displayCommits() {
	const commits = JSON.parse(this.responseText)
	console.log(commits)

  const commitsList = `<ul>${commits.map(commit => `<li><a href="#" data-username="${commit.author.login}" data-repo="${commit.commit.tree.url}" onclick="getBranches(this)">${commit.author.login} | ${commit.commit.author.name} - ${commit.commit.message}</a></li>`
  		).join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(element) {
	const username = element.dataset.username
	// const repository = element.dataset.repo
	const req = new XMLHttpRequest()
	req.addEventListener("load", displayBranches)
	//req.open('GET', 'https://api.github.com/repos/' + username + '/' + repository + '/branches')
	req.open('GET', rootURL + '/repos/' + element.dataset.username + '/' + element.dataset.repository + '/branches')
	req.send()
}

function displayBranches() {
	const branches = JSON.parse(this.responseText)
	const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
	document.getElementById("details").innerHTML = branchesList
}

