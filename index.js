var user = null;

function displayRepositories(event) {
	//debugger
	console.log(this.responseText);
	var repos = JSON.parse(this.responseText);

	const repoList = `<ul>${repos.map(
	      r =>
		"<li>" +
		r.name +
		"</br>"+
		" - <a href='"+r.html_url+"'>"+r.name+"</a></br>" +
		' - <a href="#" data-username="'+r.owner.login+'" data-repository="' +
		r.name +
		'" onclick="getCommits(this); return false;">Get Commits</a>' +
		' | <a href="#" data-owner="'+r.owner.login+' data-repo="'+r.name+'" onclick="getBranches(this); return false">Get Branches</a></li>'
	      ).join("")}</ul>`;
	document.getElementById('repositories').innerHTML += repoList;
}

function getRepositories() {
	user = document.getElementsByName("username")[0].value;
	var url = 'https://api.github.com/users/'+user+'/repos';
	const req = new XMLHttpRequest();
	req.addEventListener("load", displayRepositories);

	req.open("GET", url);
	req.send()
}


function getCommits(element) {
	  
	  const repoName = element.dataset.repository;
	  const repoUser = element.dataset.username;
	  const req = new XMLHttpRequest();
	  req.addEventListener("load", displayCommits, false);
	  req.open("GET", "https://api.github.com/repos/"+repoUser+"/" + repoName + "/commits");
	  req.send();
}

function displayCommits() {

	const commits = JSON.parse(this.responseText);
	const commitsList = `<ul>${commits
	  .map(
	    commit => 
		"<li><strong>" +
		commit.commit.author.name +
		" ("+commit.author.login+") " +
		"</strong> - " +
		commit.commit.message + "</br>" +
		"</li>"//missing link to comit?
	  ).join("")}</ul>`;
	document.getElementById("details").innerHTML = commitsList;
}

function getBranches(element) {
	const req = new XMLHttpRequest();
	const user = element.dataset.username;
	const repo = element.dataset.repository;
	req.addEventListener("load", displayBranches, false);
	req.open("GET", "https://api.github.com/repos/"+user+"/"+repo+"/branches");
	req.send();
}

function displayBranches() {
	const branches = JSON.parse(this.responseText);
	const listBranches = `<ul>${branches
	 .map(
	  branch =>
		"<li><strong>"+
		branch.name+"</strong></br>"+
		"<a href=# data-username='"+branch.author+"' data-repo='"+branch.repo+"'></a>"
	).join("")}</ul>`;
				
	
	document.getElementById("details").innerHTML = listBranches;
}
