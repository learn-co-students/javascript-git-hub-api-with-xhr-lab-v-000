const rootURL = 'https://api.github.com'

function getRepositories() {
	const name = document.getElementById('username').value
	const uri = rootURL + '/users/' + name + '/repos'
	const req = new XMLHttpRequest()
	req.addEventListener('load', displayRepositories)
	req.open('Get', uri)
	req.send()
}

function displayRepositories(event, data) {
	const repos = JSON.parse(this.responseText)
	const repoList = '<ul>' + repos.map(repo => {
		const dataUsername = 'data-username="' + repo.owner.login + '"'
		const dataRepoName = 'data-repository="' + repo.name + '"'
		return(`
			<li>
				<h2><a href="${repo.html_url}">${repo.name}</a></h2><br>
				<a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
				<a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a>
			</li>
			`)
	}).join('') + "</ul>";

	document.getElementById('repositories').innerHTML = repoList
}

function getCommits(el) {
	const username = el.dataset.username
	const repoName = el.dataset.repository
	const uri = rootURL + '/repos/' + username + '/' + repoName + '/commits'
	const req = new XMLHttpRequest()
	req.addEventListener('load', displayCommits);
	req.open('Get', uri)
	req.send()
}

function displayCommits() {
	const commits = JSON.parse(this.responseText)
	const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`

	document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
	const username = el.dataset.username
	const repoName = el.dataset.repository
	const uri = rootURL + '/repos/' + username + '/' + repoName + '/branches'
	const req = new XMLHttpRequest()
	req.addEventListener('load', displayBranches);
	req.open('Get', uri)
	req.send()
}

function displayBranches() {
	const branches = JSON.parse(this.responseText)
	const branchesList = `<ul>${branches.map(branch => '<li><h3>' + branch.name + '</h3></li>').join('')}</ul>`

	document.getElementById('details').innerHTML = branchesList
}




