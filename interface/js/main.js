let blockchainService;
let currentFile;

document.addEventListener('DOMContentLoaded', () => {
    blockchainService = new BlockchainService();
    
    // Connect Wallet
    document.getElementById('connectWallet').addEventListener('click', async () => {
        try {
            const address = await blockchainService.connectWallet();
            alert(`Connected: ${address}`);
        } catch (error) {
            alert('Failed to connect wallet: ' + error.message);
        }
    });

    // Upload Document
    document.getElementById('uploadButton').addEventListener('click', () => {
        document.getElementById('fileInput').click();
    });

    document.getElementById('fileInput').addEventListener('change', (event) => {
        currentFile = event.target.files[0];
        document.getElementById('currentDocument').textContent = currentFile ? currentFile.name : 'No document selected';
    });

    // Sign Document
    document.getElementById('signButton').addEventListener('click', async () => {
        try {
            if (!currentFile) throw new Error('No document selected');
            const hash = await blockchainService.hashDocument(currentFile);
            const signature = await blockchainService.signHash(hash);
            document.getElementById('signatureResult').textContent = `Signature: ${signature}`;
        } catch (error) {
            alert('Failed to sign: ' + error.message);
        }
    });

    // Publish Hash
    document.getElementById('publishButton').addEventListener('click', async () => {
        try {
            if (!currentFile) throw new Error('No document selected');
            const hash = await blockchainService.hashDocument(currentFile);
            const receipt = await blockchainService.storeHash(hash);
            document.getElementById('confirmationResult').textContent = 
                `Confirmation: Transaction confirmed in block ${receipt.blockNumber}`;
        } catch (error) {
            alert('Failed to publish: ' + error.message);
        }
    });

    // Verify Document
    document.getElementById('verifyButton').addEventListener('click', async () => {
        try {
            if (!currentFile) throw new Error('No document selected');
            const hash = await blockchainService.hashDocument(currentFile);
            const [exists, timestamp] = await blockchainService.verifyHash(hash);
            const date = new Date(timestamp * 1000);
            document.getElementById('verifyResult').textContent = 
                exists ? `Result: Document stored on ${date.toLocaleString()}` : 'Result: Document not found';
        } catch (error) {
            alert('Failed to verify: ' + error.message);
        }
    });
});