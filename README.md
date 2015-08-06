iLab New UI project 

**Fork the newui repo and start collaborating** refer to [github collaboration](https://help.github.com/articles/using-pull-requests/) for how to.

**Be sure to check out [angular style guide](https://github.com/github-libra/angular-styleguide) and [SASS guidelines](http://sass-guidelin.es/) before writing any code**

#Precondition

1. choose your favorite editor(recommend [sublime text](http://www.sublimetext.com/))

2. install [Git scm](https://msysgit.github.io/)

3. set git-bash proxy.
````
export http_proxy=http://your-proxy:port
export https_proxy=http://your-proxy:port
export no_proxy=127.0.0.1,10.*.*.*,*.intel.com
````

4. install node environment. refer to [node official site](https://nodejs.org/)

5. set npm proxy in .npmrc file. (create one in home directory if not exists)
````
proxy = http://your-proxy:port
https-proxy = http://your-proxy:port
````


#Setup

1. `npm install -g grunt grunt-cli bower` install grunt&grunt-cli&bower
2. `cd newui/` 
3. `npm install`
4. `bower install`
5. `grunt` running local server
