module.exports = {
  "mock": {
    "ReverseProxy": false,
    "port": 3000,
    "proxyPath": "/api",
    "YAPI": "http://10.0.2.231:3333/mock/XX"
  },
  "dev": {
    "port": 8080,
    "startPage": "/templates/project.ejs",
  },
  "publicPath": [],
  "publicApiHost": {
    "name": "http://localhost",
    "port": "11234"
  },
};
