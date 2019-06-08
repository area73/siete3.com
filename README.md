# siete3.com
Web site of Siete3.com

This is a Hugo web site. Hugo is a static site generator very easy to use 

## Pre requisites
Install surge (from http://surge.sh) a Static web publishing tool and hosting
```bash
npm install --global surge
```
Install hugo with homebrew. Hugo is one of the most popular open-source static site generators.
``` bash
brew install hugo
```

## Generate static site
To generate pages of a static site run ``` hugo ``` from command line and all the compiled output will be placed on /public folder. 

## Serve site local with watcher
To run Hugo server locally with a watcher, from project root run:
``` bash
hugo serve -w
```



## Deploy
To deploy this site I create an account into http://surge.sh/ and I link my domain siete3.com by CNAME.

to deploy just go into /public folder  and execute:

```bash
    surge
```

It will ask for credentials and path to deploy (to automate this proccess I create a CNAME file 
with the URL to deploy to)
