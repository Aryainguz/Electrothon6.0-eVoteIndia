"use client"
import React from 'react';
import Image from 'next/image'; // Import the Image component from Next.js
import SideImg from '../../public/6976405_4585-removebg-preview.png'


const ContactForm = () => {
    return (
        <div>
            <section className="bg-blue-50 text-black" id="contact">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <div className="mb-4">
                        <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">

                            <h2
                                className="font-heading mb-4 font-bold tracking-tight  text-3xl sm:text-5xl">
                            Inform us on any feedback, suggestion or any query!
                            </h2>

                        </div>
                    </div>
                    <div className="flex items-stretch justify-center">
                        <div className="grid w-full md:grid-cols-2">
                            <div className='mt-12'>
                                <Image src={SideImg} alt='' width={900} height={800} />
                            </div>
                            <div className="card h-fit max-w-6xl p-5 md:p-12 bg-transparent shadow-xl rounded-3xl" id="form">
                                <h2 className="mb-4 text-2xl font-bold">Inform us</h2>
                                <form id="contactForm">
                                    {/* Your form inputs */}
                                    <div class="mb-6">
                                        <div class="mx-0 mb-1 sm:mb-4">
                                            <div class="mx-0 mb-1 sm:mb-4">
                                                <label for="name" class="pb-1 text-xs uppercase tracking-wider"></label><input type="text" id="name" autocomplete="given-name" placeholder="Your name" class="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0" name="name" />
                                            </div>
                                            <div class="mx-0 mb-1 sm:mb-4">
                                                <label for="email" class="pb-1 text-xs uppercase tracking-wider"></label><input type="email" id="email" autocomplete="email" placeholder="Your email address" class="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0" name="email" />
                                            </div>
                                        </div>
                                        <div class="mx-0 mb-1 sm:mb-4">
                                            <label for="textarea" class="pb-1 text-xs uppercase tracking-wider"></label><textarea id="textarea" name="textarea" cols="30" rows="5" placeholder="Write your message..." class="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0"></textarea>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button type="submit" class="w-full bg-gradient-to-r from-blue-600 to-blue-500 hov text-white font-semibold  px-6 py-3 font-xl rounded-md sm:mb-0">Send Message</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactForm;
