# Mint NFT scripts

Tool intended for minting NFT's on polygon with oz & hardhat

## Scripts

`yarn compile`

`yarn deploy`

`yarn deploy --network mumbai`

`yarn deploy --network mumbai --tags erc1155`

## Contract verification

[Hardhat verify](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html)
`npx hardhat verify --network mumbai CONTRACT_ADDRESS_HERE`

## Additional Resources

Tip for generating mnemonic:
`yarn add global bip39`
` node -e 'console.log(require("bip39").generateMnemonic())'`

https://github.com/kyledewy/eth-keys <- ethersjs wrapper that can be used to convert mnemonic to pvt key & get public address of mnemonic (I reviewed the code, at time of writing no weird backdoors)
