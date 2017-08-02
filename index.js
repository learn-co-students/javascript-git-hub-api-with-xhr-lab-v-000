function displayRepositories(event,data) {
    console.log('callback called')
    const repos = JSON.parse(this.responseText)

    const repos_li = repos.map( repo => `<li><a href="${repo.html_url}">${repo.name}</a> - (<a href="#" data-username='${repo.owner.login}' data-repository='${repo.name}' onclick='getCommits(this)'>commits</a> <a href="#" data-username='${repo.owner.login}' data-repository='${repo.name}' onclick='getBranches(this)'>branches</a>)</li>`)
    document.getElementById("repositories").innerHTML = '<ul>' + repos_li + '</ul>'
}
function getRepositories() {
    const username = document.getElementById("username").value
    const req = new XMLHttpRequest()
    req.addEventListener("load",displayRepositories)
    req.open("GET", `https://api.github.com/users/${username}/repos`)
    req.send()
}
function displayBranches(event,data){
    const branches = JSON.parse(this.responseText);
    const branches_li = branches.map(b => `<li>${b.name}</li>`)
    document.getElementById("details").innerHTML = "<ul>" + branches_li + "</ul>"
}
function getBranches(el){
    const repo = el.dataset.repository;
    const username = el.dataset.username;

    const req = new XMLHttpRequest()
    req.addEventListener("load",displayBranches)
    req.open("GET", `https://api.github.com/repos/${username}/${repo}/branches`)
    req.send()
}
function displayCommits(event,data){
    const commits = JSON.parse(this.responseText);
    const commits_li = commits.map(c => `<li>${c.author.login} - (${c.commit.author.name}) - ${c.commit.message} </li>`)
    document.getElementById("details").innerHTML = "<ul>" + commits_li + "</ul>"
}
function getCommits(el){
    const repo = el.dataset.repository;
    const username = el.dataset.username;

    const req = new XMLHttpRequest()
    req.addEventListener("load",displayCommits)
    req.open("GET", `https://api.github.com/repos/${username}/${repo}/commits`)
    req.send()
}