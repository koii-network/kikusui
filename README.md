# Kikusui
  The wallet provider for Koii Network's Finnie

## Table of Contents
* [Initialization](#initialization)
* [Technologies](#technologies)
* [Authors](#authors)

## Initialization 
Run `npm i @koii-network/kikusui` to install Kikusui package


```js
// Import the following: 

import Finnie from "@koii-network/kikusui/src/index"

// After importing, run the init method to check to see that the user has installed finnie

const finnie = new Finnie();
finnie.init();

// If the finnie extension is detected you can check if a user 
// has already been connected by checking if finnie isConnected(boolean)

if (finnie.isConnected)

// If finnie.isConnected === true, the user's address can be accessed via the userAddress property

const address = finnie.userAddress;
```


#### Connect the User to Finnie
 _You should only initiate user connection per user request (e.g. button click).
  Do not initiate on page load._
 

```js
const isConnected = await finnie.connect();

// If a user is successfully connected
isConnected = "Successfully connected the user. Use the userAddress property to access their address.";
// Refer to initialization instructions to access the address.

// If a user rejects the connection
isConnected = "Failed to connect: User rejected connection."
```

#### Send a Koii Tip

```js
// You can transfer Koii to another wallet with a target address(string) and an amount(integer) 

finnie.sendTip(address, amount);
```
#### Vote / Mark an NFT NSFW
```js
// If a user encounters an NFT they deem unsafe for work, they can vote for that NFT to be marked NSFW

finnie.voteNSFW(id: string): {message: "Successfully voted for NSFW", status: 200} || {message: "NFTId is missing", status: 412}

// Once an NFT receives 10 unique votes, it will be officially marked NSFW
```
#### Disconnect

```js
const disconnected = finnie.disconnect();

// If a user is successfully disconnected
disconnected = "Succesfully disconnected."

// If a user is already disconnected and tries to disconnect
disconnected = "Not able to disconnect, no user is connected."
```

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
        <td> Jackson McGuire <a href="https://github.com/Jacksonmcguire">GH</td>
        <td> Ellie Azaveda <a href="https://github.com/EllieAzaveda">GH</td>
        <td> Ahmad Kayyali <a href="https://github.com/kayyali18">GH</td>
    </tr>
    </tr>
        <td><img src="https://avatars.githubusercontent.com/u/72821268?v=4" alt="J. McGuire" width="125" height="auto" /></td>
        <td><img src="https://avatars.githubusercontent.com/u/76409536?v=4" alt="E. Azaveda" width="125" height="auto" /></td>
        <td><img src="https://avatars.githubusercontent.com/u/13953920?v=4" alt="A. Kayyali" width="125" height="auto" /></td>
    </tr>
</table>




