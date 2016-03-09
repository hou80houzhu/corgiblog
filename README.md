## Sample Of corgiserver

This is a nodejs project ,but you can not run with nodejs only,you must install [corgiserver](https://github.com/hou80houzhu/corgiserver "corgiserver") first.

## How to run

### step 1.

install corgiserver

```
$ npm install corgiserver
```

### step 2.

create a project by corgiserver

```
$ corgiserver -create blog <blog local path>
```

> you must download and unzip this [project](https://github.com/hou80houzhu/corgiblog/archive/master.zip "project") in your local path,and you must install the dependence of nodejs.

### or install it just by network

```
$ corgiserver -install blog <blog local path> https://github.com/hou80houzhu/corgiblog/archive/master.zip
```
> corgiserver will download and unzip and build the project from the network.

### step 3.

run corgiserver

```
$ corgiserver -start
```

### or

```
$ corgiserver -run
```

### step 4.

open chrome and request `http://localhost:8080/blog/`


## more infomation

read [corgiserver](https://github.com/hou80houzhu/corgiserver "corgiserver")
