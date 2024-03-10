"use client"
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import * as Constants from '@/utils/config';
// import Login from '../Components/Login';
// import Finished from '../Components/Finished';
// import Connected from '../Components/Connected';
import Link from 'next/link';
import Image from 'next/image';
// import './App.css';
import Namste from '../../public/namaste.jpg'
import toast from 'react-hot-toast';

function MainPage() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setremainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState(null);
  const [CanVote, setCanVote] = useState(true);
  const [txnurl, setTxnurl] = useState('https://mumbai.polygonscan.com/tx/0x79dd91641ec3dcd160a862457c7eb72c4d1c5fdcd79bc5ff191b68323795396d');


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
    try{
      const provider = new ethers.BrowserProvider(window.ethereum);
      //   await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(
        Constants.contractAddress, Constants.contractAbi, signer
      );
  
      const tx = await contractInstance.vote(number);
      await tx.wait();
      console.log(tx)
      // setTxnurl(tx.transactionHash);
      canVote();
    }
    catch(e){
      toast.error(e)
    }
  
  }


  async function canVote() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    //   await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      Constants.contractAddress, Constants.contractAbi, signer
    );
    const voteStatus = await contractInstance.voters(await signer.getAddress());
    console.log(voteStatus)
    setCanVote(voteStatus);
    console.log(voteStatus)

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

  console.log(date.toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' }))
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


      <div className='h-auto mt-[40px] flex flex-col justify-center items-center w-full '>
        <div className='text-center text-black text-2xl bg-white p-4 rounded-lg shadow-4xl  mb-3 font-semibold'>
          <p>Vote ID : </p>
          <p className='text-purple-800'> {account}</p>
        </div>
        <div className='w-[90%] p-6 h-auto flex flex-col gap-7 bg-white rounded-lg   '>
          
          {/* {showButton}?<p>You already Voted</p>: */}

          {!canVote ? <>
            <div className='flex flex-row items-center justify-center'>
            <Image src={Namste} width={400} height={400} alt='' />
          </div>
            <p className='text-center text-3xl p-5 text-purple-800 font-bold'>You Already Voted</p>
          </> : <>
          <div className='flex flex-row'>
          <div className='text-center relative  w-full text-2xl justify-between flex-row flex font-semibold'>
            <p className='text-5xl text-black text-center '>PM India Election</p>
            <div className=' text-black text-md '>
              Time Left: <span className='text-red-900'>{Math.floor(remainingTime/60)/2400} days</span>

            </div>
          </div>
         
          </div>
            <div className='h-auto flex flex-row justify-evenly gap-4 w-full '>
              <div className='bg-red-300 shadow-2xl bg-white rounded-lg h-[440px]  justify-between w-1/4 flex flex-col gap-5'>
                <div className='w-full relative rounded-t-lg shadow-xl h-[175px] mx-auto bg-blue-700'>
                  <Image src={'https://bsmedia.business-standard.com/_media/bs/img/article/2023-06/02/full/1685704080-4641.jpg?im=FeatureCrop'} width={800} height={150} alt='image 1' className='rounded-t-lg  ' />

                  <div className='absolute shadow-lg m-auto flex shadow- justify-center left-32 items-center bg-white  rounded-full -bottom-[97px] bg-red-400 h-[80px] w-[80px]'>
                    <Image src={'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Bharatiya_Janata_Party_logo.svg/1200px-Bharatiya_Janata_Party_logo.svg.png '} alt='' className='p-3' width={400} height={80} />

                  </div>
                </div>


                <div className='mx-auto text-xl text-black font-semibold mt-24'>
                  NARENDRA MODI
                </div>

                <div className='mx-auto  bg-gray-100 text-black w-full p-1 m-auto text-center '>
                  Bhartiya Janta Party
                </div>

                <button className='p-2 mb-4 w-[60%] flex m-auto text-center items-center justify-center bg-blue-800 text-white font-semibold px-4 rounded-lg' onClick={() => { setNumber(0) }}>
                {number == 0 ?  "Selected" : "Vote" }
                </button>


              </div>

              <div className='bg-red-300 shadow-2xl bg-white rounded-lg h-[440px]  justify-between w-1/4 flex flex-col gap-5'>
                <div className='w-full relative rounded-t-lg shadow-xl h-[175px] mx-auto bg-blue-700'>
                  <Image src={'https://imgs.search.brave.com/b59_MZWh5lsIfW2oWkr56ej_3xTINcfUbMnOYucc2t0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMudGVsZWdyYXBo/aW5kaWEuY29tL3Rl/bGVncmFwaC8yMDI0/L0phbi8xNzA0Mzgx/MzMxXzE3MDExNzE4/NjdfMTY4ODg4NTAw/M19hcnZpbmQta2Vq/cml3YWwuanBn'} width={1000} height={200} alt='image 1' className='rounded-t-lg object-cover ' />

                  <div className='absolute shadow-lg m-auto flex shadow- justify-center left-32 items-center bg-white  rounded-full -bottom-[97px] bg-red-400 h-[80px] w-[80px]'>
                    <Image src={'https://imgs.search.brave.com/wIzGG8d6eiWclcQTnLMxyhGB4fGsDawMOb3XmvsvA_c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5na2V5LmNvbS9w/bmcvZGV0YWlsLzM2/Ni0zNjY5MTg3X2Fh/cC1zeW1ib2wtYWFt/LWFhZG1pLXBhcnR5/LWxvZ28tcG5nLnBu/Zw'} alt='' className='p-3' width={400} height={80} />

                  </div>
                </div>


                <div className='mx-auto text-xl font-semibold mt-24 text-black'>
                  ARVIND KEJRIWAL
                </div>

                <div className='mx-auto  bg-gray-100 w-full p-1 text-black m-auto text-center '>
                  Aam Admi Party
                </div>

                <button className='p-2 mb-4 w-[60%] flex m-auto text-center items-center justify-center bg-blue-800 text-white font-semibold px-4 rounded-lg' onClick={() => { setNumber(1) }}>
                  {number == 1 ?  "Selected" : "Vote" }
                </button>


              </div>


              <div className='bg-red-300 shadow-2xl bg-white rounded-lg h-[440px]  justify-between w-1/4 flex flex-col gap-5'>
                <div className='w-full relative rounded-t-lg shadow-xl h-[175px] mx-auto bg-blue-700'>
                  <Image src={'https://imgs.search.brave.com/kETlxpNpRwP7AD51rmYfoyAcspWlSJBT3RAf33ZRH6c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI0/OTQwODE3Ni9waG90/by9pbmRpYXMtbWFp/bi1vcHBvc2l0aW9u/LWxlYWRlci1vZi1p/bmRpYW4tbmF0aW9u/YWwtY29uZ3Jlc3Mt/cmFodWwtZ2FuZGhp/LWNhbi1iZS1zZWVu/LWluLWhpcy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9X21a/UmhsWF8tbDMxWWhl/Z0p2MzFwcWo0RV9H/cnFEVnVRVWxPQVh0/SlE1WT0'} width={1000} height={150} alt='image 1' className='rounded-t-lg  ' />

                  <div className='absolute shadow-lg  m-auto flex shadow- justify-center left-32 items-center bg-white  rounded-full -bottom-[97px] bg-red-400 h-[80px] w-[80px]'>
                    <Image src={'https://imgs.search.brave.com/Ms5dEGqbSTG1CBjv6joEb1Ou9uiPtmn0WmSpSKJllWg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/aW5jLmluL3N0YXRp/Yy9pbWFnZXMvbG9n/b19mb290ZXIuanBn'} alt='' className='object-fit rounded-full' width={400} height={80} />

                  </div>
                </div>


                <div className='mx-auto text-xl font-semibold mt-24 text-black'>
                  RAHUL GANDHI
                </div>

                <div className='mx-auto  bg-gray-100 w-full p-1 m-auto text-black text-center '>
                  Congress
                </div>

                <button className='p-2 mb-4 w-[60%] flex m-auto text-center items-center justify-center bg-blue-800 text-white font-semibold px-4 rounded-lg' onClick={() => { setNumber(2) }}>
                {number == 2 ?  "Selected" : "Vote" }
                </button>


              </div>


              <div className='bg-red-300 shadow-2xl bg-white rounded-lg h-[440px]  justify-between w-1/4 flex flex-col gap-5'>
                <div className='w-full relative rounded-t-lg shadow-xl h-[175px] mx-auto bg-blue-700'>
                  <Image src={'https://imgs.search.brave.com/5NR2ndffE89gYBrf8d0T5G-QBuKdJRRBG0qVjXkGPyM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93aWtp/YmlvLmluL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIwLzExL1Rl/amFzaHdpLVlhZGF2/LVJKRC0zMDB4MjI4/LmpwZw'} width={1000} height={150} alt='image 1' className='rounded-t-lg  ' />

                  <div className='absolute shadow-lg m-auto flex shadow- justify-center left-32 items-center bg-white  rounded-full -bottom-[97px] bg-red-400 h-[80px] w-[80px]'>
                    <Image src={'https://imgs.search.brave.com/XP6H9QpkYKpaQddiN4Tp-30KEApJhtR9nHk0CKFPjw0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hbGxw/bmdmcmVlLmNvbS9h/cGYtcHJvZC1zdG9y/YWdlLWFwaS9zdG9y/YWdlL3RodW1ibmFp/bHMvcmpkLWxvZ28t/cG5nLWltYWdlcy10/aHVtYm5haWwtMTY0/Njk5MTQ0MC5qcGc'} alt='' className='rounded-full' width={400} height={80} />

                  </div>
                </div>


                <div className='mx-auto text-xl font-semibold mt-24 text-black'>
                  TEJASVI YADAV
                </div>

                <div className='mx-auto  bg-gray-100 w-full p-1 m-auto text-center text-black'>
                  Rashtriya Janata Dal
                </div>

                <button className='p-2 mb-4 w-[60%] flex m-auto text-center items-center justify-center bg-blue-800 text-white font-semibold px-4 rounded-lg' onClick={() => { setNumber(3) }}>
                {number == 3 ?  "Selected" : "Vote" }
                </button>


              </div>




            </div>

            <div className=' justify-center w-full flex flex-row'>
              <button className='p-4 bg-gray-900 text-white w-[20%] font-semibold px-4 rounded-full' onClick={() => { vote() }}>SUBMIT VOTE</button>
            </div>
          </>}

        </div>






      </div>
      {!canVote ? <>
        <div className='bg-gray-100 rounded-xl  p-8 flex flex-col shadow-2xl gap-4 h-auto w-[70%] mx-auto'>
          <div className='text-xl font-semibold text-black '>
            Your Vote Record Link
          </div>

          <div className='w-[100%] pt-1 h-10 px-4 text-xl font-semibold bg-gray-200 rounded-lg shadow-xl'>
            <Link href='https://mumbai.polygonscan.com/tx/0x79dd91641ec3dcd160a862457c7eb72c4d1c5fdcd79bc5ff191b68323795396d' className=' text-blue-800 text-[1rem]'>{txnurl}
            </Link>
          </div>

        </div>
      </>
        :
        <>
          <div className='text-2xl text-black text-center mt-7 font-bold '>
            No Voting History Yet
          </div>
        </>
      }

    </>
  );



}





export default MainPage;
