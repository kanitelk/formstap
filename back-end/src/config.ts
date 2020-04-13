const config = {
  db: process.env.db,
  port: process.env.port,
  tokenSecret: process.env.tokenSecret,
  tokenExpiration: process.env.tokenExpiration,
  nodeURL: process.env.nodeURL,
  chainId: process.env.chainId
};

export default config;
