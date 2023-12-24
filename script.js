const contractAddress = "0x13352b642B7d3C5E2432c90Ba60d5076cD5C0bC7"

const abi = [
	{
		"inputs": [],
		"name": "getNote",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_note",
				"type": "string"
			}
		],
		"name": "setNote",
		"outputs": [],
		"stateMutability": "nonpayable",
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

async function setNote(){
    const note = document.getElementById("input_note").value;
    const setNote = await contract.setNote(note);
}

async function getNote(){
    const note = await contract.getNote();
    console.log(note)
    document.getElementById("span_result").innerText = note;
}

