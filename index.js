const rootURL = 'https://api.github.com/';

function getRepositories() {
	const req = new XMLHttpRequest()
	const username = document.getElementById('username').value;
	const uri = rootURL + 'users/' + username + '/repos'
	req.addEventListener("load", displayRepositories);
	req.open("GET", uri)
	req.send(); 
}

function displayRepositories(event, data) {
	var repos = JSON.parse(this.responseText)
	console.log(repos)
	const reposList = repos.map( r => `<li><a href="${r.html_url}">${r.name}</a></li>`)
	document.getElementById("repositories").innerHTML = '<ul>' + reposList + '</ul>'

}

function getCommits(el) {
	const repoName = el.dataset.repository;
	const req = new XMLHttpRequest()
	const username = document.getElementById('username').value;
	const uri = rootURL + 'repos/' + username + '/' + repoName + '/commits'
	req.addEventListener("load", displayCommits);
	req.open("GET", uri)
	req.send();

}

function displayCommits() {
	var commits = JSON.parse(this.responseText)
	console.log(commits)
	const commitsList = commits.map( c => `<li> ${c.author.login} - ${c.commit.author.name} - ${c.commit.message} </li>`)
	document.getElementById('details').innerHTML= "<ul>" + commitsList + "</ul>"
}

function getBranches(el) {
	var branches = el.dataset.repository; 
	const req = new XMLHttpRequest()
	const repoName = el.dataset.repository;
	const username = document.getElementById('username').value;
	req.addEventListener("load", displayBranches);
	const uri = rootURL + 'repos/' + username + '/' + repoName + '/branches'
	req.open("GET", uri)
	req.send(); 
}

function displayBranches() {
	var branches = JSON.parse(this.responseText)
	console.log(branches)
	const branchesList = branches.map( b => `<li> ${b.name} </li>`);
	document.getElementById('details').innerHTML = "<ul>" + branchesList + "</ul>"
}