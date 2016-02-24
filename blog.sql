/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2016-02-24 17:22:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `articles`
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `contentmd` text,
  `contenthtml` text,
  `ctime` varchar(255) DEFAULT NULL,
  `etime` varchar(255) DEFAULT NULL,
  `author` varchar(20) DEFAULT NULL,
  `descs` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES ('1', 'sdf', 'sdfsdf', null, null, null, null, 'sdf');
INSERT INTO `articles` VALUES ('2', 'test', '![corgiserver](https://github.com/hou80houzhu/corgiserver/raw/master/conf/pages/corgiserver.png)  [![Build Status](https://travis-ci.org/hou80houzhu/corgiserver.svg?branch=master)](https://travis-ci.org/hou80houzhu/corgiserver)\r\n\r\n[![NPM](https://nodei.co/npm/corgiserver.png?downloads=true)](https://nodei.co/npm/corgiserver/)\r\n\r\nA web server running javascript like tomcat.\r\n\r\n## What is corgiserver\r\n\r\ncorgiserver is a web server running javascript code, supports multiple projects, and ROOT as the default project. It is similar to Java Tomcat server, default resolution `.csp` file, which is a packet (specific wording javascript files) container.corgiserver is a nodejs module container.\r\n\r\n> Please refer to packet [AxesJS doc](http://axesjs.org \"AxesJS\")\r\n\r\n## Quick Start\r\n\r\n**step 1**: install corgiserver\r\n\r\n`npm install corgiserver -g`\r\n\r\n**step 2**:\r\n\r\n`$ corgiserver create <projectname>,<projectpath>`\r\n\r\nthe command will create the folder of project and its files.\r\n\r\n**step 3**:\r\n\r\ngoto the project folder to build the controllers.\r\n\r\n**step 4**\r\n\r\nrun the server `$ corgiserver start`\r\n\r\n\r\n## Project directory structure\r\n\r\n```\r\nproject\r\n   ├─node_modules (forbidden) => $ npm install <module> --save\r\n   ├─WEBINF (forbidden)\r\n   │    ├─src\r\n   │    │  └─<code>\r\n   │    └─web.json\r\n   ├─<assets>\r\n   ├─...\r\n   ├─index.html\r\n   └─package.json\r\n```\r\n\r\n- **WEBINF** Is the project of a protected directory can not be accessed outside\r\n- **WEBINF/src** is a packet drop directory (similar to java package management system)\r\n- **WEBINF/web.json** is the profile of the project\r\n- **WEBINF** directory can be placed outside other static resources\r\n- **node_modules** the third part module folder installed by npm command.\r\n\r\n> Third-party modules can co-exist with the project, the project can not references to each other between the third-party modules.Of course, you can use a global third-party modules.\r\n\r\n> rquire Third-party modules in the project code just like `require(\"/<moduleName>\");`,`\"/\"` is important.\r\n\r\n## Operating Mechanism\r\n\r\nWould start separately configured service project when a project starts, all the services are started after the project start is completed. After the completion of the project started, the request will come one by one through the filter chain processing, and then return.\r\n\r\n>Use the built-in framework to define mvcservice and mvcfilter in web.json file project\r\n\r\n## web.json\r\n\r\n- **Page** for covered server default page\r\n- **Service** is used to configure the service to start with the project\r\n- **Filter** is used to configure a request through a filter\r\n\r\n### corgi provides predefined service\r\n\r\n- mvcservice for implementing initialization mvc functions     \r\n  - database database configuration \r\n     - host database IP \r\n     - port database port \r\n     - debug debug mode is turned on \r\n     - database database name \r\n     - user database user name \r\n     - password database password \r\n     - connectionLimit the maximum number of connections\r\n  - view\r\n     - path template path \r\n     - suffix suffix template\r\n\r\n \r\n### corgi provided predefined filter\r\n- mvcfilter function for implementing mvc\r\n- cachefilter for implementing the browser cache function files - etag: true open etag - cacheSetting: {default: 200000} cache Last-modified time is used to control the Cache-control\r\n- zipfilter for implementing the response with gzip compression - gzip: \"js, css\" what file extension provisions gzip compression - deflate: \"png\" file suffix provisions which deflate compression\r\n\r\n## server config\r\n\r\nserver config under the `conf/server.json` file control\r\n\r\n- **Host** server IP\r\n- **Port** server port, default 8080\r\n- **Modules** server load module defaults to `lib/modules/base.js`\r\n\r\n> Custom modules arranged in this order basis having\r\n\r\n\r\n## web config\r\n\r\nweb config under the `conf/web.json` file control\r\n\r\n- **Session**\r\n   - Timeout session timeout (in milliseconds)\r\n- **CspCache** csp page caching is turned on, if you turn the page is loaded once\r\n- **Page** default server configuration page\r\n- **Mime** mime type configuration\r\n\r\n## Custom server module\r\n\r\nServer modules need to be placed under `lib / modules /` directory and each Module to determine a good inheritance.\r\n\r\n### Custom module global object\r\n\r\n**project object**\r\n\r\n- `isOuterProject()` whether the project as external project (project initiated by the configuration file, instead of in webapps run as folders)\r\n- `getPacketPath()` packet directory project\r\n- `getProjectPath()` project directory\r\nConfiguration information object \r\n- `getProjectConfig()` project\r\n- `getProjectName()` Project Name Whether there are key attributes hasAttr (key) projects the global cache\r\n- `getAttr(key)` Gets the value of key projects from the global cache\r\n- `setAttr(key, value)` to set key-value cache to the global project\r\n\r\n\r\n**packetLoader object**\r\n\r\n- `get(name, option)` Get packet instance\r\n- `has(name)` to determine whether packet contains definitions\r\n- `each(fn)` through all packet definitions\r\n\r\n**CorgiServer**\r\n\r\n- `getServiceConfig()` Gets the object serverConfig\r\n- `getWebConfig()` Gets Global web Config Object\r\n- `getCspContent(path)` Gets csp file contents\r\n- `setTemplateMacro(key, fn)` set a custom label templates globally\r\n\r\n**serverConfig**\r\n\r\n- `getHost()`\r\n- `getPort()`\r\n- `getModules()`\r\n- `getBasePath()`\r\n- `getConfigPath()`\r\n\r\n**webConfig**\r\n\r\n- `getSessionConfig()`\r\n- `getSessionTimeout()`\r\n- `getPagePath()`\r\n- `getMimeType()`\r\n- `getBasePath()`\r\n- `getConfigPath()`\r\n- `isCspCache()`\r\n\r\n**projectConfig**\r\n\r\n- `getService()`\r\n- `getFilter()`\r\n- `hasFilter()`\r\n- `hasService()`\r\n- `getPathPath()`\r\n- `hasPage()`\r\n- `getServiceSize()`\r\n- `getFilterSize()`\r\n\r\n## See the demos in webapps\r\n\r\nwebapps/ROOT default project\r\n\r\nwebapps/todo how to use mysql with corgi\r\n\r\nwebapps/test how to use controller and so on\r\n\r\nwebapps/doc how to write controller and custom corgi', '<p><img src=\"https://github.com/hou80houzhu/corgiserver/raw/master/conf/pages/corgiserver.png\" alt=\"corgiserver\" title=\"\" />  <a href=\"https://travis-ci.org/hou80houzhu/corgiserver\"><img src=\"https://travis-ci.org/hou80houzhu/corgiserver.svg?branch=master\" alt=\"Build Status\" title=\"\" /></a></p>\n\n<p><a href=\"https://nodei.co/npm/corgiserver/\"><img src=\"https://nodei.co/npm/corgiserver.png?downloads=true\" alt=\"NPM\" title=\"\" /></a></p>\n\n<p>A web server running javascript like tomcat.</p>\n\n<h2>What is corgiserver</h2>\n\n<p>corgiserver is a web server running javascript code, supports multiple projects, and ROOT as the default project. It is similar to Java Tomcat server, default resolution <code>.csp</code> file, which is a packet (specific wording javascript files) container.corgiserver is a nodejs module container.</p>\n\n<blockquote>\n  <p>Please refer to packet <a href=\"http://axesjs.org\" title=\"AxesJS\">AxesJS doc</a></p>\n</blockquote>\n\n<h2>Quick Start</h2>\n\n<p><strong>step 1</strong>: install corgiserver</p>\n\n<p><code>npm install corgiserver -g</code></p>\n\n<p><strong>step 2</strong>:</p>\n\n<p><code>$ corgiserver create &lt;projectname&gt;,&lt;projectpath&gt;</code></p>\n\n<p>the command will create the folder of project and its files.</p>\n\n<p><strong>step 3</strong>:</p>\n\n<p>goto the project folder to build the controllers.</p>\n\n<p><strong>step 4</strong></p>\n\n<p>run the server <code>$ corgiserver start</code></p>\n\n<h2>Project directory structure</h2>\n\n<p><code>\nproject\n   ├─node_modules (forbidden) =&gt; $ npm install &lt;module&gt; --save\n   ├─WEBINF (forbidden)\n   │    ├─src\n   │    │  └─&lt;code&gt;\n   │    └─web.json\n   ├─&lt;assets&gt;\n   ├─...\n   ├─index.html\n   └─package.json\n</code></p>\n\n<ul>\n<li><strong>WEBINF</strong> Is the project of a protected directory can not be accessed outside</li>\n<li><strong>WEBINF/src</strong> is a packet drop directory (similar to java package management system)</li>\n<li><strong>WEBINF/web.json</strong> is the profile of the project</li>\n<li><strong>WEBINF</strong> directory can be placed outside other static resources</li>\n<li><strong>node_modules</strong> the third part module folder installed by npm command.</li>\n</ul>\n\n<blockquote>\n  <p>Third-party modules can co-exist with the project, the project can not references to each other between the third-party modules.Of course, you can use a global third-party modules.</p>\n  \n  <p>rquire Third-party modules in the project code just like <code>require(\"/&lt;moduleName&gt;\");</code>,<code>\"/\"</code> is important.</p>\n</blockquote>\n\n<h2>Operating Mechanism</h2>\n\n<p>Would start separately configured service project when a project starts, all the services are started after the project start is completed. After the completion of the project started, the request will come one by one through the filter chain processing, and then return.</p>\n\n<blockquote>\n  <p>Use the built-in framework to define mvcservice and mvcfilter in web.json file project</p>\n</blockquote>\n\n<h2>web.json</h2>\n\n<ul>\n<li><strong>Page</strong> for covered server default page</li>\n<li><strong>Service</strong> is used to configure the service to start with the project</li>\n<li><strong>Filter</strong> is used to configure a request through a filter</li>\n</ul>\n\n<h3>corgi provides predefined service</h3>\n\n<ul>\n<li>mvcservice for implementing initialization mvc functions <br />\n<ul><li>database database configuration \n<ul><li>host database IP </li>\n<li>port database port </li>\n<li>debug debug mode is turned on </li>\n<li>database database name </li>\n<li>user database user name </li>\n<li>password database password </li>\n<li>connectionLimit the maximum number of connections</li></ul></li>\n<li>view\n<ul><li>path template path </li>\n<li>suffix suffix template</li></ul></li></ul></li>\n</ul>\n\n<h3>corgi provided predefined filter</h3>\n\n<ul>\n<li>mvcfilter function for implementing mvc</li>\n<li>cachefilter for implementing the browser cache function files - etag: true open etag - cacheSetting: {default: 200000} cache Last-modified time is used to control the Cache-control</li>\n<li>zipfilter for implementing the response with gzip compression - gzip: \"js, css\" what file extension provisions gzip compression - deflate: \"png\" file suffix provisions which deflate compression</li>\n</ul>\n\n<h2>server config</h2>\n\n<p>server config under the <code>conf/server.json</code> file control</p>\n\n<ul>\n<li><strong>Host</strong> server IP</li>\n<li><strong>Port</strong> server port, default 8080</li>\n<li><strong>Modules</strong> server load module defaults to <code>lib/modules/base.js</code></li>\n</ul>\n\n<blockquote>\n  <p>Custom modules arranged in this order basis having</p>\n</blockquote>\n\n<h2>web config</h2>\n\n<p>web config under the <code>conf/web.json</code> file control</p>\n\n<ul>\n<li><strong>Session</strong>\n   - Timeout session timeout (in milliseconds)</li>\n<li><strong>CspCache</strong> csp page caching is turned on, if you turn the page is loaded once</li>\n<li><strong>Page</strong> default server configuration page</li>\n<li><strong>Mime</strong> mime type configuration</li>\n</ul>\n\n<h2>Custom server module</h2>\n\n<p>Server modules need to be placed under <code>lib / modules /</code> directory and each Module to determine a good inheritance.</p>\n\n<h3>Custom module global object</h3>\n\n<p><strong>project object</strong></p>\n\n<ul>\n<li><code>isOuterProject()</code> whether the project as external project (project initiated by the configuration file, instead of in webapps run as folders)</li>\n<li><code>getPacketPath()</code> packet directory project</li>\n<li><code>getProjectPath()</code> project directory\nConfiguration information object </li>\n<li><code>getProjectConfig()</code> project</li>\n<li><code>getProjectName()</code> Project Name Whether there are key attributes hasAttr (key) projects the global cache</li>\n<li><code>getAttr(key)</code> Gets the value of key projects from the global cache</li>\n<li><code>setAttr(key, value)</code> to set key-value cache to the global project</li>\n</ul>\n\n<p><strong>packetLoader object</strong></p>\n\n<ul>\n<li><code>get(name, option)</code> Get packet instance</li>\n<li><code>has(name)</code> to determine whether packet contains definitions</li>\n<li><code>each(fn)</code> through all packet definitions</li>\n</ul>\n\n<p><strong>CorgiServer</strong></p>\n\n<ul>\n<li><code>getServiceConfig()</code> Gets the object serverConfig</li>\n<li><code>getWebConfig()</code> Gets Global web Config Object</li>\n<li><code>getCspContent(path)</code> Gets csp file contents</li>\n<li><code>setTemplateMacro(key, fn)</code> set a custom label templates globally</li>\n</ul>\n\n<p><strong>serverConfig</strong></p>\n\n<ul>\n<li><code>getHost()</code></li>\n<li><code>getPort()</code></li>\n<li><code>getModules()</code></li>\n<li><code>getBasePath()</code></li>\n<li><code>getConfigPath()</code></li>\n</ul>\n\n<p><strong>webConfig</strong></p>\n\n<ul>\n<li><code>getSessionConfig()</code></li>\n<li><code>getSessionTimeout()</code></li>\n<li><code>getPagePath()</code></li>\n<li><code>getMimeType()</code></li>\n<li><code>getBasePath()</code></li>\n<li><code>getConfigPath()</code></li>\n<li><code>isCspCache()</code></li>\n</ul>\n\n<p><strong>projectConfig</strong></p>\n\n<ul>\n<li><code>getService()</code></li>\n<li><code>getFilter()</code></li>\n<li><code>hasFilter()</code></li>\n<li><code>hasService()</code></li>\n<li><code>getPathPath()</code></li>\n<li><code>hasPage()</code></li>\n<li><code>getServiceSize()</code></li>\n<li><code>getFilterSize()</code></li>\n</ul>\n\n<h2>See the demos in webapps</h2>\n\n<p>webapps/ROOT default project</p>\n\n<p>webapps/todo how to use mysql with corgi</p>\n\n<p>webapps/test how to use controller and so on</p>\n\n<p>webapps/doc how to write controller and custom corgi</p>', null, null, null, 'test');
INSERT INTO `articles` VALUES ('3', 'Hash of options. Can also be set using the marked.setOptions', '![corgiserver](https://github.com/hou80houzhu/corgiserver/raw/master/conf/pages/corgiserver.png)  [![Build Status](https://travis-ci.org/hou80houzhu/corgiserver.svg?branch=master)](https://travis-ci.org/hou80houzhu/corgiserver)\r\n\r\n[![NPM](https://nodei.co/npm/corgiserver.png?downloads=true)](https://nodei.co/npm/corgiserver/)\r\n\r\nA web server running javascript like tomcat.\r\n\r\n## What is corgiserver\r\n\r\ncorgiserver is a web server running javascript code, supports multiple projects, and ROOT as the default project. It is similar to Java Tomcat server, default resolution `.csp` file, which is a packet (specific wording javascript files) container.corgiserver is a nodejs module container.\r\n\r\n> Please refer to packet [AxesJS doc](http://axesjs.org \"AxesJS\")\r\n\r\n## Quick Start\r\n\r\n**step 1**: install corgiserver\r\n\r\n`npm install corgiserver -g`\r\n\r\n**step 2**:\r\n\r\n`$ corgiserver create <projectname>,<projectpath>`\r\n\r\nthe command will create the folder of project and its files.\r\n\r\n**step 3**:\r\n\r\ngoto the project folder to build the controllers.\r\n\r\n**step 4**\r\n\r\nrun the server `$ corgiserver start`\r\n\r\n\r\n## Project directory structure\r\n\r\n```\r\nproject\r\n   ├─node_modules (forbidden) => $ npm install <module> --save\r\n   ├─WEBINF (forbidden)\r\n   │    ├─src\r\n   │    │  └─<code>\r\n   │    └─web.json\r\n   ├─<assets>\r\n   ├─...\r\n   ├─index.html\r\n   └─package.json\r\n```\r\n\r\n- **WEBINF** Is the project of a protected directory can not be accessed outside\r\n- **WEBINF/src** is a packet drop directory (similar to java package management system)\r\n- **WEBINF/web.json** is the profile of the project\r\n- **WEBINF** directory can be placed outside other static resources\r\n- **node_modules** the third part module folder installed by npm command.\r\n\r\n> Third-party modules can co-exist with the project, the project can not references to each other between the third-party modules.Of course, you can use a global third-party modules.\r\n\r\n> rquire Third-party modules in the project code just like `require(\"/<moduleName>\");`,`\"/\"` is important.\r\n\r\n## Operating Mechanism\r\n\r\nWould start separately configured service project when a project starts, all the services are started after the project start is completed. After the completion of the project started, the request will come one by one through the filter chain processing, and then return.\r\n\r\n>Use the built-in framework to define mvcservice and mvcfilter in web.json file project\r\n\r\n## web.json\r\n\r\n- **Page** for covered server default page\r\n- **Service** is used to configure the service to start with the project\r\n- **Filter** is used to configure a request through a filter\r\n\r\n### corgi provides predefined service\r\n\r\n- mvcservice for implementing initialization mvc functions     \r\n  - database database configuration \r\n     - host database IP \r\n     - port database port \r\n     - debug debug mode is turned on \r\n     - database database name \r\n     - user database user name \r\n     - password database password \r\n     - connectionLimit the maximum number of connections\r\n  - view\r\n     - path template path \r\n     - suffix suffix template\r\n\r\n \r\n### corgi provided predefined filter\r\n- mvcfilter function for implementing mvc\r\n- cachefilter for implementing the browser cache function files - etag: true open etag - cacheSetting: {default: 200000} cache Last-modified time is used to control the Cache-control\r\n- zipfilter for implementing the response with gzip compression - gzip: \"js, css\" what file extension provisions gzip compression - deflate: \"png\" file suffix provisions which deflate compression\r\n\r\n## server config\r\n\r\nserver config under the `conf/server.json` file control\r\n\r\n- **Host** server IP\r\n- **Port** server port, default 8080\r\n- **Modules** server load module defaults to `lib/modules/base.js`\r\n\r\n> Custom modules arranged in this order basis having\r\n\r\n\r\n## web config\r\n\r\nweb config under the `conf/web.json` file control\r\n\r\n- **Session**\r\n   - Timeout session timeout (in milliseconds)\r\n- **CspCache** csp page caching is turned on, if you turn the page is loaded once\r\n- **Page** default server configuration page\r\n- **Mime** mime type configuration\r\n\r\n## Custom server module\r\n\r\nServer modules need to be placed under `lib / modules /` directory and each Module to determine a good inheritance.\r\n\r\n### Custom module global object\r\n\r\n**project object**\r\n\r\n- `isOuterProject()` whether the project as external project (project initiated by the configuration file, instead of in webapps run as folders)\r\n- `getPacketPath()` packet directory project\r\n- `getProjectPath()` project directory\r\nConfiguration information object \r\n- `getProjectConfig()` project\r\n- `getProjectName()` Project Name Whether there are key attributes hasAttr (key) projects the global cache\r\n- `getAttr(key)` Gets the value of key projects from the global cache\r\n- `setAttr(key, value)` to set key-value cache to the global project\r\n\r\n\r\n**packetLoader object**\r\n\r\n- `get(name, option)` Get packet instance\r\n- `has(name)` to determine whether packet contains definitions\r\n- `each(fn)` through all packet definitions\r\n\r\n**CorgiServer**\r\n\r\n- `getServiceConfig()` Gets the object serverConfig\r\n- `getWebConfig()` Gets Global web Config Object\r\n- `getCspContent(path)` Gets csp file contents\r\n- `setTemplateMacro(key, fn)` set a custom label templates globally\r\n\r\n**serverConfig**\r\n\r\n- `getHost()`\r\n- `getPort()`\r\n- `getModules()`\r\n- `getBasePath()`\r\n- `getConfigPath()`\r\n\r\n**webConfig**\r\n\r\n- `getSessionConfig()`\r\n- `getSessionTimeout()`\r\n- `getPagePath()`\r\n- `getMimeType()`\r\n- `getBasePath()`\r\n- `getConfigPath()`\r\n- `isCspCache()`\r\n\r\n**projectConfig**\r\n\r\n- `getService()`\r\n- `getFilter()`\r\n- `hasFilter()`\r\n- `hasService()`\r\n- `getPathPath()`\r\n- `hasPage()`\r\n- `getServiceSize()`\r\n- `getFilterSize()`\r\n\r\n## See the demos in webapps\r\n\r\nwebapps/ROOT default project\r\n\r\nwebapps/todo how to use mysql with corgi\r\n\r\nwebapps/test how to use controller and so on\r\n\r\nwebapps/doc how to write controller and custom corgi', '<p><img src=\"https://github.com/hou80houzhu/corgiserver/raw/master/conf/pages/corgiserver.png\" alt=\"corgiserver\">  <a href=\"https://travis-ci.org/hou80houzhu/corgiserver\"><img src=\"https://travis-ci.org/hou80houzhu/corgiserver.svg?branch=master\" alt=\"Build Status\"></a></p>\n<p><a href=\"https://nodei.co/npm/corgiserver/\"><img src=\"https://nodei.co/npm/corgiserver.png?downloads=true\" alt=\"NPM\"></a></p>\n<p>A web server running javascript like tomcat.</p>\n<h2 id=\"what-is-corgiserver\">What is corgiserver</h2>\n<p>corgiserver is a web server running javascript code, supports multiple projects, and ROOT as the default project. It is similar to Java Tomcat server, default resolution <code>.csp</code> file, which is a packet (specific wording javascript files) container.corgiserver is a nodejs module container.</p>\n<blockquote>\n<p>Please refer to packet <a href=\"http://axesjs.org\" title=\"AxesJS\">AxesJS doc</a></p>\n</blockquote>\n<h2 id=\"quick-start\">Quick Start</h2>\n<p><strong>step 1</strong>: install corgiserver</p>\n<p><code>npm install corgiserver -g</code></p>\n<p><strong>step 2</strong>:</p>\n<p><code>$ corgiserver create &lt;projectname&gt;,&lt;projectpath&gt;</code></p>\n<p>the command will create the folder of project and its files.</p>\n<p><strong>step 3</strong>:</p>\n<p>goto the project folder to build the controllers.</p>\n<p><strong>step 4</strong></p>\n<p>run the server <code>$ corgiserver start</code></p>\n<h2 id=\"project-directory-structure\">Project directory structure</h2>\n<pre><code>project\n   ├─node_modules (forbidden) =&gt; $ npm install &lt;module&gt; --save\n   ├─WEBINF (forbidden)\n   │    ├─src\n   │    │  └─&lt;code&gt;\n   │    └─web.json\n   ├─&lt;assets&gt;\n   ├─...\n   ├─index.html\n   └─package.json\n</code></pre><ul>\n<li><strong>WEBINF</strong> Is the project of a protected directory can not be accessed outside</li>\n<li><strong>WEBINF/src</strong> is a packet drop directory (similar to java package management system)</li>\n<li><strong>WEBINF/web.json</strong> is the profile of the project</li>\n<li><strong>WEBINF</strong> directory can be placed outside other static resources</li>\n<li><strong>node_modules</strong> the third part module folder installed by npm command.</li>\n</ul>\n<blockquote>\n<p>Third-party modules can co-exist with the project, the project can not references to each other between the third-party modules.Of course, you can use a global third-party modules.</p>\n<p>rquire Third-party modules in the project code just like <code>require(&quot;/&lt;moduleName&gt;&quot;);</code>,<code>&quot;/&quot;</code> is important.</p>\n</blockquote>\n<h2 id=\"operating-mechanism\">Operating Mechanism</h2>\n<p>Would start separately configured service project when a project starts, all the services are started after the project start is completed. After the completion of the project started, the request will come one by one through the filter chain processing, and then return.</p>\n<blockquote>\n<p>Use the built-in framework to define mvcservice and mvcfilter in web.json file project</p>\n</blockquote>\n<h2 id=\"web-json\">web.json</h2>\n<ul>\n<li><strong>Page</strong> for covered server default page</li>\n<li><strong>Service</strong> is used to configure the service to start with the project</li>\n<li><strong>Filter</strong> is used to configure a request through a filter</li>\n</ul>\n<h3 id=\"corgi-provides-predefined-service\">corgi provides predefined service</h3>\n<ul>\n<li>mvcservice for implementing initialization mvc functions     <ul>\n<li>database database configuration <ul>\n<li>host database IP </li>\n<li>port database port </li>\n<li>debug debug mode is turned on </li>\n<li>database database name </li>\n<li>user database user name </li>\n<li>password database password </li>\n<li>connectionLimit the maximum number of connections</li>\n</ul>\n</li>\n<li>view<ul>\n<li>path template path </li>\n<li>suffix suffix template</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n<h3 id=\"corgi-provided-predefined-filter\">corgi provided predefined filter</h3>\n<ul>\n<li>mvcfilter function for implementing mvc</li>\n<li>cachefilter for implementing the browser cache function files - etag: true open etag - cacheSetting: {default: 200000} cache Last-modified time is used to control the Cache-control</li>\n<li>zipfilter for implementing the response with gzip compression - gzip: &quot;js, css&quot; what file extension provisions gzip compression - deflate: &quot;png&quot; file suffix provisions which deflate compression</li>\n</ul>\n<h2 id=\"server-config\">server config</h2>\n<p>server config under the <code>conf/server.json</code> file control</p>\n<ul>\n<li><strong>Host</strong> server IP</li>\n<li><strong>Port</strong> server port, default 8080</li>\n<li><strong>Modules</strong> server load module defaults to <code>lib/modules/base.js</code></li>\n</ul>\n<blockquote>\n<p>Custom modules arranged in this order basis having</p>\n</blockquote>\n<h2 id=\"web-config\">web config</h2>\n<p>web config under the <code>conf/web.json</code> file control</p>\n<ul>\n<li><strong>Session</strong><ul>\n<li>Timeout session timeout (in milliseconds)</li>\n</ul>\n</li>\n<li><strong>CspCache</strong> csp page caching is turned on, if you turn the page is loaded once</li>\n<li><strong>Page</strong> default server configuration page</li>\n<li><strong>Mime</strong> mime type configuration</li>\n</ul>\n<h2 id=\"custom-server-module\">Custom server module</h2>\n<p>Server modules need to be placed under <code>lib / modules /</code> directory and each Module to determine a good inheritance.</p>\n<h3 id=\"custom-module-global-object\">Custom module global object</h3>\n<p><strong>project object</strong></p>\n<ul>\n<li><code>isOuterProject()</code> whether the project as external project (project initiated by the configuration file, instead of in webapps run as folders)</li>\n<li><code>getPacketPath()</code> packet directory project</li>\n<li><code>getProjectPath()</code> project directory\nConfiguration information object </li>\n<li><code>getProjectConfig()</code> project</li>\n<li><code>getProjectName()</code> Project Name Whether there are key attributes hasAttr (key) projects the global cache</li>\n<li><code>getAttr(key)</code> Gets the value of key projects from the global cache</li>\n<li><code>setAttr(key, value)</code> to set key-value cache to the global project</li>\n</ul>\n<p><strong>packetLoader object</strong></p>\n<ul>\n<li><code>get(name, option)</code> Get packet instance</li>\n<li><code>has(name)</code> to determine whether packet contains definitions</li>\n<li><code>each(fn)</code> through all packet definitions</li>\n</ul>\n<p><strong>CorgiServer</strong></p>\n<ul>\n<li><code>getServiceConfig()</code> Gets the object serverConfig</li>\n<li><code>getWebConfig()</code> Gets Global web Config Object</li>\n<li><code>getCspContent(path)</code> Gets csp file contents</li>\n<li><code>setTemplateMacro(key, fn)</code> set a custom label templates globally</li>\n</ul>\n<p><strong>serverConfig</strong></p>\n<ul>\n<li><code>getHost()</code></li>\n<li><code>getPort()</code></li>\n<li><code>getModules()</code></li>\n<li><code>getBasePath()</code></li>\n<li><code>getConfigPath()</code></li>\n</ul>\n<p><strong>webConfig</strong></p>\n<ul>\n<li><code>getSessionConfig()</code></li>\n<li><code>getSessionTimeout()</code></li>\n<li><code>getPagePath()</code></li>\n<li><code>getMimeType()</code></li>\n<li><code>getBasePath()</code></li>\n<li><code>getConfigPath()</code></li>\n<li><code>isCspCache()</code></li>\n</ul>\n<p><strong>projectConfig</strong></p>\n<ul>\n<li><code>getService()</code></li>\n<li><code>getFilter()</code></li>\n<li><code>hasFilter()</code></li>\n<li><code>hasService()</code></li>\n<li><code>getPathPath()</code></li>\n<li><code>hasPage()</code></li>\n<li><code>getServiceSize()</code></li>\n<li><code>getFilterSize()</code></li>\n</ul>\n<h2 id=\"see-the-demos-in-webapps\">See the demos in webapps</h2>\n<p>webapps/ROOT default project</p>\n<p>webapps/todo how to use mysql with corgi</p>\n<p>webapps/test how to use controller and so on</p>\n<p>webapps/doc how to write controller and custom corgi</p>\n', null, null, null, 'Function called when the markdownString has been fully parsed when using async highlighting. If the options argument is omitted, this can be used as the second argument.');
INSERT INTO `articles` VALUES ('4', 'Esta nueva versión de Javascript', '![AxesBuilder](https://github.com/hou80houzhu/axesbuilder/raw/master/axesbuilder.png) [![Build Status](https://travis-ci.org/hou80houzhu/axesbuilder.svg?branch=master)](https://travis-ci.org/hou80houzhu/axesbuilder)\r\n\r\n[![NPM](https://nodei.co/npm/axesbuilder.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/axesbuilder/)\r\n\r\nbuild the projects which run with the AxesJS web framework.\r\n\r\n##What is AxesBuilder\r\n\r\nAxesBuilder for building frontend program for frontend resources combined compression and version tracking\r\n\r\n##How to use\r\n\r\n**Step 1:**  install AxesBuilder\r\n\r\n`npm install axesbuilder -g`\r\n\r\n**Step 2:**\r\n\r\nput `build.json` file under the packets folder of a project.\r\n\r\n**Step 3:**\r\n\r\nrun the command to build \r\n\r\n`axesbuilder build projectpacketpath`\r\n\r\n##build.json\r\n\r\n###id\r\n\r\nConstruction of the project id to distinguish from each other, sometimes a project might construct multiple releases and updates distinction, it will be very important at this time id\r\n\r\n###build\r\n\r\nThe project build number, users do not need attention, it is automatically incremented\r\n\r\n###pathPrefix\r\n\r\nMay need before the packet is added to build the project basePath prefix (used in a specific user resolves dynamic pages)\r\n\r\n###updatePage\r\n\r\nAfter the build to edit pages\r\n\r\n- type:\r\n  - `1` Only update page\r\n  - `2` Updates the page and back up the original page\r\n- path:[]\r\n  - `./` current directory\r\n  - `../` parent directory\r\n  - `*.php` filename characters\r\n  - `*.*` filename characters\r\n\r\n> Relative to the directory is the directory packet\r\n\r\n###cssCompressWithout\r\n\r\nNot to merge css package Name\r\n\r\n###codeCompressWithout\r\n\r\nNot to merge js package Name\r\n\r\n###tmpCompressWithout\r\n\r\nNot to merge template package Name\r\n\r\n\r\n```\r\n{\r\n   \"id\": \"OPEN\",\r\n   \"build\": \"000050\",\r\n   \"pathPrefix\": \"\",\r\n   \"updatePage\": {\r\n      \"type\": 1,\r\n      \"path\": [\r\n         \"./index.php\",\r\n         \"../index.php\",\r\n         \"../index.html\",\r\n         \"../*.php\",\r\n         \"../*.*\"\r\n      ]\r\n   },\r\n   \"cssCompressWithout\": [],\r\n   \"codeCompressWithout\": [],\r\n   \"tmpCompressWithout\": []\r\n}\r\n```\r\n', '<p><img src=\"https://github.com/hou80houzhu/axesbuilder/raw/master/axesbuilder.png\" alt=\"AxesBuilder\"> <a href=\"https://travis-ci.org/hou80houzhu/axesbuilder\"><img src=\"https://travis-ci.org/hou80houzhu/axesbuilder.svg?branch=master\" alt=\"Build Status\"></a></p>\n<p><a href=\"https://nodei.co/npm/axesbuilder/\"><img src=\"https://nodei.co/npm/axesbuilder.png?downloads=true&amp;downloadRank=true&amp;stars=true\" alt=\"NPM\"></a></p>\n<p>build the projects which run with the AxesJS web framework.</p>\n<p>##What is AxesBuilder</p>\n<p>AxesBuilder for building frontend program for frontend resources combined compression and version tracking</p>\n<p>##How to use</p>\n<p><strong>Step 1:</strong>  install AxesBuilder</p>\n<p><code>npm install axesbuilder -g</code></p>\n<p><strong>Step 2:</strong></p>\n<p>put <code>build.json</code> file under the packets folder of a project.</p>\n<p><strong>Step 3:</strong></p>\n<p>run the command to build </p>\n<p><code>axesbuilder build projectpacketpath</code></p>\n<p>##build.json</p>\n<p>###id</p>\n<p>Construction of the project id to distinguish from each other, sometimes a project might construct multiple releases and updates distinction, it will be very important at this time id</p>\n<p>###build</p>\n<p>The project build number, users do not need attention, it is automatically incremented</p>\n<p>###pathPrefix</p>\n<p>May need before the packet is added to build the project basePath prefix (used in a specific user resolves dynamic pages)</p>\n<p>###updatePage</p>\n<p>After the build to edit pages</p>\n<ul>\n<li>type:<ul>\n<li><code>1</code> Only update page</li>\n<li><code>2</code> Updates the page and back up the original page</li>\n</ul>\n</li>\n<li>path:[]<ul>\n<li><code>./</code> current directory</li>\n<li><code>../</code> parent directory</li>\n<li><code>*.php</code> filename characters</li>\n<li><code>*.*</code> filename characters</li>\n</ul>\n</li>\n</ul>\n<blockquote>\n<p>Relative to the directory is the directory packet</p>\n</blockquote>\n<p>###cssCompressWithout</p>\n<p>Not to merge css package Name</p>\n<p>###codeCompressWithout</p>\n<p>Not to merge js package Name</p>\n<p>###tmpCompressWithout</p>\n<p>Not to merge template package Name</p>\n<pre><code>{\n   &quot;id&quot;: &quot;OPEN&quot;,\n   &quot;build&quot;: &quot;000050&quot;,\n   &quot;pathPrefix&quot;: &quot;&quot;,\n   &quot;updatePage&quot;: {\n      &quot;type&quot;: 1,\n      &quot;path&quot;: [\n         &quot;./index.php&quot;,\n         &quot;../index.php&quot;,\n         &quot;../index.html&quot;,\n         &quot;../*.php&quot;,\n         &quot;../*.*&quot;\n      ]\n   },\n   &quot;cssCompressWithout&quot;: [],\n   &quot;codeCompressWithout&quot;: [],\n   &quot;tmpCompressWithout&quot;: []\n}\n</code></pre>', null, null, null, 'Esta lista no pretende ser ni mucho menos la más representativa de ES6. Se trata más bien de lo que personalmente estoy usando a día de hoy. Si crees que hay alguna funcionalidad más que te resulta útil y no está aquí puedes dejar una nota en los comentarios.');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `password` varchar(100) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------