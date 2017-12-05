function callRequest(apiQuery, callback) {
    const req = new XMLHttpRequest()
    req.addEventListener("load", callback)
    req.open("GET", apiQuery)
    req.send()
}

function getRepositories() {
    username = document.getElementById("username").value
    let apiQuery = 'https://api.github.com/users/' + username + '/repos'
    callRequest(apiQuery, displayRepositories)
}

function displayRepositories(event, data) {
    const repos = JSON.parse(this.responseText)
    let user = repos[0].owner.login
    const repoList = `<br><ul>${repos.map(repo => '<li>' + repo.name +
        '<br> - <a href="#" data-repository="' + repo.name + '" data-username= "' + user +
        '" onclick="getCommits(this)">Get Commits</a></li>' +
        ' - <a href="#" data-repository="' + repo.name + '" data-username= "' + user +
        '" onclick="getBranches(this)">Get Branches</a></li>' + '<br>' +
        '- <a href="' + repo.html_url + '">View on GitHub</a></li>'
    ).join('')}</ul>
  `

    document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
    let apiQuery = `https://api.github.com/repos/${el.dataset.username}/${el.dataset.repository}/commits`
    callRequest(apiQuery, displayCommits)
}


function displayCommits(event, data) {
    const commits = JSON.parse(this.responseText)
    const commitsList = commits.map(function (commit) {
        let author = ""
        let message = ""
        let name = ""
        if (commit.author) {
            author = commit.author.login
        }
        if (commit.commit.message) {
            message = commit.commit.message
        }
        if (commit.commit.committer.name) {
            name = commit.commit.committer.name
        }
        return '<li><strong>' + author + '</strong>' + '</li><em>' + name + '</em> - ' + message + '</li>'
    })
    document.getElementById("details").innerHTML = '<ul>' + commitsList.join('') + '</ul>'
}

function getBranches(el) {
    let apiQuery = `https://api.github.com/repos/${el.dataset.username}/${el.dataset.repository}/branches`
    callRequest(apiQuery, displayBranches)
}

function displayBranches(event, data) {
    let branches = JSON.parse(this.responseText)
    const branchesList = `<ul>${branches.map(branch =>
        '<li>' + branch.name + '</li>').join('')}</ul>`
    document.getElementById("details").innerHTML = branchesList
}