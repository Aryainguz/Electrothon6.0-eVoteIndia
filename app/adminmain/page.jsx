"use client"
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import * as Constants from '@/utils/config';




const page = () => {
    const [provider, setProvider] = useState(null);
const [account, setAccount] = useState(null);
const [isConnected, setIsConnected] = useState(false);
const [votingStatus, setVotingStatus] = useState(true);
const [remainingTime, setremainingTime] = useState('');
const [candidates, setCandidates] = useState([]);
const [number, setNumber] = useState(0);
const [CanVote, setCanVote] = useState(true);
const [txnurl, setTxnurl]  = useState('https://mumbai.polygonscan.com/tx/0x72a34d206c332fad02367a294e7a14a0cf4bd0ef4107dbee3bfbc3744fd103bd');


useEffect(() => {
  const connectToMetamasks = async () => {
    try {
      if (window.ethereum) {
        console.log(window.ethereum);
        const provider = new ethers.BrowserProvider(window.ethereum)

        const signer = await provider.getSigner();

        console.log(await signer.getAddress());
        if (window.ethereum) {
          window.ethereum.on('accountsChanged', handleAccountsChanged);
        }
        //   const contractInstance = new ethers.Contract(Constants.contractAddress, Constants.contractAbi, signer);
        // var tasks = await contractInstance.getAllVotesOfCandiates();
        // setPatients(tasks);
        // console.log(tasks[2]);
        //   const candidatesList = await contractInstance.getAllVotesOfCandiates();
        //   const formattedCandidates = candidatesList.map((candidate, index) => {
        //     return {
        //       index: index,
        //       name: candidate.name,
        //       voteCount: candidate.voteCount.toString()
        //     }
        //   });
        //   console.log(formattedCandidates);
        //   setFormattedCandidates(formattedCandidates);
        console.log("connect to metamask !");
      }
      else {
        console.log("Metamask not found");
      }

    }
    catch (err) {
      console.error(err)
    }
  };

  connectToMetamask();
  getCandidates();
  getRemainingTime();
  // getCurrentStatus();
}, []);


async function vote() {
  console.log("voting", number)
  const provider = new ethers.BrowserProvider(window.ethereum);
  //   await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const contractInstance = new ethers.Contract(
    Constants.contractAddress, Constants.contractAbi, signer
  );

  const tx = await contractInstance.vote(number);
  await tx.wait();
  console.log(tx)
  setTxnurl(tx.transactionHash);
  canVote();
}


async function canVote() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  //   await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const contractInstance = new ethers.Contract(
    Constants.contractAddress, Constants.contractAbi, signer
  );
  const voteStatus = await contractInstance.voters(await signer.getAddress());
  setCanVote(voteStatus);

}

async function getCandidates() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  //   await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const contractInstance = new ethers.Contract(Constants.contractAddress, Constants.contractAbi, signer);
  // var tasks = await contractInstance.getAllVotesOfCandiates();
  // setPatients(tasks);
  // console.log(tasks[2]);
  const candidatesList = await contractInstance.getAllVotesOfCandiates();
  const formattedCandidates = candidatesList.map((candidate, index) => {
    return {
      index: index,
      name: candidate.name,
      voteCount: candidate.voteCount.toString()
    }
  });

  setCandidates(formattedCandidates);
}


async function getCurrentStatus() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  //   await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const contractInstance = new ethers.Contract(
    Constants.contractAddress, Constants.contractAbi, signer
  );
  const status = await contractInstance.getVotingStatus();
  console.log(status);
  setVotingStatus(status);
}

async function getRemainingTime() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  //   await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const contractInstance = new ethers.Contract(
    Constants.contractAddress, Constants.contractAbi, signer
  );
  const time = await contractInstance.getRemainingTime();
  setremainingTime(parseInt(time, 16));
}

function handleAccountsChanged(accounts) {
  if (accounts.length > 0 && account !== accounts[0]) {
    setAccount(accounts[0]);
    canVote();
  } else {
    setIsConnected(false);
    setAccount(null);
  }
}

async function connectToMetamask() {
  if (window.ethereum) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
      // await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      setAccount(address);
      console.log("Metamask Connected : " + address);
      setIsConnected(true);
      canVote();
    } catch (err) {
      console.error(err);
    }
  } else {
    console.error("Metamask is not detected in the browser")
  }
}

function handleNumberChange(num) {

  setNumber(num);
  console.log("number is", number)
}
const date = new Date(remainingTime * 1000)

console.log(date.toLocaleDateString("en-US", {month: 'long', day: 'numeric', year: 'numeric'}))
  return (
   <>
 
<div className="min-h-screen bg-gray-50/50">
  <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
    <div className="relative border-b border-white/20">
      <a className="flex items-center gap-4 py-6 px-8" href="#/">
        <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">Election Commision Dashboard</h6>
      </a>
      <button className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden" type="button">
        <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
      </button>
    </div>
    <div className="m-4">
      <ul className="mb-4 flex flex-col gap-1">
        <li>
          <a aria-current="page" className="active" href="#">
            <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">dashboard</p>
            </button>
          </a>
        </li>
        
      </ul>
    </div>
  </aside>
  <div className="p-4 xl:ml-80">
    <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <nav aria-label="breadcrumb" className="w-max">
            <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
              <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                <a href="#">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">dashboard</p>
                </a>
                <span className="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
              </li>
              <li className="flex items-center text-blue-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">home</p>
              </li>
            </ol>
          </nav>
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">home</h6>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
           
          </div>
          <button className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden" type="button">
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" strokeWidth={3} className="h-6 w-6 text-blue-gray-500">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
            </span>
          </button>
         
          <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-blue-gray-500">
                <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </nav>
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Election Time</p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">Left</h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
              <strong className="text-green-500">{Math.floor(remainingTime/60)/2400} days </strong>
            </p>
          </div>
        </div>

        
        

          <div className="border-t border-blue-gray-50 p-4">
          <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-gray-900">Admin ID</h4>
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-green-600">
              {account}
            </p>
          </div>
        </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
          <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
            <div>
              <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-blue-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <strong>Election</strong> Details
              </p>
            </div>
            <button aria-expanded="false" aria-haspopup="menu" id=":r5:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" aria-hidden="true" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
              </span>
            </button>
          </div>
          <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">Candidate</p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">Votes</p>
                  </th>
                </tr>
              </thead>
              <tbody>

              {candidates.map((candidate, index) => (
                    <tr key={index}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">{candidate.name}</p>
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">{candidate.voteCount}</p>
                    </td>
                    
                  </tr>
                ))}
               
              
                
               
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div className="text-blue-gray-600">
      <footer className="py-2">
        <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
          <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit">© 2023, made with <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="-mt-0.5 inline-block h-3.5 w-3.5">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg> by <a href="https://www.creative-tim.com" target="_blank" className="transition-colors hover:text-blue-500">Creative Tim</a> for a better web. </p>
          <ul className="flex items-center gap-4">
            <li>
              <a href="https://www.creative-tim.com" target="_blank" className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500">Creative Tim</a>
            </li>
            <li>
              <a href="https://www.creative-tim.com/presentation" target="_blank" className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500">About Us</a>
            </li>
            <li>
              <a href="https://www.creative-tim.com/blog" target="_blank" className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500">Blog</a>
            </li>
            <li>
              <a href="https://www.creative-tim.com/license" target="_blank" className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500">License</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  </div>
</div>

   </>
  )
}

export default page