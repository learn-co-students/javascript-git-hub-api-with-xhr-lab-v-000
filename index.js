function showRepositories(event, data) {
    debugger;
    console.log(this.responseText)
}

function getRepositories() {
    const username = document.getElementById("username").value;
    console.log(username)
    const req = new XMLHttpRequest()
    req.addEventListener("load", showRepositories);
    req.open("GET", `https://api.github.com/users/${username}/repos`)
    req.send()
}

function getCommits(el) {
   
}

function showCommits() {

}

