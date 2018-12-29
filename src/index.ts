import server from './app'

console.log(`
    Auction Server\n
    NODE_VERSION`, process.version)

server.bootstrap()
