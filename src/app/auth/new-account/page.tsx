import { titleFont } from '@/config/font';
import Link from 'next/link';

export default function () {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ titleFont.className } text-3xl mb-5` }>Create Account</h1>

      <div className="flex flex-col">

        <label htmlFor="email">Name</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="text" />


        <label htmlFor="email">Password</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email" />

        <button
          
          className="btn-primary">
          Create Account
        </button>


        {/* divisor line */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">Or</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/login" 
          className="btn-secondary text-center">
          Login
        </Link>

      </div>
    </div>
  );
}