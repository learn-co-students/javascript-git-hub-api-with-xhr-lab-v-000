function getRepositories() {
  // set a variable to the inputted data on the form, in this case the username
  var username = document.getElementById("username").value;

  // initialize a new instance of the XMLHttpRequest
  const req = new XMLHttpRequest();

  // add an event listener on load that will send that data to displayRespositories
  req.addEventListener("load", displayRepositories);

  // request the data (GET request) by the users public repository (we interpolated the username into the url)
  req.open("GET", `https://api.github.com/users/${username}/repos`);

  // makes this whole shindig happen
  req.send();
}

function displayRepositories() {
  // parse the data with JSON
  const repos = JSON.parse(this.responseText)

  // iterate through each repos object, displaying name, html_url, and also other links to show the commits and branches
  const repoList = "<ol>" + repos.map(r => {
    const dataUsername = 'data-username="' + r.owner.login + '"'
    const dataRepoName = 'data-repository="' + r.name + '"'
    return(`
          <li>
            <p><strong>${r.name}</strong></p>
            <a href="${r.html_url}">${r.html_url}</a><br>
            <ul>
              <li>
                <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
              </li>
              <li>
                <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
              </li>
            </ul>
          `)
  }).join('') + "</ol>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(element) {
  var username = element.dataset.username;
  var repo = element.dataset.repository;

  const req = new XMLHttpRequest()

  req.addEventListener("load", displayCommits);

  req.open("GET", `https://api.github.com/repos/${username}/${repo}/commits`);

  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)

  const commitList = commits.map(commit =>  {
    return(`
      <p>
        <strong>${commit.commit.author.name}</strong>
        (${commit.author.login})
      </p>
      <p>${commit.commit.message}</p>
      `)
  }).join('');
  document.getElementById("details").innerHTML = commitList
}

function getBranches(element) {
  var username = element.dataset.username;
  var repo = element.dataset.repository;

  const branch = new XMLHttpRequest()

  branch.addEventListener("load", displayBranches);

  branch.open("GET", `https://api.github.com/repos/${username}/${repo}/branches`)

  branch.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)

  const branchList = "<ul>" + branches.map(branch => {
    return(`
      <p><strong>${branch.name}</strong></p>
      `)
  }).join('')
  document.getElementById("details").innerHTML = branchList
}





