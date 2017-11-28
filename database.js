const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
        this.nonce++;
        this.hash = this.calculateHash();
    }

    console.log("BLOCK MINED: " + this.hash);
  }
}


class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let savjeeCoin = new Blockchain();
console.log('Mining block 1...');
savjeeCoin.addBlock(new Block(1, "20/07/2017", { Proprietario:'Franz', Propriedade: {descritivo:'casa na prai pinhal', cep:3659693285, rua:'av hortencia', numero:54} }));

console.log('Mining block 2...');
savjeeCoin.addBlock(new Block(2, "20/07/2017", { Proprietario:'Rodolf', Propriedade: 'casa na praia de tramandai ' }));
console.log('Mining block 3...');
savjeeCoin.addBlock(new Block(3, "20/07/2017", { Proprietario:'Bruna', Propriedade: 'casa na praia cidreira  ' }));
console.log('Mining block 4...');
savjeeCoin.addBlock(new Block(4, "20/07/2017", { Proprietario:'flavia', Propriedade: 'casa no sertao ' }));
console.log('Mining block 5...');
savjeeCoin.addBlock(new Block(5, "20/07/2017", { Proprietario:'Franz', Propriedade: 'casa na restinga ' }));

savjeeCoin.chain.map(a=>console.log(JSON.stringify(a.data)))
console.log('###### validate chain '+ savjeeCoin.isChainValid())
savjeeCoin.chain[3].data.Proprietario = 'augusto'
savjeeCoin.chain[3].data.Propriedade = 'shopping center'
savjeeCoin.chain.map(a=>console.log(JSON.stringify(a.data)))
console.log('###### validate chain '+ savjeeCoin.isChainValid())
