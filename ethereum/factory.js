import web3 from './web3';

const abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'minimum',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
    ],
    name: 'createCampaign',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'deployedCampaigns',
    outputs: [
      {
        internalType: 'contract Campaign',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDeployedCampaigns',
    outputs: [
      {
        internalType: 'contract Campaign[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const instance = new web3.eth.Contract(
  abi,
  '0x504b2e88084639b671e2fbefd8dd645fcc64982b'
);

export default instance;
