const rootURL = "https://api.github.com/"

function getRepositories() {
    const username = document.getElementById("username").value;
    const req = new XMLHttpRequest();
    const uri = rootURL + "users/" + username + "/repos"
    req.addEventListener("load", displayRepositories);
    req.open("GET", uri);
    req.send();
}

function displayRepositories(event, data) {
    const repos = JSON.parse(this.responseText);
    const repoList = "<ul>" + repos.map(r => {
        return(`
        <li>
            <h2>${r.name}</h2>
            <a href="${r.html_url}"></a><br>
            <a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getBranches(this)">Get Branches</a>
        </li>`)
    }) + "</ul>";
    document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
    const uri = rootURL + "repos/" + el.dataset.username + "/" + el.dataset.repository + "/commits"
    console.log(el.dataset);
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", displayCommits);
    xhr.open("GET", uri);
    xhr.send();
}

function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList =
    `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + '(' + commit.author.login + ')</h3>' + commit.commit.message + '</li>')}</ul>`;
    document.getElementById("details").innerHTML = commitsList;
}

function getBranches(el) {
    const uri = rootURL + "repos/" + el.dataset.username + "/" + el.dataset.repository + "/branches"
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", displayBranches);
    xhr.open("GET", uri);
    xhr.send();
}

function displayBranches() {
    const branches = JSON.parse(this.responseText);
    const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>')}</ul>`
    document.getElementById("details").innerHTML = branchesList;
}
