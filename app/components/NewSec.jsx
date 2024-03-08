import React from 'react';
import Image from 'next/image';
import Goupimg from '../../public/Group 2.png'

const NewSec = () => {
    return (
        <div className="relative bg-gradient-to-b from-green-50 to-green-100">
            <section className="overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-stretch lg:max-h-[900px] lg:min-h-[900px]">
                    <div className="flex items-center justify-center w-full lg:order-2 lg:w-7/12">
                        <div className="h-full px-4 pt-24 pb-16 sm:px-6 lg:px-24 2xl:px-32 lg:pt-40 lg:pb-14">
                            <div className="flex flex-col justify-between flex-1 h-full">
                                <div>
                                    <h1 className="text-4xl font-bold text-black sm:text-6xl xl:text-7xl">Vote easily <br />at ease on your phone</h1>
                                    <p className="mt-6 text-base text-black sm:text-xl">Our easy and secure system lets you  vote easily to your prefered candidate and don't miss your right.</p>
                                    <a href="register" title="" className="inline-flex items-center px-6 py-5 text-base font-semibold text-black transition-all duration-200 bg-green-300 mt-9 hover:bg-green-400 focus:bg-green-400" role="button"> Get started </a>
                                </div>

                                <div className="mt-8 border-t-2 border-black lg:mt-auto sm:mt-14">
                                    <div className="pt-8 sm:flex sm:items-center sm:justify-between sm:pt-14">
                                        <p className="text-base font-semibold text-black">App available Soon on</p>

                                        <div className="flex items-center mt-5 space-x-5 sm:mt-0">
                                            <a href="#" title="" className="block transition-all duration-200 hover:opacity-80 focus:opacity-80" role="button">
                                                <Image className="w-auto rounded h-14 sm:h-16" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/app-store-button.png" alt="" height={100} width={100} />
                                            </a>

                                            <a href="#" title="" className="block transition-all duration-200 hover:opacity-80 focus:opacity-80" role="button">
                                                <Image className="w-auto rounded h-14 sm:h-16" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/play-store-button.png" alt="" height={100} width={100} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full overflow-hidden lg:w-5/12 lg:order-1">
                        <div className="lg:absolute lg:bottom-0 lg:left-0">
                            <Image className="w-full" src={Goupimg} alt="" width={3000} height={3000} />
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}
export default NewSec;