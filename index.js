const rootURL = "https://api.github.com"

function getRepositories() { //defines function that gets repositories 
  const name = document.getElementById("username").value //sets constant to input value of username in form 
  const uri = rootURL + "/users/" + name + "/repos" //constanct that will be called in "open"
  const xhr = new XMLHttpRequest() //sets constant to new request
  xhr.addEventListener("load", displayRepositories) //adds event listener and callback function
  xhr.open("GET", uri) //creates an instance of the request
  xhr.send() //makes the request
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText) //sets constant to a JSON.parse function that converts string to object
  const repoList = repos.map(function(repo) { //sets constant to function with parameter
    const dataUsername = 'data-username="' + repo.owner.login + '"' 
    const dataRepoName = 'data-repository="' + repo.name + '"'
    return(`
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br> //sets available function to get commits -> 'this' is the DOM element
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li> //similar to above
          </li>`
          )
  }).join('') + "</ul>"; //'joins' the strings of the array into one string
  document.getElementById("repositories").innerHTML = repoList //adds list from function to DOM
}

function getCommits(el) {
  const repoName = el.dataset.repository //sets repoName to repository
  const uri = rootURL + "/repos/" + el.dataset.username + "/" + repoName + "/commits"
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayCommits)
  xhr.open("GET", uri)
  xhr.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const repoName = el.dataset.repository
  const uri = rootURL + "/repos/" + el.dataset.username + "/" + repoName + "/branches"
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayBranches)
  xhr.open("GET", uri)
  xhr.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}