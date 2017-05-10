function displayBranches() {
  const detailsDiv = document.getElementById('details');
  const branches = JSON.parse(this.responseText);
  const branchesUl = document.createElement('ul');

  branches.forEach((branch) => {
    const branchLi = branchesUl.appendChild(document.createElement('li'));
    branchLi.innerHTML = branch.name;
  });

  detailsDiv.appendChild(branchesUl);
}

function getBranches(elem) {
  const username = elem.dataset.username;
  const repo = elem.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/branches`);
  req.send();
}

function displayCommits() {
  const detailsDiv = document.getElementById('details');
  const commits = JSON.parse(this.responseText);
  const commitsUl = document.createElement('ul');

  commits.forEach((commit) => {
    const commitLi = commitsUl.appendChild(document.createElement('li'));
    commitLi.innerHTML = `${commit.author.login} (${commit.commit.author.name}): "${commit.commit.message}"`;
  });

  detailsDiv.appendChild(commitsUl);
}

function getCommits(elem) {
  const username = elem.dataset.username;
  const repo = elem.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/commits`);
  req.send();
}

function displayRepositories() {
  const reposDiv = document.getElementById('repositories');
  const repos = JSON.parse(this.responseText);
  const repoUl = document.createElement('ul');

  repos.forEach((repo) => {
    const repoLi = repoUl.appendChild(document.createElement('li'));
    const repoLink = repoLi.appendChild(document.createElement('a'));
    repoLink.href = repo.html_url;
    repoLink.innerHTML = repo.name;

    const commitsLink = `<a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onclick="getCommits(this);"> (get commits)</a><br>`;
    const branchesLink = `<a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onclick="getBranches(this);"> (get branches)</a><br>`;

    repoLi.innerHTML += commitsLink;
    repoLi.innerHTML += branchesLink;
  });

  reposDiv.appendChild(repoUl);
}

function getRepositories() {
  const username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}
