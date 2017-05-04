function displayRepositories(event,data) {
    console.log('callback called')
    const repos = JSON.parse(this.responseText)
    
    const repos_li = repos.map( repo => `<li><a href="${repo.html_url}">${repo.name}</a> - <a href="#" data-username='${repo.owner.login}' data-repository='${repo.full_name}' onclick='getCommits(this)'>commits</a></li>`)
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
    
}
function getBranches(){
    
}
function displayCommits(event,data){
    
}
function getCommits(){
    
}