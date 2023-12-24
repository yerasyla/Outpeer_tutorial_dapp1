const contractAddress = "0x13352b642B7d3C5E2432c90Ba60d5076cD5C0bC7"

const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_option",
				"type": "uint256"
			}
		],
		"name": "play",
		"outputs": [
			{
				"internalType": "bool",
				"name": "result",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "fee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const provider = new ethers.providers.Web3Provider(window.ethereum, 11155111)

let signer;
let contract;

provider.send("eth_requestAccounts", []).then(()=>{
    provider.listAccounts().then((accounts)=>{
        signer = provider.getSigner(accounts[0]);
        contract = new ethers.Contract(contractAddress, abi, signer);
        console.log(contract)
    })
})

async function play(){
    const note = document.getElementById("input").value;
    const play = await contract.play(note, { value: ethers.utils.parseUnits("0.001", "ether") });
    console.log(play)
    document.getElementById("span_result").innerText = await contract.callStatic.play(note, { value: ethers.utils.parseUnits("0.001", "ether") })

}



