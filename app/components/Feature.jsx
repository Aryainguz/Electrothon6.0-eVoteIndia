"use client"
import React, { useEffect } from 'react';
import blockchain from '../../public/blockchain.jpg'
import scan from '../../public/scan.jpg'
import data from '../../public/data.jpg'
import efficiency from '../../public/efficinecy.jpg'
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Cards = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div id="blockchain">
            <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 mb-10 bg-white ">
                
                <div className="mt-16 grid divide-x divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
                    <div className="group relative bg-white dark:bg-gray-900 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                        <div className="relative space-y-8 py-12 p-8">
                            <Image src={scan} className="w-12 rounded-full object-cover" width="512" height="512" alt="CampusLink Logo" />
                            <div className="space-y-2" data-aos="fade-in" data-aos-duration="1000" data-aos-once="true">
                                <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                                     Vote On Phone
                                </h5>
                                <p className="text-gray-600 dark:text-gray-300">
                                    With one easy accessibility on phone vote anywhere you want with complete freedom.
                                </p>
                            </div>
                            <a href="https://medium.com/@aryaninguz369/campuslink-connecting-campuses-empowering-students-977424e97cd5" className="flex items-center justify-between group-hover:text-secondary" target="_blank">
                                <span className="text-sm">Know more</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="group relative bg-white dark:bg-gray-900 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                        <div className="relative space-y-8 py-12 p-8">
                            <Image src={blockchain} className="w-12" width="512" height="512" alt="CampusLink Logo" style={{ borderRadius: '50%' }} />
                            <div className="space-y-2" data-aos="fade-in" data-aos-duration="1000" data-aos-once="true">
                                <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                                    No Vote Scams
                                </h5>
                                <p className="text-gray-600 dark:text-gray-300">
                                    With power of unique blockchain hash of every vote is unchangable and secured.
                                </p>
                            </div>
                            <a href="https://medium.com/@aryaninguz369/campuslink-connecting-campuses-empowering-students-977424e97cd5" className="flex items-center justify-between group-hover:text-secondary" target="_blank">
                                <span className="text-sm">Know more</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="group relative bg-white dark:bg-gray-900 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                        <div className="relative space-y-8 py-12 p-8">
                            <Image src={data} className="w-12" width="512" height="512" alt="CampusLink Logo" style={{ borderRadius: '50%' }} />
                            <div className="space-y-2" data-aos="fade-in" data-aos-duration="1000" data-aos-once="true">
                                <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                                    Decentralized Data

                                </h5>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Decentralized data is the future of the world and we are bringing it to you.
                                </p>
                            </div>
                            <a href="https://medium.com/@aryaninguz369/campuslink-connecting-campuses-empowering-students-977424e97cd5" className="flex items-center justify-between group-hover:text-secondary" target="_blank">
                                <span className="text-sm">Know more</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="group relative bg-white dark:bg-gray-900 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                        <div className="relative space-y-8 py-12 p-8">
                            <Image src={efficiency} className="w-12" width="512" height="512" alt="CampusLink Logo" style={{ borderRadius: '50%' }} />
                            <div className="space-y-2" data-aos="fade-in" data-aos-duration="1000" data-aos-once="true">
                                <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                                    Speed and Efficiency

                                </h5>
                                <p className="text-gray-600 dark:text-gray-300">
                                    With power of Nextjs 14 we are bringing you the best speed and efficiency.
                                </p>
                            </div>
                            <a href="https://medium.com/@aryaninguz369/campuslink-connecting-campuses-empowering-students-977424e97cd5" className="flex items-center justify-between group-hover:text-secondary" target="_blank">
                                <span className="text-sm">Know more</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Add more card components with similar structure for other items */}
                </div>
            </div>
        </div>
    );
};

export default Cards;