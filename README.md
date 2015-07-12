# graph-alg-viz - Visualizations of graph algorithms using D3.

This project is an [AngularJS](http://angularjs.org/) application that displays visualizations of
common graph algorithms using [D3][d3] (or rather, it soon will be). 

This project was generated using the [AngularJS Seed Project][angular-seed] and portions of this 
project's README are taken from that project's README.

## Getting Started

To get you started you can simply clone the graph-alg-viz repository and install the dependencies:

### Prerequisites

You need git to clone the graph-alg-viz repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test graph-alg-viz. You must have node.js 
and its package manager (npm) installed.  You can get them from 
[http://nodejs.org/](http://nodejs.org/).

### Clone graph-alg-viz

Clone the graph-alg-viz repository using [git][git]:

```
git clone https://github.com/lockoff/graph-alg-viz.git
cd graph-alg-viz
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
graph-alg-viz changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.

## Updating Dependencies

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` 
file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.

**Note that the package.json and bower.json files came from the angular-seed project and the version
constraints specified in those files have not yet been reviewed.**


### Running the App during Development

The graph-alg-viz project comes preconfigured with a local development webserver.  It is a node.js
tool called [http-server][http-server].  You can start this webserver with `npm start` but you may 
choose to install the tool globally:

```
sudo npm install -g http-server
```

Then you can start your own development web server to serve static files from a folder by
running:

```
http-server -a localhost -p 8000
```

Alternatively, you can choose to configure your own webserver, such as apache or nginx. Just
configure your server to serve the files under the `app/` directory.

## Contact

More information can be found through the [github project][graph-alg-viz] or the 
[Queer Engineering][queer-eng] blog.

[angular-seed]: https://github.com/angular/angular-seed
[d3]: http://d3js.org/
[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[http-server]: https://github.com/nodeapps/http-server
[queer-eng]: http://queereng.com
[graph-alg-viz]: https://github.com/lockoff/graph-alg-viz