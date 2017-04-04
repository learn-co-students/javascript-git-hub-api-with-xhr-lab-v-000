function getRepositories() {
  const username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", "https://api.github.com/users/" + username + "/repos")
  req.send()
}

function displayRepositories() {
  const result = JSON.parse(this.responseText)

  const html = "<ul>" + result.map(repo =>
    `<li>
      ${repo.name} - <a href="${repo.html_url}">link</a> -
      <a href="#" data-repository="${repo.name}" data-username="${repo.owner.login}" onclick="getCommits(this); return false;">Commits</a> -
      <a href="#" data-repository="${repo.name}" data-username="${repo.owner.login}" onclick="getBranches(this); return false;">Branches</a>
    </li>`).join("")
  + "</ul>"

  document.getElementById("repositories").innerHTML = html
}

function getCommits(el) {
  const repo = el.dataset.repository
  const username = el.dataset.username

  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${repo}/commits`)
  req.send()
}

function displayCommits() {
  const result = JSON.parse(this.responseText)
  console.log(result)
  const html = "<ul>" + result.map(commit =>
    `<li>
      ${commit.commit.author.name} - ${commit.author.login} - ${commit.commit.message}
    </li>`).join("")
  + "</ul>"

  document.getElementById("details").innerHTML = html
}

function getBranches(el) {
  const repo = el.dataset.repository
  const username = el.dataset.username

  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username}/${repo}/branches`)
  req.send()
}

function displayBranches() {
  const result = JSON.parse(this.responseText)
  console.log(result)
  const html = "<ul>" + result.map(branch =>
    `<li>
      ${branch.name}
    </li>`).join("")
  + "</ul>"

  document.getElementById("details").innerHTML = html
}
