const api = 'https://api.github.com';
function getRepositories() {
  const username = document.querySelector('#username').value;
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayRepositories);
  xhr.open("GET", `${api}/users/${username}/repos`);
  xhr.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(repo => `
    <li>
      <h2>${repo.name}</h2>
      <a href="${repo.html_url}" target="_blank">View ${repo.name} on GitHub</a>
      <a href="#" data-username="${repo.owner.login}" data-repo="${repo.name}" onclick="getCommits(this)">Get Commits</a>
      <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onclick="getBranches(this)">Get Branches</a>
    </li>`).join('')}</ul>`;
  document.querySelector('#repositories').innerHTML = repoList;
}

function getCommits(el) {
  const username = el.dataset.username;
  const repoName = el.dataset.repository;
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayCommits);
  xhr.open('GET', `${api}/repos/${username}/${repoName}/commits`);
  xhr.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => `
    <li>
      <h3>${commit.commit.author.name} (${commit.author.login})</h3>
      <p>${commit.commit.message}</p>
    </li>`).join('')}</ul>`;
  document.querySelector('#details').innerHTML = commitsList;
}

function getBranches(el) {
  const username = el.dataset.username;
  const repoName = el.dataset.repository;
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayBranches);
  xhr.open('GET', `${api}/repos/${username}/${repoName}/branches`);
  xhr.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => `<li>${branch.name}</li>`).join('')}</ul>`;
  document.querySelector('#details').innerHTML = branchesList;
}

document.querySelector('form').addEventListener('submit', getRepositories);
