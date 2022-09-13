
// This script demonstrates access to the NFT API via the Alchemy SDK.
import { Network, Alchemy } from "alchemy-sdk";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
// const settings = {
//   apiKey: "eVdHfi0A39HBm9kanNRkmUhZchwG2M26", // Replace with your Alchemy API Key.
//   network: Network.MATIC_MAINNET, // Replace with your network.
// };

// const alchemy = new Alchemy(settings);

// Print owner's wallet address:



export const getNFTs = async (ownerAddr: string, network = Network.MATIC_MAINNET) => {
    const settings = {
        apiKey: "eVdHfi0A39HBm9kanNRkmUhZchwG2M26", // Replace with your Alchemy API Key.
        network: Network.MATIC_MAINNET, // Replace with your network.
      };
      
      const alchemy = new Alchemy(settings);

    // const ownerAddr = "0xshah.eth";
    // console.log("fetching NFTs for address:", ownerAddr);
    // console.log("...");
    const nfts = []
    // Print total NFT count returned in the response:
    const nftsForOwner = await alchemy.nft.getNftsForOwner(ownerAddr);
    console.log("number of NFTs found:", nftsForOwner.totalCount);
    console.log("...");
    
    // Print contract address and tokenId for each NFT:
    for (const nft of nftsForOwner.ownedNfts) {
      console.log("===");
      console.log("contract address:", nft.contract.address);
      console.log("token ID:", nft.tokenId);
      console.log("===nft", nft);
          // Fetch metadata for a particular NFT:
//     console.log("fetching metadata for a Crypto Coven NFT...");

      const response = await alchemy.nft.getNftMetadata(
        nft.contract.address,
        nft.tokenId
      );
      console.log("response ", response);
          console.log("NFT name: ", response.title);
console.log("token type: ", response.tokenType);
// console.log("tokenUri: ", response.tokenUri.gateway);
// console.log("image url: ", response.rawMetadata.image);
console.log("time last updated: ", response.timeLastUpdated);
console.log("===");
        nfts.push(response)
    }
    return nfts
    console.log("===");
    

  

} 
// Uncomment this line to see the full api response:
// console.log(response);

// Print some commonly used fields:
