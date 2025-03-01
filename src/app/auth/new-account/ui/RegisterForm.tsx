'use client'
import { login, registerUser } from '@/actions'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormInputs = {
    name: string
    email: string
    password: string
}


export const RegisterForm = () => {

    const [errorMessage, setErrorMessage] = React.useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const { name, email, password } = data
        const res = await registerUser(name, email, password)

        if (!res.ok) {
            setErrorMessage(res.message)
            return
        }

        await login(email.toLowerCase(), password)
        window.location.replace('/')

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            {/* {
                errors.name?.type === 'required' && (
                    <span className='text-red-500'>* Name is a required field</span>
                )
            } */}

            <label htmlFor="email">Name</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.name
                        }
                    )
                }
                type="text"
                autoFocus
                {...register('name', { required: true })}
            />

            <label htmlFor="email">Email</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.email
                        }
                    )
                }
                type="email"
                {...register('email', { required: true, pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i })}
            />


            <label htmlFor="email">Password</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.password
                        }
                    )
                }
                type="password"
                {...register('password', { required: true, minLength: 6 })}
            />

            {
                <span className='text-red-500'>{errorMessage}</span>
            }

            <button

                className="btn-primary">
                Create Account
            </button>


            {/* divisor line */}
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

        </form>
    )
}
