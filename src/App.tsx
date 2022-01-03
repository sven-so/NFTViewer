import './App.css'
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getDefaultProvider, } from "ethers"
import { NftProvider, useNft } from "use-nft"
declare global {
    interface Window {
        ethereum:any;
    }
}
const ethersConfig = {
  provider: getDefaultProvider("homestead"),
}
export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0x9C7E3e11D7853DE1676182Ea4983251254B7c8e5";
  const testWallet = async () => {
     try {
      const { ethereum } = window;
      if (!ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        //const signer = provider.getSigner();
        //const wavePortalContract = new //ethers.Contract(contractAddress, //contractABI.abi, signer);
      }
     } catch (error) {
       console.log(error);
     }
  }
function Nft() {
  const { loading, error, nft } = useNft(
    "0x9992477b1b486e4a0c8ae6d34eb1389a5f8d3dd9",
    "351"
  )
  const currentStyle= "red";
  // nft.loading is true during load.
  if (loading) return <>Loading…</>
  // nft.error is an Error instance in case of error.
  if (error || !nft) return <>Error.</>
  return (
    <section>
      <h1>{nft.name}</h1>
      <div className={currentStyle}>
        <img src={nft.image} alt="" />
      </div>
      <p>{nft.description}</p>
      <p>Owner: {nft.owner}</p>
      <p>Metadata URL: {nft.metadataUrl}</p>
      <p>RawData: {JSON.stringify(nft.rawData)}</p>
    </section>
  )
}
const getData=()=>{
    fetch('https://ipfs.io/ipfs/Qmdrr9bxCqKSMouh5pkpShKr4DvdwJ5jPnstZodsG1ctjx/351.json'
    ,{
      headers : { 
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      });
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    //getData();
    checkIfWalletIsConnected();
  }, [])
  return (
    <main>
      <button onClick={connectWallet}>Connect</button>
      <NftProvider fetcher={["ethers", ethersConfig]}>
      <Nft />
    </NftProvider>
    </main>
  )
}