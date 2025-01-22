class BlockchainService {
    constructor() {
        this.contractAddress = ''; // Set after deployment
        this.contractABI = [
            "function storeHash(bytes32 hash) public",
            "function verifyHash(bytes32 hash) public view returns (bool exists, uint256 timestamp)"
        ];
        this.contract = null;
        this.signer = null;
    }

    async connectWallet() {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('Please install MetaMask');
        }

        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Create ethers provider and signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = provider.getSigner();
        
        // Create contract instance
        this.contract = new ethers.Contract(
            this.contractAddress,
            this.contractABI,
            this.signer
        );

        return await this.signer.getAddress();
    }

    async hashDocument(file) {
        const buffer = await file.arrayBuffer();
        const hash = await crypto.subtle.digest('SHA-256', buffer);
        return ethers.utils.hexlify(hash);
    }

    async signHash(hash) {
        if (!this.signer) throw new Error('Wallet not connected');
        return await this.signer.signMessage(ethers.utils.arrayify(hash));
    }

    async storeHash(hash) {
        if (!this.contract) throw new Error('Contract not initialized');
        const tx = await this.contract.storeHash(hash);
        return await tx.wait();
    }

    async verifyHash(hash) {
        if (!this.contract) throw new Error('Contract not initialized');
        return await this.contract.verifyHash(hash);
    }
}