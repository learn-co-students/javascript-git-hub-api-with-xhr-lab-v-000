function displayRepositories(event, data){
  var repos = JSON.parse(this.responseText);
  console.log(repos)
// username="' + r.owner.login +'"
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" username="' + r.owner.login + '" repository="' + r.owner.url + '" data-repo="' + r.name + '"  onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`

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
  const repo_name = el.dataset.repo
  const req = new XMLHttpRequest()

  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${repo_name}/commits`)
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
// commit.commit.author.name
// commit.commit.message
// expect(el.innerHTML).toMatch(/Monalisa Octocat/)
// expect(el.innerHTML).toMatch(/octocat/)
// expect(el.innerHTML).toMatch(/Fix all the bugs/)
// })

// The display of commits should include the author's Github name, the author's full name, and the commit message. Give the link data attributes of username and repository to be used by the getCommits function.
