import * as Web3 from 'web3'
import { OpenSeaSDK, Network } from 'opensea-js'

// This example provider won't let you make transactions, only read-only calls:
// @ts-ignore
const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')
const openseaAPIKey = 'a1cfd8a3844046ad82b6eb457cb58cf6'

export const openseaSDK = new OpenSeaSDK(provider, {
  networkName: Network.Main,
  apiKey: openseaAPIKey
})