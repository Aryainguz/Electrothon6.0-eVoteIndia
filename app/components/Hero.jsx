import React from 'react';
import Image from 'next/image';
import VotingImg from '../../public/voting-hand-india-election-vector-illustration_667085-68.webp'

const Hero = () => {
    return (
        <div className="bg-gray-50">
            <header className="py-4 md:py-6">
            </header>

            <section className="pt-12 pb-12 sm:pb-16 lg:pt-8">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
                        <div>
                            <div className="text-center lg:text-left">
                                <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl font-pj">Empowering democracy with web3 elections.</h1>
                                <p className="mt-2 text-lg text-gray-600 sm:mt-8 font-inter">Experience the power of transparent, decentralized elections with our Web3 election portal - where every voice counts, every vote matters!</p>
                            </div>

                            <div className="flex items-center justify-center mt-10 space-x-6 lg:justify-start sm:space-x-8">
                                <div className="flex items-center">
                                    <p className="text-3xl font-medium text-gray-900 sm:text-4xl font-pj">97 </p>
                                    <p className="ml-3 text-sm text-gray-900 font-pj">Crore<br />Voters.</p>
                                </div>

                                <div className="hidden sm:block">
                                    <svg className="text-gray-400" width="16" height="39" viewBox="0 0 16 39" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="0.72265" y1="10.584" x2="15.7226" y2="0.583975"></line>
                                        <line x1="0.72265" y1="17.584" x2="15.7226" y2="7.58398"></line>
                                        <line x1="0.72265" y1="24.584" x2="15.7226" y2="14.584"></line>
                                        <line x1="0.72265" y1="31.584" x2="15.7226" y2="21.584"></line>
                                        <line x1="0.72265" y1="38.584" x2="15.7226" y2="28.584"></line>
                                    </svg>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-3xl font-medium text-gray-900 sm:text-4xl font-pj">No</p>
                                    <p className="ml-3 text-sm text-gray-900 font-pj">Voting<br />Tamperings</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Image className="w-full rounded-xl" src={VotingImg} alt="" width={1000} height={1000} />
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}
export default Hero;