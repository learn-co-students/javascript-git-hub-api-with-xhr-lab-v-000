function getRepositories() {
    const username = document.getElementById('username').value;
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayRepositories);
    req.open("GET", 'https://api.github.com/users/' + username + '/repos');
    req.send();
}

function displayRepositories(event, data) {
    var repos = JSON.parse(this.responseText);
    const repoList = "<ul>" + repos.map(r => {
        const dataUsername = 'data-username="' + r.owner.login + '"';
        const dataRepoName = 'data-repository="' + r.name + '"';
        return (
            `<li>
                <h2>${r.name}</h2>
                <a href="${r.html_url}">${r.html_url}</a><br>
                <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
                <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a>
            </li>`
        );
    }).join('') + "</ul>";
    document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
    const repo = el.dataset.repository;
    const username = el.dataset.username;

    const req = new XMLHttpRequest();
    req.addEventListener("load", displayCommits);
    req.open("GET", "https://api.github.com" + "/repos/" + username + "/" + repo + "/commits");
    req.send();
}

function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.committer.login + '</strong>(' + commit.commit.author.name + ') - ' + commit.commit.message + '</li>').join('')}</ul>`
    document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
    const repo = el.dataset.repository;
    console.log(el)
    const username = el.dataset.username;
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayBranches);
    req.open("GET", 'https://api.github.com/repos/' + username + '/' + repo + '/branches');
    req.send();
}

function displayBranches() {
    const branches = JSON.parse(this.responseText);
    const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList;
}