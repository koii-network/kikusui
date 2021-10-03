# Kikusui
  The wallet provider for Koii Network's Finnie

## Table of Contents
* [Technologies](#technologies)
* [Authors](#authors)
* [Initialization](#initialization)

## Technologies
<p>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img alt="Mocha" src="https://img.shields.io/badge/-mocha-8D6748?logo=mocha&logoColor=white&style=for-the-badge"/>
  <img alt="Chai" src="https://img.shields.io/badge/-chai-F7EFDF?logo=chai&logoColor=A30701&style=for-the-badge"/>
  <img src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/>
</p>


## Authors
<table>
    <tr>
        <td> Ahmad Kayyali <a href="https://github.com/kayyali18">GH</td>
        <td> Jackson McGuire <a href="https://github.com/Jacksonmcguire">GH</td>
        <td> Ellie Azaveda <a href="https://github.com/EllieAzaveda">GH</td>
    </tr>
    </tr>
        <td><img src="https://avatars.githubusercontent.com/u/13953920?v=4" alt="A. Kayyali" width="125" height="auto" /></td>
        <td><img src="https://avatars.githubusercontent.com/u/72821268?v=4" alt="J. McGuire" width="125" height="auto" /></td>
        <td><img src="https://avatars.githubusercontent.com/u/76409536?v=4" alt="E. Azaveda" width="125" height="auto" /></td>
    </tr>
</table>


## Initialization 
* Run `npm i @koii-network/kikusui` to install Kikusui package


#### Check that User has Finnie 

* Import the following: 
```js
import finnie from "@koii-network/kikusui/src/index"

// After importing, run the following to check to see that the user has installed finnie

const provider = finnie.check()
```


#### Connect the User to Finnie

* You should only initiate user connection per user request (e.g. button click). Do not initiate on page load.

* A successful connection to finnie will return a response with a user's address

```js
const address = finnie.connect();
```





