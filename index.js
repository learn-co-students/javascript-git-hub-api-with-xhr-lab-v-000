function getRepositories() {
    const user = document.getElementById("username").value;
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayRepositories);
    req.open("GET", `https://api.github.com/users/${user}/repos`)
    req.send()
 }

 function displayRepositories(event, data) {
    var repos = JSON.parse(this.responseText)
    const repoList = `<ul>${repos.map(r => `<li><h2><a href="${r.html_url}">${r.name}</a><br><a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getCommits(this)">Get Commits</a> |<a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getBranches(this)">Get Branches</a></li>`).join('')}</ul>`;
    document.getElementById("repositories").innerHTML = repoList;
  }

function getCommits(el) {
    const user = el.dataset.username;
    const name = el.dataset.repository; 
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayCommits); 
    req.open("GET", `https://api.github.com/repos/${user}/${name}/commits`);
    req.send()
}

function displayCommits() { 
    const commits = JSON.parse(this.responseText); 
    const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> ' + ' ('+ commit.author.login + ') ' + '- ' + commit.commit.message + '</li>').join('')}</ul>`;
    document.getElementById("details").innerHTML = commitsList; 
}

function getBranches(el) { 
    const user = el.dataset.username;
    const name = el.dataset.repository; 
    const req = new XMLHttpRequest(); 
    req.addEventListener("load", displayBranches); 
    req.open("GET", `https://api.github.com/repos/${user}/${name}/branches`);
    req.send()
}

function displayBranches() { 
    const branches = JSON.parse(this.responseText); 
    const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong> </li>').join('')}</ul>`;
    document.getElementById("details").innerHTML = branchesList;
}