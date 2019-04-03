module.exports = {
  "mock": {
    "ReverseProxy": false,
    "port": 3000,
    "proxyPath": "/api",
    "YAPI": "http://10.0.2.231:3333/mock/XX"
  },
  "dev": {
    "port": 8080,
    "startPage": "/templates/index.ejs",
  },
  "publicPath": [],
  "publicApiHost": {
    "name": "http://10.0.2.151",
    "port": "81"
  },
};
