import { ethers } from 'ethers';

// Define the types for environment variables
interface Config {
  infuraProjectId: string;
  infuraProjectSecret: string;
  privateKey: string;
  WEthTokenAddress: string;
  GrixContractAddress: string;
}

// Load configuration (consider using a more secure method for production)
const config: Config = {
  infuraProjectId: 'your-infura-project-id',
  infuraProjectSecret: 'your-infura-project-secret',
  privateKey: 'your-private-key',
  WEthTokenAddress: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', // address of the token that pays for the options
  GrixContractAddress: '0xSpenderAddressHere', // Replace with the actual spender address
};

const provider = new ethers.providers.InfuraProvider('mainnet', {
  projectId: config.infuraProjectId,
  projectSecret: config.infuraProjectSecret,
});

// Create a wallet instance with the provider
const wallet = new ethers.Wallet(config.privateKey, provider);

// Define the ABI for ERC-20 tokens, specifically for the approve function
const abi = [
  'function approve(address spender, uint256 amount) public returns (bool)',
];

// Create a contract instance
const contract = new ethers.Contract(config.WEthTokenAddress, abi, wallet);

export async function grantAllowance(allowanceAmount: number) {
  try {
    // Convert the allowance amount to the correct format (wei)
    const parsedAllowanceAmount = ethers.parseUnits(allowanceAmount.toString(), 18);

    // Send the transaction to approve the allowance
    const tx = await contract.approve(config.GrixContractAddress, parsedAllowanceAmount);
    console.log('Transaction Hash:', tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log('Transaction was mined in block:', receipt.blockNumber);
    console.log('Allowance granted successfully.');
  } catch (error) {
    console.error('Error granting allowance:', error);
  }
}