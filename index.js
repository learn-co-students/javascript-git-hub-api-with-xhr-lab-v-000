function getRepositories() {
  const userName = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${userName}/repos`);
  req.send();
}

function displayCommits(){
  const commits = JSON.parse(this.responseText);
  const commitDetails = commits.map(commit => {
                          const str =`${commit.commit.author.name}, ${commit.author.login}, ${commit.commit.message}<br>`;
                          return str;
                        });
  document.getElementById("details").innerHTML = commitDetails.join("");
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchDetails = branches.map(branch => {
                          const str= `${branch.name}<br>`
                          return str;
                        });
  debugger;
  document.getElementById("details").innerHTML = branchDetails.join("");
}

function displayRepositories(){
  const repos = JSON.parse(this.responseText);
  const repoLinks = repos.map(repo => {
    const link = `
                  ${repo.name}<br>
                  <a href="${repo.html_url}">${repo.html_url}</a>
                  <br>
                  <a href="${repo.html_url}">${repo.html_url}</a><br>
                  <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onclick="getCommits(this)">Get Commits</a><br>
                  <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onclick="getBranches(this)">Get Branches</a></li>
                  <br>
                  `;
    return link;
  });
  document.getElementById("repositories").innerHTML = repoLinks.join("");
}

function getBranches(link){
  const repo = link.dataset.repository
  const uri = "https://api.github.com" + "/repos/" + link.dataset.username + "/" + repo + "/branches";
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", uri);
  req.send();
}

function getCommits(link){
  const repo = link.dataset.repository;
  const uri = "https://api.github.com" + "/repos/" + link.dataset.username + "/" + repo + "/commits";
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", uri);
  req.send();
}
