import axios from "axios";
import { getDatabase, onValue, ref, set } from "firebase/database";
// import { openseaSDK } from "utils/opensea";
// import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// const sdk = require('api')('@opensea/v1.0#10fy4ug30l7qohm4q');

// import { sdk } from 'api';



export const saveWalletToAirtable = async (_userName: string, wallet: string) : Promise<'error' | 'success'> => {
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyDr90Ny9XSuy819'}).base('appfZedSta1s4n06f');    
    const userName = _userName.trim().toLowerCase()

    return base('NametoWallets').create([
        {
        "fields": {
            "Name": userName.trim().toLocaleLowerCase(),
            "Wallets": wallet
        }
        }
    ], function(err: any, records: any[]) {
        if (err) {
        console.error(err);
        return 'error';
        }
        return 'success'
        // setSaveUserName(true)
        // records.forEach(function(record) {
        // console.log(record.get('Name'));
        // });

        // navigate(`/${userName}`, {
        //     state: {
        //         from: 'find_nfts',
        //         nftDataPOLYGON,
        //         nftDataETH
        //     }
           
        // })
    });
}


// const db = getDatabase();

export const saveNFTDataFirebase = async (wallet: string, NFTDataTH: any, _nftDataPolygon: any) => {
    const db = getDatabase();
    await set(ref(db, 'nfts/' + wallet), {
        ethNFTs: JSON.stringify(NFTDataTH),
        polygonNFTs: JSON.stringify(_nftDataPolygon),
        updatedAt: Date.now()
      });
}


export type TokenGateCondition =  { 
    chain: 'Polygon' | 'Ethereum';
    contractAddress: string; 
    tokenId: string;
  }
  
export const saveCustomerUrltoFirebase = async (wallet: string, pageSlug: string, contentType?: 'video', tokenGates?: any) => {
    const db = getDatabase();
    const _payload: any= {
        wallet,
        updatedAt: Date.now()
    }
    if (tokenGates) {
        _payload.tokenGates = JSON.stringify(tokenGates)
    }

    await set(ref(db, 'customDomain/' + pageSlug + '/' + contentType), _payload);
}


export const saveCustomerUrltoFirebase2 = async (

    pageSlug: string, tokenGates?: any, gatedData?: {

    title: string;
    imageUrl: string;
    description: string;

}) => {
    const db = getDatabase();
    const _payload: any= {
     
        updatedAt: Date.now()
    }
    if (tokenGates) {
        _payload.tokenGates = tokenGates
    }

    _payload.gatedData = gatedData
    await set(ref(db, 'customDomain/' + pageSlug), _payload);
}

// export const saveContentGatetoFirebase = async (wallet: string, pageSlug: string) => {
//     const db = getDatabase();

//     await set(ref(db, 'ContentGate/' + ), {
//         wallet,
//         updatedAt: Date.now()
//       });
// }


export const savePagetoFirebase = async (wallet: string, pageSlug: string) => {
    const db = getDatabase();
    await set(ref(db, 'Pages/' + pageSlug), {
        wallet,
        updatedAt: Date.now()
      });
}


export const saveWallettoFirebase = async (wallet: string, pageSlug: string) => {
    const db = getDatabase();
    await set(ref(db, 'Wallets/' + wallet + '/' + pageSlug), {
        wallet,
        updatedAt: Date.now()
      });
}


export const saveCuratedNFTPerWalletFirebase = async (wallet: string, curationDetail: {
    nft: any
    curationNote: string,
    reaction: string

}) => {
    const db = getDatabase();
    const {nft, curationNote, reaction} = curationDetail
    await set(ref(db, 'CuratedNFTsPerWallet/' + wallet + '/' + Date.now()), {
        // curationDetail: JSON.stringify(curationDetail),
        nft,
        curationNote,
        reaction,
        updatedAt: Date.now()
        
      });


}

// ToDO
export const savenftCurationPerNFTFirebase = async (chain: string, contract: string, tokenId: string, curationNote: string, wallet: string, reaction: string) => {
    // const curationData = await getCurationNotesForNFTPerWallet(chain, contract, tokenId, wallet)
    // const _curationNotes = curationData.curationNotes
    // _curationNotes.push({
        
    // })
    const db = getDatabase();
    await set(ref(db, 'CurationsPerNFT/' + chain + '/' + contract + '/' + tokenId + '/' + wallet + '/' +  Date.now()), {
        curationNote,
        wallet,
        reaction,
        // ethNFTs: JSON.stringify(NFTDataTH),
        // polygonNFTs: JSON.stringify(_nftDataPolygon),
        updatedAt: Date.now()
        
      });


}


export const getCurationNotesForNFTPerWallet =  (chain: string, contract: string, tokenId: string, wallet: string) => {
    const db = getDatabase();
    const path = 'CurationsPerNFT/' + chain + '/' + contract + '/' + tokenId + '/' + wallet

    const curation = ref(db, path);

    onValue(curation, (snapshot) => {
        // console.log('--snapshot', snapshot, snapshot.exists())

        // if (snapshot.exists()) {
        var data = snapshot.val();
        console.log('===data', data)
        return data
    })

}

export const getCurationNotesForNFT =  (chain: string, contract: string, tokenId: string) => {
    const path = 'CurationsPerNFT/' + chain + '/' + contract + '/' + tokenId
    const db = getDatabase();
    const curation = ref(db, path);

    onValue(curation, (snapshot) => {
        // console.log('--snapshot', snapshot, snapshot.exists())

        // if (snapshot.exists()) {
        var data = snapshot.val();
        console.log('===data', data)
        return data
    })

}


export const saveCommunityReviewPerWalletToFirebase = async (wallet: string, curationDetail: {
    communityId: any
    curationNote: string,
    reaction: string

}) => {
    const db = getDatabase();
    const {communityId, curationNote, reaction} = curationDetail
    await set(ref(db, 'CommunityReviewsPerWallet/' + wallet + '/' + Date.now()), {
        // curationDetail: JSON.stringify(curationDetail),
        communityId,
        curationNote,
        reaction,
        updatedAt: Date.now()
        
      });
}



export const saveReviewsForCommunityFirebase = async (communityId: string, review: string, rating: string, wallet?: string) => {
    const db = getDatabase();
    // const curationData = await getCurationNotesForNFTPerWallet(chain, contract, tokenId, wallet)
    // const _curationNotes = curationData.curationNotes
    // _curationNotes.push({
        
    // })
    await set(ref(db, 'CommunityReviews/' + communityId + '/' + Date.now()), {
        review,
        rating,
        wallet,
        // ethNFTs: JSON.stringify(NFTDataTH),
        // polygonNFTs: JSON.stringify(_nftDataPolygon),
        updatedAt: Date.now()
        
      });


}


export const getCurationNotesForCommunity =  (communityId: string) => {
    const db = getDatabase();
    const path = 'CurationsPerCommunity/' + communityId

    const curation = ref(db, path);

    onValue(curation, (snapshot) => {
        // console.log('--snapshot', snapshot, snapshot.exists())

        // if (snapshot.exists()) {
        var data = snapshot.val();
        console.log('===data', data)
        return data
    })

}


export const getPageInfo =  (slug: string) => {
    const db = getDatabase();
    const path = 'customDomain/' + slug

    const curation = ref(db, path);

    onValue(curation, (snapshot) => {
        // console.log('--snapshot', snapshot, snapshot.exists())

        // if (snapshot.exists()) {
        var data = snapshot.val();
        console.log('===pagegggggdata', data)
        return data
    })

}


export const getGatedContent =  (slug: string) => {
    const db = getDatabase();
    const path = 'GatedContent/' + slug

    const curation = ref(db, path);

    onValue(curation, (snapshot) => {
        // console.log('--snapshot', snapshot, snapshot.exists())

        // if (snapshot.exists()) {
        var data = snapshot.val();
        console.log('===GatedContent', data)
        return data
    })

}


export const saveGatedContent =  async (slug: string, contentType: string, content: string) => {
    const db = getDatabase();
    const path = 'GatedContent/' + slug

    const curation = ref(db, path);

    await set(ref(db, 'GatedContent/' + slug + '/' + contentType), {

        contentType,
        content,
        updatedAt: Date.now()
      });
    

}


export const saveGatedContent2 =  async (slug: string, content: string) => {
    const db = getDatabase();
    const path = 'GatedContent/' + slug

    const curation = ref(db, path);

    await set(ref(db, 'GatedContent/' + slug), {


        content,
        updatedAt: Date.now()
      });
    

}






var Airtable = require('airtable');
const airAPI = 'keyDr90Ny9XSuy819'
export const airtaleBase = new Airtable({apiKey: airAPI}).base('appfZedSta1s4n06f');



// export const checkTokenBalance = async () => {
//     const balances = await web3.alchemy.getTokenBalances(ownerAddr,["0x607f4c5bb672230e8672085532f7e901544a7375"])
// }

export const checkOwnerOfNFT = async ({account, contractAddress,tokenId } : { account: string,contractAddress: string, tokenId: string } ) => {


//     const asset = {
//         tokenAddress: contractAddress, // CryptoKitties
//         tokenId, // Token ID
//       }

//     openseaSDK.getAssetBalance({
//         accountAddress: account,
//         asset
// //   limit: '20',
// //   order_by: 'created_date',
// //   order_direction: 'desc',
// //   asset_contract_address:,
// //   token_id: tokenId,
// //   owners: 'owners',
// //   'x-api-key': 'a1cfd8a3844046ad82b6eb457cb58cf6'
// })
//   .then((res: any) => { 
      
    
//     console.log(res)
//     return res.owner.adddress

//     return 'sss'
//   }
//     )
//   .catch((err: any) => console.error(err));


//   const data = await axios.get(`https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/1`, {
//       headers: {
//           'X-API-KEY': 'a1cfd8a3844046ad82b6eb457cb58cf6',
//       }
//   })
// console.log('---data', data.data)

}