function displayCommits(event, data){
	const commits = JSON.parse(this.responseText);
	console.log(commits);
	const commitsList = `<ul>${commits.map(c => '<li>' + c.author.login + ' - ' + c.commit.author.name + ' - ' + c.commit.message).join("")}</ul>`
	document.getElementById("details").innerHTML = commitsList
}

function displayBranches(){
	const branches = JSON.parse(this.responseText);
	console.log(branches);
	const branchesList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join("")}</ul>`;
	document.getElementById("details").innerHTML = branchesList;
}

function displayRepositories(event, data){
	const repos = JSON.parse(this.responseText);
	console.log(repos);
	const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - ' + r.html_url + '<a href="#" data-username="' + r.owner.login + '"data-repo="' + r.name + '"onclick="getCommits(this);"> Get Commits</a> <a href="#" data-username="' + r.owner.login + '"data-repo="' + r.name + '"onclick="getBranches(this);"> Get Branches</a></li>').join("")}</ul>`
	document.getElementById("repositories").innerHTML = repoList;
}

function getRepositories(username){
	var name = document.getElementById("username").value;
	const req = new XMLHttpRequest();
	req.addEventListener("load", displayRepositories);
	req.open("GET", "https://api.github.com/users/" + name + "/repos");
	req.send();
}

function getCommits(item){
	
	console.log(item.dataset);
	const req = new XMLHttpRequest();
	req.addEventListener("load", displayCommits);
	req.open("GET", "https://api.github.com/repos/" +  item.dataset.username; + "/" + item.dataset.repo + "/commits");
	req.send()
}

function getBranches(item){
	const username = item.dataset.username;
	const repo = item.dataset.repo;
	const req = new XMLHttpRequest();
	req.addEventListener("load", displayBranches);
	req.open("GET", "https://api.github.com/repos/" + username + "/" + repo + "/branches");
	req.send();
}