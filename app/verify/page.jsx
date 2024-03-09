"use client";
import React from "react";
import { useRouter } from 'next/navigation'
import toast,{Toaster} from "react-hot-toast";

const page = () => {

  const router = useRouter()
  const [otp, setOtp] = React.useState("");
  const [num1, setNum1] = React.useState("");
  const [num2, setNum2] = React.useState("");
  const [num3, setNum3] = React.useState("");
  const [num4, setNum4] = React.useState("");
  const [num5, setNum5] = React.useState("");

  const handleVerification = async () => {
    if (
      num1.length === 1 &&
      num2.length === 1 &&
      num3.length === 1 &&
      num4.length === 1 &&
      num5.length === 1
    ) {
      const otp = num1 + num2 + num3 + num4+ num5;
      console.log(otp)
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: otp})
      })

        const data = await res.json()
        console.log(data)
        if (data.success) {
          toast.success("Your account is verified !!")
          router.push('/login')
        } else {
          alert('Invalid OTP')
        }
      }
  };
  return (
    <>
    <Toaster/>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl text-gray-700">
                <p>OTP Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a OTP to your registered number.</p>
              </div>
            </div>
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs gap-3">
                    <div className="w-16 h-16 text-black">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        onChange={(e) => {
                          setNum1(e.target.value);
                          if (e.target.value.length === 1) {
                            document.getElementById("num2").focus();
                          }
                        }}
                        value={num1}
                      />
                    </div>
                    <div className="w-16 h-16 text-black ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        onChange={(e) => {
                          setNum2(e.target.value);
                          if (e.target.value.length === 1) {
                            document.getElementById("num3").focus();
                          }
                        }}
                        value={num2}
                        id="num2"
                      />
                    </div>
                    <div className="w-16 h-16 text-black ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        onChange={(e) => {
                          setNum3(e.target.value);
                          if (e.target.value.length === 1) {
                            document.getElementById("num4").focus();
                          }
                        }}
                        value={num3}
                        id="num3"
                      />
                    </div>
                    <div className="w-16 h-16 text-black ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        onChange={(e) => {
                          setNum4(e.target.value);
                          if (e.target.value.length === 1) {
                            document.getElementById("num5").focus();
                          }
                        }}
                        value={num4}
                        id="num4"
                      />
                    </div>
                    <div className="w-16 h-16 text-black ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        onChange={
                          (e) => setNum5(e.target.value)
                          // if (e.target.value.length === 1) {
                          //   document.getElementById('num5').focus()
                          // }
                        }
                        id="num5"
                        value={num5}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                        onClick={handleVerification}
                      >
                        Verify Account
                      </button>
                    </div>
                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>{" "}
                      <a
                        className="flex flex-row items-center text-blue-600"
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resend
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
