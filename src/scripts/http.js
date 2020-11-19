let dotenv = require('dotenv');
dotenv.config();


let baseUrl = process.env.BASE;

let fetch = require("node-fetch");

let openSource = {
  githubConvertedToken: process.env.API_KEY_GITHUB,
  githubUserName: process.env.USER_NAME
};
let headers = {
  "Content-Type": "application/json",
  Authorization: "bearer " + openSource.githubConvertedToken,
};




let query_issue = {
  query: `query{
    viewer {
      login
      url
      id
      name
      avatarUrl
      email
      bio
      status{
        message
      }
      starredRepositories{
        totalCount
      }
      pullRequests{
        totalCount
      }
      repositories( first: 20,orderBy: {field: CREATED_AT, direction: DESC} affiliations: [OWNER, COLLABORATOR], ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          name
          url
          description
          primaryLanguage {
            name
            color
          }
          stargazers {
            totalCount
          }
          forks {
            totalCount
          }
          updatedAt
          owner {
            login
          }
        }
      }
      followers {
        totalCount
      }
    }
		user(login: "${openSource.githubUserName}") {
      status {
        emojiHTML
        emoji
      }
    issues(last: 100, orderBy: {field:CREATED_AT, direction: DESC}){
      totalCount
      nodes{
      	id
        closed
        title
        createdAt
        url
        number
        assignees(first:100){
          nodes{
            avatarUrl
            name
            url
          }
        }
        repository{
          name
          url
          owner{
            login
            avatarUrl
            url
          }
        }
      }
    }
  }
	}`,
};

fetch(baseUrl, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(query_issue),
})
  .then(res => res.json())
  .then((res) => {
    document.getElementById("boom").innerHTML = listRepository(res.data.viewer.repositories.nodes);
    document.getElementById("user-status-emoji-container").innerHTML = res.data.user.status.emojiHTML;
    document.getElementById("user-status-emoji-container-mobile").innerHTML = res.data.user.status.emojiHTML;
    // status
    document.getElementById("mobile-text-status").innerHTML = res.data.viewer.status.message;
    document.getElementById("desktop-text-status").innerHTML = res.data.viewer.status.message;

    document.getElementById("name-profile").innerHTML = res.data.viewer.name;
    document.getElementById("additionalName").innerHTML = res.data.viewer.login;

    document.getElementById("mobile-name-profile").innerHTML = res.data.viewer.name;
    document.getElementById("mobile-additionalName").innerHTML = res.data.viewer.login;


    document.getElementById("card-info").innerHTML = res.data.viewer.bio;
    document.getElementById("mobile-card-info").innerHTML = res.data.viewer.bio;

    document.getElementById("desk-header-avatar-container-sm").src = res.data.viewer.avatarUrl;
    document.getElementById("avatar-container").src = res.data.viewer.avatarUrl;

    document.getElementById("avatar-profile-user").src = res.data.viewer.avatarUrl;

    document.getElementById("mobile-avatar-user-sm").src = res.data.viewer.avatarUrl;
    document.getElementById("mobile-header-avatar-container-sm").innerHTML = res.data.viewer.login;

    // pg-number
    document.getElementById("pg-number").innerHTML = 20;
    document.getElementById("Counter-pg-number").innerHTML = res.data.viewer.repositories.totalCount;



    // name-profile


  })
  .catch((error) => console.log(JSON.stringify(error)));

  let alphabeticFormat = (date) => {
    if (!date) return;
    let zeroTime = false;
    try {
      let split = date.split("T");
      if (split[1] === "00:00:00") zeroTime = true;
    } catch (error) {}
  
    date = new Date(date);
    let monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
  
    if (day < 10) day = `0${day}`;
    if (hours < 10) hours = `0${hours}`;
    if (mins < 10) mins = `0${mins}`;
    if (secs < 10) secs = `0${secs}`;
  
    //CHECK IF DATE HAS TIME
    if (zeroTime)
      return `${day} ${monthNames[monthIndex]}. ${year} ${hours}:${mins}:${secs}`;
    if (hours === "00" && mins === "00" && secs === "00")
      return `${day} ${monthNames[monthIndex]}. ${year}`;
    return `${day} ${monthNames[monthIndex]}`;
  };

const listRepository = (list = []) =>
  '<ul style="padding: 0px;">' 
  + list.map((item) => {
    return `<li class="col-12 col-md-6 col-lg-6 mb-3 d-flex flex-content-stretch">
        <form class="js-social-form js-form-toggle-target" action="/" accept-charset="UTF-8" method="post">
            <button class="btn btn-sm " type="submit" value="Star" aria-label="Star this repository" title="Star jeff-ofobrukweta/Clone" data-ga-click="Repository, click star button, action:profiles#show; text:Star">
              <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>Star
            </button>
        </form>
        <div class="Box pinned-item-list-item d-flex p-3 width-full public source">
          <div class="pinned-item-list-item-content">
            <div class="d-flex width-full flex-items-center position-relative">
              <a href="/jeff-ofobrukweta/${item.name}" class="text-bold flex-auto min-width-0">
                <span class="repo" title=${String(item.name)} id=${String(item.name)}>${item.name}</span>
              </a>
            </div>
            
            <p class="pinned-item-desc text-gray text-small d-block mt-2 mb-3">
            ${item.description ? item.description : "no availiable description"}
            </p>

            <p class="mb-0 f6 text-gray">
              <span class="d-inline-block mr-3">
                <span class="repo-language-color" style="background-color: ${item.primaryLanguage ? item.primaryLanguage.color : "#f1e05a"}"></span>
                <span itemprop="programmingLanguage">${item.primaryLanguage ? item.primaryLanguage.name : "JavaScript"}</span>
              </span>

              <a href="/jeff-ofobrukweta/uba-reward/stargazers" class="pinned-item-meta muted-link ">
                <svg aria-label="star" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16"
                  height="16" role="img">
                  <path fill-rule="evenodd"
                    d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                  </path>
                </svg>
                ${item.stargazers ? item.stargazers.totalCount : "-"}
              </a>
              <a href="/" class="pinned-item-meta muted-link ">
                <svg aria-label="fork" style="margin-right: 10px;" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1"
                  width="16" height="16" role="img">
                  <path fill-rule="evenodd"
                    d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z">
                  </path>
                </svg>
                ${item.forks ? item.forks.totalCount : "-"}
              </a>
              <a href="/" class="pinned-item-meta muted-link ">
                Updated
                <relative-time datetime="2020-11-17T15:20:34Z" class="no-wrap" title=${item.updatedAt ? alphabeticFormat(item.updatedAt) : "-"}>
                  ${item.updatedAt ? alphabeticFormat(item.updatedAt) : "-"}
                </relative-time>
              </a>
            </p>
          </div>
        </div>
      </li>`;
  }).join('') 
  + '</ul>';
