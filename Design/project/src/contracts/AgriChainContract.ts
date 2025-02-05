import { ethers } from 'ethers';

// ABI for the smart contract
export const ABI = [
  "function addProduct(string memory productId, string memory name, string memory origin, uint256 timestamp) public",
  "function addQualityCheck(string memory productId, string memory organization, uint8 score, string memory certificationId) public",
  "function addHistoryEntry(string memory productId, string memory action, string memory actor, string memory role, string memory location) public",
  "function getProduct(string memory productId) public view returns (string memory name, string memory origin, uint256 timestamp)",
  "function getQualityChecks(string memory productId) public view returns (string[] memory organizations, uint8[] memory scores, string[] memory certificationIds)",
  "function getHistory(string memory productId) public view returns (string[] memory actions, string[] memory actors, string[] memory roles, string[] memory locations)"
];

// Contract address on the blockchain
const CONTRACT_ADDRESS = "0x123..."; // Replace with actual deployed contract address

export class AgriChainContract {
  private contract: ethers.Contract;
  private provider: ethers.Provider;
  private signer: ethers.Signer;

  constructor() {
    // Connect to Ethereum network (using MetaMask or other provider)
    this.provider = new ethers.BrowserProvider(window.ethereum);
    this.signer = this.provider.getSigner();
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, this.signer);
  }

  async addProduct(productId: string, name: string, origin: string) {
    const timestamp = Math.floor(Date.now() / 1000);
    const tx = await this.contract.addProduct(productId, name, origin, timestamp);
    await tx.wait();
  }

  async addQualityCheck(
    productId: string,
    organization: string,
    score: number,
    certificationId: string
  ) {
    const tx = await this.contract.addQualityCheck(
      productId,
      organization,
      score,
      certificationId
    );
    await tx.wait();
  }

  async addHistoryEntry(
    productId: string,
    action: string,
    actor: string,
    role: string,
    location: string
  ) {
    const tx = await this.contract.addHistoryEntry(
      productId,
      action,
      actor,
      role,
      location
    );
    await tx.wait();
  }

  async getProduct(productId: string) {
    return await this.contract.getProduct(productId);
  }

  async getQualityChecks(productId: string) {
    return await this.contract.getQualityChecks(productId);
  }

  async getHistory(productId: string) {
    return await this.contract.getHistory(productId);
  }
}