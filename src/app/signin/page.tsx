'use client'

import React, { useRef } from 'react'
import { signIn } from 'next-auth/react'
import { Alert } from '@material-tailwind/react'

function Login() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
  )

  const handleSubmit = async () => {
    if (emailRef.current && regex.test(emailRef.current)) {
      const result = await signIn('credentials', {
        username: emailRef.current,
        password: passwordRef.current,
        redirect: true,
        callbackUrl: '/',
      })
    } else {
      alert('이메일 형식이 올바르지 않습니다.')
    }
  }

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="flex flex-wrap w-full mt-[50px] mb-[100px]">
      <div className="flex flex-col w-full md:w-2/3">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24"></div>
        <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <p className="text-3xl text-center">Welcome</p>
          <div className="flex flex-col pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
              <div className="flex relative ">
                <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <svg
                    width="15"
                    height="15"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                  </svg>
                </span>
                <input
                  ref={emailRef}
                  onChange={(e: any) => {
                    emailRef.current = e.target.value
                  }}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoFocus={true}
                  className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                  placeholder="Email"
                  onKeyUp={handleOnKeyPress}
                />
              </div>
            </div>
            <div className="flex flex-col pt-4 mb-12">
              <div className="flex relative ">
                <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <svg
                    width="15"
                    height="15"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                  </svg>
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  ref={passwordRef}
                  onChange={(e: any) => (passwordRef.current = e.target.value)}
                  className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                  placeholder="Password"
                  onKeyUp={handleOnKeyPress}
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-black shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2"
            >
              <span className="w-full">Submit</span>
            </button>
          </div>
          <div className="pt-12 pb-12 text-center">
            <p>
              계정이 없으신가요?&nbsp;
              <a href="#" className="font-semibold underline">
                가입하기
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/3 shadow-2xl flex items-center justify-center md:h-[800px] overflow-hidden">
        <img
          className="hidden object-cover w-full h-screen md:block"
          src="/images/signin/login.jpg"
        />
      </div>
    </div>
  )
}

export default Login

// <main className="flex min-h-screen flex-col items-center space-y-10 p-24">
//   <h1 className="text-4xl font-semibold">Login</h1>
//   <div>
//     <div>
//       <label
//         htmlFor="email"
//         className="block text-sm text-gray-800 dark:text-gray-200"
//       >
//         Email
//       </label>

//       <div className="mt-1">
//         <input
//           ref={emailRef}
//           onChange={(e: any) => {
//             emailRef.current = e.target.value
//           }}
//           id="email"
//           name="email"
//           type="email"
//           required
//           autoFocus={true}
//           className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
//         />
//       </div>
//     </div>

//     <div className="mt-4">
//       <label
//         htmlFor="password"
//         className="block text-sm text-gray-800 dark:text-gray-200"
//       >
//         Password
//       </label>
//       <div className="mt-1">
//         <input
//           type="password"
//           id="password"
//           name="password"
//           ref={passwordRef}
//           onChange={(e: any) => (passwordRef.current = e.target.value)}
//           className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
//         />
//       </div>
//     </div>

//     <div className="mt-6">
//       <button
//         onClick={handleSubmit}
//         className="w-full transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
//       >
//         Log In
//       </button>
//     </div>
//   </div>
// </main>
