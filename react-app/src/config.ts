const env = process.env.NODE_ENV;

const config = {
  domain: env === "production" ? "https://forms.tap.mn/" : "http://localhost:3000/",
  apiURL:
    env === "production"
      ? "https://forms.minter-scoring.space/api"
      : "http://localhost:3030/api",
  // nodeURL: "https://api.mscan.dev/b167eefb-f945-5595-991a-c9741b7b7d8f/node/",
  nodeURL: "https://api.minter.one/",
  avatarURL: "https://my.apps.minter.network/api/v1/avatar/by/address/",
  avatarCoinURL: "https://my.minter.network/api/v1/avatar/by/coin/",
  explorerURL: "https://explorer-api.minter.network/api/v1",
  chainId: 1, // testnet = 2, mainnet = 1,
  coin: "BIP",
};

export default config;
