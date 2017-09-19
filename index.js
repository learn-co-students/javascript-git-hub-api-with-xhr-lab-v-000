function getRepositories (){
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${document.getElementById('username').value}/repos`)
  req.send()
}

function displayRepositories (event){
  var repos = JSON.parse(this.responseText)
  var repoList = '<ul id="repo-list">'
  repos.forEach((currentRepo)=>{  
    repoList += `<li><a href="${currentRepo.html_url}" data-username="${currentRepo.owner.login}" data-repository="${currentRepo.name}">${currentRepo.name}</a> - <a href="#" onclick="getCommits(this)" data-username="${currentRepo.owner.login}" data-repository="${currentRepo.name}">Get Commits</a> - <a href="#" onclick="getBranches(this)" data-username="${currentRepo.owner.login}" data-repository="${currentRepo.name}">Get Branches</a></li>`
  })
   document.getElementById("repositories").innerHTML = repoList
}
  
function getCommits (link){
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${link.dataset.username}/${link.dataset.repository}/commits`)
  req.send()
}

function displayCommits (event){
  var commits = JSON.parse(this.responseText)
  var commitList = '<ul id="commit-list">'
  commits.forEach((currentCommit)=>{  
    commitList += `<li>${currentCommit.author.login} - ${currentCommit.commit.author.name} - ${currentCommit.commit.message}</li>`
  })
   document.getElementById("details").innerHTML = commitList
  }
  
  function getBranches (link){
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${link.dataset.username}/${link.dataset.repository}/branches`)
  req.send()
}

function displayBranches (event){
  var branches = JSON.parse(this.responseText)
  var branchList = '<ul id="branch-list">'
  branches.forEach((currentBranch)=>{  
    branchList += `<li>${currentBranch.name}</li>`
  })
   document.getElementById("details").innerHTML = branchList
  }
  