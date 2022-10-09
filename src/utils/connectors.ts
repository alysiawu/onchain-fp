import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const injected = new InjectedConnector({
  supportedChainIds: [1,3, 4, 5, 42, 137]
});

const url = 'https://polygon-mainnet.infura.io/v3/708702a9564e40c5bf1959a32646f118'

const urlEth = 'https://mainnet.infura.io/v3/708702a9564e40c5bf1959a32646f118'
// https://dev.to/yakult/how-to-use-web3-react-to-develop-dapp-1cgn

const walletconnect = new WalletConnectConnector({
    // @ts-ignore

    // https://polygon-mainnet.infura.io/v3/708702a9564e40c5bf1959a32646f118
//   rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  rpcUrl: urlEth,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true
});

const walletlink = new WalletLinkConnector({
  url,
  appName: "Wensan"
});

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink
};
