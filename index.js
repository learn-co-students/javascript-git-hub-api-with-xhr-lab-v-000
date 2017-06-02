function displayRepositories(event, data) {
	var repos = JSON.parse(this.responseText);
	const repoList = "<ul>" + repos.map(r => {
		var sendUsername = 'data-username="' + r.owner.login + '"';
		var sendRepo = 'data-repository="' + r.name + '"';
		return (
			`<li><strong>${r.name}</strong> -
				 <a href="https://github.com/${r.owner.login}/${r.name}">See Repo</a>
				 <a href="#" ${sendUsername} ${sendRepo} onclick="getCommits(this)">Get Commits</a>
				 <a href="#" ${sendUsername} ${sendRepo} onclick="getBranches(this)">Get Branches</a>
			 </li>`)}).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList;
}

function getRepositories() {
  const req = new XMLHttpRequest()
 	var username = document.getElementById("username").value
  req.addEventListener("load", displayRepositories)
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function getCommits(el) {
  const repository = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList;
}

function displayBranches() {
	const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList;
}

function getBranches(el) {
	const repository = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/branches')
  req.send()
}