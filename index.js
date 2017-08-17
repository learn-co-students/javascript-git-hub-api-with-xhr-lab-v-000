function getRepositories(el){
  // console.log(el);
  var req = new XMLHttpRequest();
  // /users/:username/repos
  const username = document.getElementById('username').value;
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/'+username+'/repos');
  req.send();
}

function displayRepositories() {
  // console.log(JSON.parse(this.responseText)[0]);
  const repos = JSON.parse(this.responseText);
  const repoList = `<ul> ${repos.map(r => {return '<li> <a href="'+r.html_url+'">'+r.name+'</a></br> <a href="#" data-username="'+r.owner.login+'" data-repository="'+r.name+'" onclick="getCommits(this)"> Get Commits</a></br><a href="#" data-username="'+r.owner.login+'" data-repository="'+r.name+'" onclick="getBranches(this)"> Get Branches</a></br></li>'}).join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

// /repos/:owner/:repo/commits/
function getCommits(el) {
  const owner = el.dataset.username;
  const repo = el.dataset.repository;
  var req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/'+owner+'/'+repo+'/commits');
  console.log('https://api.github.com/repos/'+owner+'/'+repo+'/commits')
  req.send();
}

function displayCommits() {
  const commits  = JSON.parse(this.responseText);
  // console.log(commits[0].commit.author);
  const commitList = `<ul>${commits.map(c => '<li>'+c.commit.author.name+'</br> '+c.author.login+'</br>'+c.commit.message+'</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = commitList;
}

function getBranches(el) {
  const owner = el.dataset.username;
  const repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/'+owner+'/'+repo+'/branches');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  // console.log(branches[0])
  const branchList = `<ul>${branches.map(b => '<li>'+b.name+'</li>').join('')}</ul>`
  document.getElementById('details').innerHTML = branchList;
}
