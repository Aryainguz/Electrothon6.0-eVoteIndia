"use client"
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import * as Constants from '@/utils/config';

// import theme from '../../public/theme.png';
// import './App.css';

function AdminPage() {
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
    
      {/* <div >
        {votingStatus ? (isConnected ? (<Connected
          account={account}
          candidates={candidates}
          remainingTime={remainingTime}
          number={number}
          handleNumberChange={handleNumberChange}
          voteFunction={vote}
          showButton={CanVote} />)

          :

          (<Login connectWallet={connectToMetamask} />)) : (<Finished />)}

      </div> */}


    <div className=' h-screen mt-[100px] flex flex-col justify-center items-center w-full  '>
        <div className='text-center text-black text-2xl mb-3 font-semibold'>
          <p>Admin ID : </p>
          <p className='text-purple-800'> {account}</p>
        </div>
        <div className='w-[70%] p-6 h-auto flex flex-col gap-7 rounded-lg shadow-xl  '>
           
          <div className='text-center relative text-2xl justify-center flex-row flex font-semibold'>
            <p>MP Mayor</p>
            <div className='absolute text-sm right-0 text-black'>
              Time Left: <span className='text-red-900'>{remainingTime}</span>
              
            </div>
          </div>
          {/* {showButton}?<p>You already Voted</p>: */}

         <div>
         <table id="myTable" className='w-[80%] mx-auto text-black'>
                <thead>
                <tr>
                 
                    <th>Candidate name</th>
                    <th>Candidate votes</th>
                </tr>
                </thead>
                <tbody  className='w-[80%] mx-auto '>
                {candidates.map((candidate, index) => (
                    <tr key={index} className='w-[80%] mx-auto'>
                    {/* <td className='text-center'>{candidate.index}</td> */}
                    <td className='text-center p-3'>{candidate.name}</td>
                    <td className='text-center'>{candidate.voteCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
         </div>

        </div>


        <div className=' h-[150px] w-[70%] mt-10 justify-evenly items-center flex mx-auto flex-row gap-3'>
                    <div className='w-1/3 shadow-2xl bg-white shadow-3xl p-6 flex flex-col rounded-lg h-[95%] pt-10  bg-gray-100'>
                            <p className='text-gray-400 text-sm'>Total Voters</p>
                            <p className='text-3xl font-bold text-gray-800'>500</p>
                    </div>
                    <div className='w-1/3 shadow-2xl   bg-white shadow-3xl p-6 flex flex-col rounded-lg h-[95%] pt-10  bg-gray-100'>
                            <p className='text-gray-400 text-sm'>% of People who Voted</p>
                            <p className='text-3xl font-bold text-green-600'>0.6%</p>
                    </div>
                    <div className='w-1/3 shadow-2xl   bg-white shadow-3xl p-6 flex flex-col rounded-lg h-[95%] pt-10  bg-gray-100'>
                            <p className='text-gray-400 text-sm'>Time Left</p>
                            <p className='text-3xl font-bold text-orange-700'>{remainingTime} min</p>
                    </div>
        </div>



      </div>
          
    
    </>
  );



}





export default AdminPage;
