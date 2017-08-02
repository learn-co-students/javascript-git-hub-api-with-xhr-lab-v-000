function getRepositories(){
	let username = document.getElementById("username").value
	let req = new XMLHttpRequest()
	request_url = "https://api.github.com/users/" + username + "/repos"
	req.open("GET", request_url)
	req.addEventListener("load", displayRepositories)
	req.send()
}

function displayRepositories(){
	var repositories_div = document.getElementById("repositories")
	JSON.parse(this.responseText).forEach(function(repo, i){
    	repositories_div.innerHTML += "<p>" + repo.name + "</p>"
    	repositories_div.innerHTML += "<p>" + repo.html_url + "</p>"
    	// console.log("display_repos repo name: ", repo.name)
    	let obj_for_link = {dataset: {repository:repo.name, username:repo.owner.login}}    	
    	repositories_div.innerHTML += `<a onclick=${getCommits(obj_for_link)}>Get Commits</a>`
    	repositories_div.innerHTML += `<a onclick=${getBranches(obj_for_link)}>Get Branches</a>`
	})
}

function getCommits(commit_element){
	let username = document.getElementById("username").value
	let req = new XMLHttpRequest()
	let repo_name = commit_element.dataset.repository
	 request_url = "https://api.github.com/repos/" + username + "/" + repo_name + "/commits"
	 req.open("GET", request_url)
	 req.addEventListener("load", displayCommits)
	 req.send()
}

function displayCommits(){
	 var detailsDiv = document.getElementById("details")
	   	detailsDiv.innerHTML += "<p>Commits</p>"	 	
	JSON.parse(this.responseText).forEach(function(commit, i){
     	detailsDiv.innerHTML += "<p>" + commit.author.login + "</p>"
     	detailsDiv.innerHTML += "<p>" + commit.commit.author.name + "</p>"
     	detailsDiv.innerHTML += "<p>" + commit.commit.message + "</p>"
	 })
}

function getBranches(branch_element) {
	let username = document.getElementById("username").value
	let req = new XMLHttpRequest()
	let repo_name = branch_element.dataset.repository
    request_url = "https://api.github.com/repos/" + username + "/" + repo_name + "/branches"
	req.open("GET", request_url)
	req.addEventListener("load", displayBranches)
	req.send()
}

function displayBranches() {
		 var detailsDiv = document.getElementById("details")
		 console.log("In display-b:", this.responseText)
      	detailsDiv.innerHTML += "<strong><p>Branches</p></strong>"	 	
	JSON.parse(this.responseText).forEach(function(branch, i){
     	detailsDiv.innerHTML += "<p>" + branch.name + "</p>"
     })
}
