
 import { ethers } from 'ethers'
 import Web3Modal from 'web3modal'
 import axios from 'axios'
 import {
   marketplace,
 } from './constants'
 import NFTMarketplace from '../artifacts/marketplace.json'

const web3Modal = new Web3Modal({
  network: 'mainnet',
  cacheProvider: true,
})

// https://blog.infura.io/post/introducing-ipfs-dedicated-gateways
export const getNft = async (item: { tokenId: { toNumber: () => any }; price: { toString: () => ethers.BigNumberish }; seller: any; owner: any }) => {
 
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplace, NFTMarketplace.abi, signer)
    const _tokenUri = await contract.tokenURI(item.tokenId)
    // console.log('--tokenUri', tokenUri)
    const split = _tokenUri.split('/')

    const sha = split[split.length - 1]
    const tokenUri = `https://websan.infura-ipfs.io/ipfs/${sha}`
    const meta = await axios.get(tokenUri)
    console.log('--meta', meta)
    let price = ethers.utils.formatUnits(item.price.toString(), 'ether')
    let _item = {
      price,
      // url,
      tokenId: item.tokenId.toNumber(),
      seller: item.seller,
      owner: item.owner,
      image: meta.data.image,
      name: meta.data.name,
      description: meta.data.description,
      symbol: meta.data.symbol,
      avatar: meta.data.avatar,
      metaData: meta.data,
    }
    return _item
}


export const getNftByTokenId = async (tokenId: string | undefined) => {
 if (!tokenId) return
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(marketplace, NFTMarketplace.abi, signer)
  const _tokenUri = await contract.tokenURI(tokenId)
  // console.log('--tokenUri', tokenUri)
  const split = _tokenUri.split('/')

  const sha = split[split.length - 1]
  const tokenUri = `https://websan.infura-ipfs.io/ipfs/${sha}`
  const meta = await axios.get(tokenUri)
  console.log('--meta', meta)

  // let price = ethers.utils.formatUnits(item.price.toString(), 'ether')
  let _item = {
    price: meta.data.price,
    // url,
    tokenId: parseInt(tokenId),
    // seller: item.seller,
    // owner: item.owner,
    image: meta.data.image,
    name: meta.data.name,
    description: meta.data.description,
    symbol: meta.data.symbol,
    avatar: meta.data.avatar,
    metaData: meta.data,
  }
  return _item
}
