const { assert } = require('chai');

const MemoryToken = artifacts.require('./MemoryToken.sol');

require('chai').use(require('chai-as-promised')).should();

contract('Memory Token', (accounts) => {

  let token;

  before(async () => {
    token = await MemoryToken.deployed();
  })

  describe('deployment', () => {
    it('deploys successfully', () => {
      const address = token.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    })

    it('has a name', async () => {
      const name = await token.name();
      assert.equal(name, 'Memory Token');
    })
    
    it('has a symbol', async () => {
      const symbol = await token.symbol();
      assert.equal(symbol, 'MEMORY');
    })
  })

    describe('token distribution', async () => {
      let result;
      const user1 = accounts[0];

      it('mints tokens', async () => {
        const URI = 'https://moshe.com';
        await token.mint(user1, URI);
        result = await token.totalSupply();
        assert.equal(result.toString(), '1', 'total supply is correct');
        const balanceOf = await token.balanceOf(user1);
        assert.equal(balanceOf.toString(), '1', 'token balanceOf is correct');
        result = await token.ownerOf('1');
        assert.equal(result.toString(), user1.toString(), 'ownerOf is correct');

        let tokenIds = [];
        for (let i = 0; i < balanceOf.length; i++) {
          let id = await token.tokenOfOwnerByIndex(user1, i);
          tokenIds.push(id.toString());
        }
        result = ['1'];
        assert.equal(result.toString(), '1', 'tokenIds are correct');

        result = await token.tokenURI('1');
        assert.equal(result.toString(), URI, 'tokenURI is correct');
      })
    })
})