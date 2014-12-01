SusyDemo
=============

susy demo

# Developing

## Branch naming

All branches should have prefix to determine what kind of issue you are working on.

### Features

```
features/short-descriptive-issue-name
```

### Bugs

```
bugs/short-descriptive-issue-name
```

## Code style guide

[https://github.com/felixge/node-style-guide](https://github.com/felixge/node-style-guide)

### Git hooks

Copy all contents of `git-hooks` directory to `.git/hooks`, ex

```
cp git-hooks/* .git/hooks
```

## Setup environment

To compile and run project you should have following installed:

* [NodeJs](http://nodejs.org/download)
* Gulp task runner `npm i -g gulp`

Most of the dependencies are served by [npm](https://www.npmjs.org/doc), so after any checkout or
merge make sure you run following command

```
npm install
```
**Note**
If you are installing some package using `npm` that supposed to be used by all developers, make
sure you install it with `--save` or `--save-dev` flag. It will be automatically added to
`package.json`. Ex.

```
npm i --save request
```

## Gulp tasks

### Running gulp tasks in different environments.

By default running `gulp` will have no setted environment. To run gulp tasks against some environment you can specify
it using the `NODE_ENV` environment variable while running the command. For example to create db against the test
environment you could run:

```
NODE_ENV=test gulp
```

**NOTE**
There is no default `NODE_ENV` value due to security reasons. You can set it to `development` locally on your machine, if you don't want specify it always via command line.

### Existing tasks

- `lint` validates code quality
- `sass` compiles sass into a css
- `traceur` process es6 to es5 with AMD module support to assets
- `rjs` compile production ready minified and optimized browser script
- `build` compiles sass, provide AMD modules to assets (runs `sass`, `traceur`)
- `watch` builds js, sass, runs development server and starts watch for file changes
- `default` same as `watch`

- `specs` runs mocha unit, functional specs
- `features` runs cucumber acceptance test. Requires running server.

### LiveReload

Install LiveReload browser extension, to refresh a web page's styles without reloading.
* [Mozilla](https://addons.mozilla.org/ru/firefox/addon/livereload/)
* [Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei/)

# Tools documentation

### Development

* [NodeJS](http://nodejs.org/api) - node js api
* [NPM](https://www.npmjs.org/doc) - node package manager
* [Express](http://expressjs.com) - express web framework
* [Gulp](http://gulpjs.com) - task runner

### Testing

* [Mocha](http://visionmedia.github.io/mocha/) - test framework
* [Chai](http://chaijs.com/guide/) - assertion library (include asserts, expextations, shoulds)
* [CucumberJS](https://github.com/cucumber/cucumber-js) - BDD test runner
* [Zombie JS](http://zombie.labnotes.org/) - insanely fast, headless full-stack testing using Node.js
