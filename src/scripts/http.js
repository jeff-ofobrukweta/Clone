const baseUrl = "https://api.github.com/graphql";

const fetch = require("node-fetch");
const openSource = {
  githubConvertedToken : "fa8cbaee793b90d92e279efd59898f824ad5de15",
  githubUserName: "jeff-ofobrukweta"
};
const headers = {
  "Content-Type": "application/json",
  Authorization: "bearer " + openSource.githubConvertedToken,
};




const query_issue = {
  query: `query{
    viewer {
      login
      url
      id
      avatarUrl
      email
      bio
      starredRepositories{
        totalCount
      }
      pullRequests{
        totalCount
      }
      repositories(first: 100, affiliations: [OWNER, COLLABORATOR], ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          name
          url
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
    console.log(res.data.viewer.repositories.nodes);

    document.getElementById("card-info").innerHTML = res.data.viewer.bio;
    document.getElementById("additionalName").innerHTML = res.data.viewer.login;
    document.getElementById("avatar-container-sm").src = res.data.viewer.avatarUrl;
    document.getElementById("avatar-container").src = res.data.viewer.avatarUrl;
    document.getElementById("name-profile").innerHTML = res.data.viewer.login;
    // name-profile
    

  })
  .catch((error) => console.log(JSON.stringify(error)));