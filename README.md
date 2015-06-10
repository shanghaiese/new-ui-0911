#Precondition

1. set git-bash proxy.
````
export http_proxy=http://your-proxy:port
export https_proxy=http://your-proxy:port
export no_proxy=127.0.0.1,10.*.*.*,*.intel.com
````

2. set npm proxy in .npmrc file. (create one in home directory if not exists)
````
proxy = http://your-proxy:port
https-proxy = http://your-proxy:port
````

3. install node environment. refer to [node official site](https://nodejs.org/)

#Setup

1. `npm install -g grunt grunt-cli bower` install grunt&grunt-cli&bower
2. `cd newui/` 
3. `npm install`
4. `bower install`
5. `grunt` running local server

