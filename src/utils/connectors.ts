import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const injected = new InjectedConnector({
  supportedChainIds: [137]
});
const url = ' https://polygon-mainnet.infura.io/v3/708702a9564e40c5bf1959a32646f118'
const walletconnect = new WalletConnectConnector({
    // @ts-ignore

    // https://polygon-mainnet.infura.io/v3/708702a9564e40c5bf1959a32646f118
//   rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
rpcUrl: url,
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
