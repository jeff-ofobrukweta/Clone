# Github Clone

A Github clone using github graphql api.


# Coding Challenge
Using the GraphQL GitHub API (https://developer.github.com/v4/explorer/), recreate your github profile page (the tab that lists your repositories). 

### What you SHOULD include:
1. The responsive design of the website. Make your recreation as close to the real website as possible
2. The profile picture and basic description of the account
3. 20 repositories (maximum)

See an example of what the final result should look like - https://res.cloudinary.com/bitkoin/image/upload/v1605131940/frontend_dev_example.png

### What you should NOT include:
1. Pagination/Search functionality - you should load the first 20 repositories only
2. The other tabs (e.g. Overview, Projects, Packages)
3. The graph showing year of activity for the repository

### Other requirements:
- Do not use any CSS or JS framework
- Host your site somewhere (e.g. Netlify or Github Pages)

### Installation

npm install

```
```
### Enviroment Variables

#### Add the folowing credentials to the .env file which should be located in the root folder 
API_KEY_GITHUB = ****github public access key"
USER_NAME = "github username", 
BASE = https://api.github.com/graphql

```
```
### Start Dev Server

```
npm start
```

### Build Prod Version

```
npm run build
```

### Features:

- ES6 Support via [babel](https://babeljs.io/) (v7)
- JavaScript Linting via [eslint-loader](https://github.com/MoOx/eslint-loader)
- SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
- Autoprefixing of browserspecific CSS rules via [postcss](https://postcss.org/) and [autoprefixer](https://github.com/postcss/autoprefixer)
- Style Linting via [stylelint](https://stylelint.io/)

When you run `npm run build` I used the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) to move the css to a separate file. The css file gets included in the head of the `index.html`.


### Final Result:
The final result was hosted on Netlify:
https://buycoinclone.netlify.app/
