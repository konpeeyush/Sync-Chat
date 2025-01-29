import React from 'react'
import { useState } from 'react'
import { Mail, MessageSquare, User, Lock, EyeOff, EyeIcon, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { useAuthStore } from '../store/useAuthStore';
import { AuthImagePattern } from '../components';

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    })

    const { signup, isSigningUp } = useAuthStore();
    const vaildateForm = () => {
        if (!formData.fullName.trim()) return toast.error('Full Name is required');
        if (!formData.email.trim()) return toast.error('Email is required');
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Invalid Email format');
        if (!formData.password.trim()) return toast.error('Password is required');
        if (formData.password.length < 6) return toast.error('Password must be at least 6 characters long');

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = vaildateForm();

        if (success) {
            signup(formData);
        }
    }

    return (
        <div
            className='min-h-screen grid lg:grid-cols-2 '
        >
            {/* Left Side of the form */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12 ">
                <div className='w-full max-w-md space-y-8'>
                    {/* form */}
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                                <MessageSquare className='size-6 text-primary' />
                            </div>
                            <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
                            <p className='text-base-content/60'>Get started with your free acount</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Full Name Details */}
                        <div className="form-control">
                            <label className="label">
                                <span className='label-text font-medium'>Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    type='text'
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder='Enter your full name'
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                        </div>
                        {/* Email Details */}
                        <div className="form-control">
                            <label className="label">
                                <span className='label-text font-medium'>Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    type='email'
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder='Enter your email'
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        {/* Password Details */}
                        <div className="form-control">
                            <label className="label">
                                <span className='label-text font-medium'>Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder='********'
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type='button'
                                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className='size-5 text-base-content/40' />
                                    ) : (
                                        <EyeIcon className='size-5 text-base-content/40' />
                                    )}
                                </button>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <button type='submit' className='btn btn-primary w-full'>
                            {isSigningUp ? (
                                <>
                                    <Loader2 className='size-5 animate-spin' />
                                    <span>Loading...</span>
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    {/* Already have an account? Sign Up */}
                    <div className="text-center">
                        <p className=' text-base-content/60'>
                            Already have an account?{" "}
                            <Link to='/login' className='link link-primary'>Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side of the form */}
            <AuthImagePattern
                title='Join the community'
                subtitle="Connect with friends, share moments, and grow your network."
            />

            {/* Toaster */}
            <Toaster />
        </div>
    )
}

export default SignUpPage; 