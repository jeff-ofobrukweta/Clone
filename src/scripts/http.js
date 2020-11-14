const baseUrl = "https://api.github.com/graphql";

const fetch = require("node-fetch");
const openSource = {
  githubConvertedToken : "bebc0c2116b496d798397d8a2f710a86c8b5694b",
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
  .then((res) => console.log(">>>>>>>>>>",res))
  .catch((error) => console.log(JSON.stringify(error)));