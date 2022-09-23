# NFT_SNS_WEB

### Decentralized NFT SNS WEB application on Fantom test network

## Install
#### Install using "npm" in the `client` and `server` folder
```
npm install
```
## Metamask
#### This application uses [Metamask](https://metamask.io/download). Download [Metamask](https://metamask.io/download).
#### Then, connect Metamask to the [Fantom testnet network](https://docs.fantom.foundation/tutorials/set-up-metamask-testnet).

## MongoDB Key
#### This application uses [MongoDB](https://www.mongodb.com/). Get MongoDB key and Add the `dev.js` file as follows:
server/config/dev.js
```node.js
module.exports = {
    mongoURI: 'Your MongoDB Key'
}a
```

## Google Cloud API Key
#### This application is [Google Cloud](https://cloud.google.com/)'s "Geocoding API" and "Maps JavaScript API" required. Get API key, Add the `API_Key.js` file as follows:
client/src/utils/API_Key.js
```javaScript
export const GoogleMapAPI_Key = "Your Google Cloud API Key";
```

## Start
#### Start Application `server` folder
````
npm run dev