function getRepositories() {
    const username = document.getElementById("name-field").value;
    const req = new XMLHttpRequest();
    req.addEventListener("load",showRepositories);
    req.open("GET", `https://api.github.com/users/${usename}/repos`);
    req.send();
}

function showRepositories(event,data) {
    const repos = JSON.parse(this.responseText);
}