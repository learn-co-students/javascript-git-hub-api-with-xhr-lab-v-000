document.getElementById("repo-username").addEventListener("submit", function(e) {
  e.preventDefault();
});

function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
};

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const reposList = `<ul>
    ${repos.map(r => `<li><strong><a href="${r.html_url}">${r.name}</a></strong> -
                      <a href="#" onclick="getCommits(this)" data-repository="${r.name}" data-username="${r.owner.login}">Get Commits</a>
                      <a href="#" onclick="getBranches(this)" data-repository="${r.name}" data-username="${r.owner.login}">Get Branches</a>
                      </li>`
                ).join("")}
  </ul>`;
  document.getElementById("repositories").innerHTML += reposList;
};

function getCommits(element) {
  var user = element.dataset.username;
  var repository = element.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${user}/${repository}/commits`);
  req.send();
};

function displayCommits() {
  var results = JSON.parse(this.responseText);
  const commitsList = `<ul>
      ${results.map(r => `<li>
                            <strong>${r.committer === null ? "unknown" : r.committer.login}</strong>
                            (${r.commit.author.name})
                            - ${r.commit.message}
                          </li>`
                    ).join("")}
                        </ul>`;
  document.getElementById("details").innerHTML = commitsList;
}

function getBranches(element) {
  var user = element.dataset.username;
  var repository = element.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${user}/${repository}/branches`);
  req.send();
};



function displayBranches() {
  var results = JSON.parse(this.responseText);
  const branchesList = `<ul>
      ${results.map(r => `<li>
                            ${r.name}
                          </li>`
                    ).join("")}
                    </ul>`;
  document.getElementById("details").innerHTML = branchesList;
}
