import { titleFont } from '@/config/font';
import { RegisterForm } from './ui/RegisterForm';

export default function () {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={`${titleFont.className} text-3xl mb-5`}>Create Account</h1>

      <RegisterForm/>
    </div>
  );
}