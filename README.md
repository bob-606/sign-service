# Document Signing Service for Gnosis Chain

A WEB3 service to upload, sign, and store document hashes on Gnosis Chain.

## Prerequisites
- Node.js 
- MetaMask (Gnosis Chain)
- Git

## Installation
```bash
# Clone the repository
git clone https://01.kood.tech/git/jlim/sign-service/
cd sign-service

# Install dependencies
npm install

# Set up local blockchain or connect to Chiado testnet
# Follow MetaMask setup instructions for Gnosis Chain
```

## Usage
1. Start the service:
```bash
npm start
```

2. Open browser to http://localhost:3000
3. Connect MetaMask (make sure Gnosis Chain is selected)
4. Upload document and use the signing features

## Scripts
- `npm run deploy` - Deploy contract to Gnosis Chain
- `npm run serve` - Start local server
- `npm start` - Deploy contract and start server