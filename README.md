# [js-yaml](https://www.npmjs.com/package/js-yaml)

## 安装

```shell
npm install js-yaml
```

## 使用

新建 `development.yml` 与 `production.yml`，用于区分不同的环境，

```yml
# development.yml
mysql:
  port: 3306
  url: 'localhost'
```

```yml
# production.yml
mysql:
  port: 3306
  url: '127.0.0.1'
```

新建 `src/index.js`，

```js
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const config = fs.readFileSync(
  process.env.NODE_ENVIRONMENT === "production"
    ? path.resolve(process.cwd(), "production.yml")
    : path.resolve(process.cwd(), "development.yml")
);

console.log(yaml.load(config));
```

`package.json`，增加不同的命令，

```json
"scripts": {
  "prod": "cross-env NODE_ENVIRONMENT=production node src/index.js",
  "dev": "cross-env NODE_ENVIRONMENT=development node src/index.js"
}
```

执行后，即可获取到不同环境下的结果，

```json
// production
{ mysql: { port: 3306, url: 'localhost' } }
// development
{ mysql: { port: 3306, url: '127.0.0.1' } }
```

## yaml 说明

YAML 的配置文件后缀为 **.yml**，如：**index.yml** 。

### 基本语法

- 大小写敏感
- 使用缩进表示层级关系
- 缩进不允许使用tab，只允许空格
- 缩进的空格数不重要，只要相同层级的元素左对齐即可
- '#'表示注释

### 数据类型

YAML 支持以下几种数据类型：

- 对象：键值对的集合，又称为映射（mapping）/ 哈希（hashes） / 字典（dictionary）
- 数组：一组按次序排列的值，又称为序列（sequence） / 列表（list）
- 纯量（scalars）：单个的、不可再分的值

#### 对象

对象键值对使用冒号结构表示 **key: value**，冒号后面要加一个空格。

也可以使用 **key:{key1: value1, key2: value2, ...}**。

还可以使用缩进表示层级关系；

```yml
key: 
    child-key: value
    child-key2: value2
```

#### 数组

以 **-** 开头的行表示构成一个数组：

```yml
- A
- B
- C
```

一个相对复杂的例子：

```yml
companies:
    -
        id: 1
        name: company1
        price: 200W
    -
        id: 2
        name: company2
        price: 500W
```

意思是 companies 属性是一个数组，每一个数组元素又是由 id、name、price 三个属性构成。

#### 复合结构

数组和对象可以构成复合结构，例：

```yml
languages:
  - Ruby
  - Perl
  - Python 
websites:
  YAML: yaml.org 
  Ruby: ruby-lang.org 
  Python: python.org 
  Perl: use.perl.org
```

转换为 json 为：

```json
{ 
  languages: [ 'Ruby', 'Perl', 'Python'],
  websites: {
    YAML: 'yaml.org',
    Ruby: 'ruby-lang.org',
    Python: 'python.org',
    Perl: 'use.perl.org' 
  } 
}
```

#### 纯量

纯量是最基本的，不可再分的值，包括：

- 字符串
- 布尔值
- 整数
- 浮点数
- Null
- 时间
- 日期

使用一个例子来快速了解纯量的基本使用：

```yml
boolean: 
    - TRUE  #true,True都可以
    - FALSE  #false，False都可以
float:
    - 3.14
    - 6.8523015e+5  #可以使用科学计数法
int:
    - 123
    - 0b1010_0111_0100_1010_1110    #二进制表示
null:
    nodeName: 'node'
    parent: ~  #使用~表示null
string:
    - 哈哈
    - 'Hello world'  #可以使用双引号或者单引号包裹特殊字符
    - newline
      newline2    #字符串可以拆成多行，每一行会被转化成一个空格
date:
    - 2018-02-17    #日期必须使用ISO 8601格式，即yyyy-MM-dd
datetime: 
    -  2018-02-17T15:02:31+08:00    #时间使用ISO 8601格式，时间和日期之间使用T连接，最后使用+代表时区
```

#### 引用

**&** 锚点和 ***** 别名，可以用来引用:

```yml
defaults: &defaults
  adapter:  postgres
  host:     localhost

development:
  database: myapp_development
  <<: *defaults

test:
  database: myapp_test
  <<: *defaults
```

相当于:

```yml
defaults:
  adapter:  postgres
  host:     localhost

development:
  database: myapp_development
  adapter:  postgres
  host:     localhost

test:
  database: myapp_test
  adapter:  postgres
  host:     localhost
```

**&** 用来建立锚点（defaults），**<<** 表示合并到当前数据，***** 用来引用锚点。

下面是另一个例子:

```yml
- &showell Steve 
- Clark 
- Brian 
- Oren 
- *showell 
```

转为 JavaScript 代码如下:

```json
[ 'Steve', 'Clark', 'Brian', 'Oren', 'Steve' ]
```
