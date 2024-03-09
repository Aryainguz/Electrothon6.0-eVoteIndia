"use client"
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Faq = () => {
    const [faq, setFaq] = useState([
        {
            question: 'How to create an account?',
            answer: 'Simply click on the register button and fill in your details. You will be required to provide a valid means of identification. Once your account is created, you can use it to perform voting',
            open: false
        },
        {
            question: 'How to register Biometrics?',
            answer:'You can register your biometrics online with correct details. You will be required to fill a form and provide your biometric data. You will also be required to provide a valid means of identification. Once your biometrics is registered, you can use it to perform voting',
            open: false
        },
        {
            question: 'Can I recover my password?',
            answer: 'To recover your password call our support team on 0800-000-0000 or send an email to team for details on how to recover your password. You will be required to provide your email address and a valid means of identification.',
            open: false
        },
        {
            question: 'How can I reach to support?',
            answer: 'You can reach our support team by calling 0800-000-0000 or sending an email to team. Our support team is available 24/7 to attend to your needs.',
            open: false
        }
    ]);

    const toggleFaq = (index) => {
        setFaq(faq.map((item, i) => {
            if (i === index) {
                item.open = !item.open;
            } else {
                item.open = false;
            }

            return item;
        }));
    }

    useEffect(() => {
        AOS.init({
        });
    }, []);



    return (
        <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-2xl mx-auto text-center" data-aos="fade-up">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
                    <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do</p>
                </div>

                <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16" data-aos="fade-up">
                    {faq.map((item, index) => (
                        <div key={index} className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
                            <button type="button" className="flex items-center justify-between w-full px-4 py-5 sm:p-6" onClick={() => toggleFaq(index)}>
                                <span className="flex text-lg font-semibold text-black"> {item.question} </span>

                                <svg className={`w-6 h-6 text-gray-400 ${item.open ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div className={`${item.open ? 'block' : 'hidden'} px-4 pb-5 sm:px-6 sm:pb-6`}>
                                <p dangerouslySetInnerHTML={{ __html: item.answer }}></p>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-center text-gray-600 textbase mt-9">Didn’t find the answer you are looking for? <a href="#" title="" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline">Contact our support</a></p>
            </div>
        </section>
    );
}

export default Faq;