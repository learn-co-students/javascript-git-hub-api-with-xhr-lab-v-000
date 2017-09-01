function displayRepositories(event, data){
  var repos = JSON.parse(this.responseText);
  console.log(repos)

  const repoList = `<ul>${repos.map(r => '<li>'+ `https://github.com/${r.owner.login}/${r.name}`  + '<br>' + ' <a href="#" username="' + r.owner.login + '" repository="' + r.owner.url + '" data-repo="' + r.name + '"  onclick="getCommits(this)">Get Commits</a> <a href="#" username="' + r.owner.login + '" repository="' + r.owner.url + '" data-repo="' + r.name + '"  onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`

  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories(){
  const username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET",
  `https://api.github.com/users/${username}/repos`)
  req.send()
}

function getCommits(el){
  const username = document.getElementById("username").value
  const repo = el.dataset.repo
  const req = new XMLHttpRequest()

  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${repo}/commits`)
  req.send()
}

function displayCommits(){
  const commits = JSON.parse(this.responseText)
  const username = document.getElementById("username").value
  console.log(commits)

  const commitsList =
`<h4> Login: ${commits[0].author.login} ***** Name: ${commits[0].commit.author.name} </h4>` +

`<ul>${commits.map(commit => '<li>' + commit.commit.message + '</li>').join('')}</ul>`

  //
  // `${commits.map(commit => commit.author.login +  commit.commit.author.name + commit.commit.message )}`

  document.getElementById("details").innerHTML = commitsList
}


function displayBranches(){
const branches = JSON.parse(this.responseText)
console.log(branches)

const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong>' + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

function getBranches(el){
  const reponame = el.dataset.repo
  const username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username}/${reponame}/branches`)
  req.send()
}
