
function getRepositories() {
	const req = new XMLHttpRequest();
	const username = document.getElementById("username").value;
	req.addEventListener("load", displayRepositories);
	req.open("GET", 'https://api.github.com/users/' + username + '/repos');
	req.send();
}

function displayRepositories() {
	var repos = JSON.parse(this.responseText);
	console.log(repos);
	const repoList = `<ul>${repos.map(r => '<li>' + r.name + r.html_url + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a>' + ' - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
    document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
	const name = el.dataset.repo;
	const req = new XMLHttpRequest();
	const username = document.getElementById("username").value;
	req.addEventListener("load", displayCommits);
	req.open("GET", 'https://api.github.com/repos/' + username + '/Spoon-Knife/commits');
	req.send();
}

function displayCommits() {
	const commits = JSON.parse(this.responseText);
	const commitsList = `<ul>${commits.map(commit => '<li>' + commit.commit.author.name + ' ' + commit.author.login + ' ' + commit.commit.message + '</li>').join('')}</ul>`;
	document.getElementById("details").innerHTML = commitsList
}


function getBranches(el) {
	const name = el.dataset.repo;
	const req = new XMLHttpRequest();
	const username = document.getElementById("username").value;
	req.addEventListener("load", displayBranches);
	req.open("GET", 'https://api.github.com/repos/' + username + '/Spoon-Knife/branches');
	req.send();
}

function displayBranches() {
	const branches = JSON.parse(this.responseText);
	const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name  + '</li>').join('')}</ul>`;
	document.getElementById("details").innerHTML = branchesList;
}

