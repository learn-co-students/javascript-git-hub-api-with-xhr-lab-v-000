function getRepositories(form){
  const username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories(){
  const data = JSON.parse(this.responseText);
  document.getElementById('repositories').innerHTML = '<ul>' + data.map((repo)=>{

    return `<li><a href="${repo.html_url}">${repo.name}</a> ` +
           `<a data-repository="${repo.name}" data-username="${repo.owner.login}" href="javascript:void(0)" onclick="getCommits(this)">Commits</a> ` +
           `<a data-repository="${repo.name}" data-username="${repo.owner.login}" href="javascript:void(0)" onclick="getBranches(this)">Branches</a></li>`;
  }).join('')+'</ul>';
}

function getCommits(link){
  const username = link.dataset.username;
  const repository = link.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${repository}/commits`);
  req.send();
}

function displayCommits(){
  const data = JSON.parse(this.responseText);
  document.getElementById('details').innerHTML = '<ul>' + data.map((commit)=>{
    let author_login = '???';
    if(commit.author)author_login = commit.author.login;
    return `<li><p>${author_login} - ${commit.commit.author.name}</p><p>${commit.commit.message}<p></li>`;
  }).join('') +'</ul>';
}

function getBranches(link){
  const username = link.dataset.username;
  const repository = link.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${repository}/branches`);
  req.send();
}

function displayBranches(){
  const data = JSON.parse(this.responseText);
  document.getElementById('details').innerHTML = this.responseText;
  document.getElementById('details').innerHTML = '<ul>' + data.map((branch)=>{
    return `<li>${branch.name}</li>`;
  }).join('') +'</ul>';
}
