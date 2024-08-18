import React, { useContext, useState } from 'react';
import { Button, Input } from '@material-tailwind/react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../provider/AuthProvider';

const Login = () => {
    const { logInWithEmailAndPassword, signInWithGoogole } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            await logInWithEmailAndPassword(email, password);
            toast.success('Successfully logged in!');
            navigate('/');
        } catch (err) {
            setError(err.message);
            toast.error('Login failed. Please try again.');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogole();
            toast.success('Successfully logged in with Google!');
            navigate('/');
        } catch (err) {
            setError(err.message);
            toast.error('Google login failed. Please try again.');
        }
    };

    return (
        <div className='md:bg-white h-screen flex items-center px-5'>
            <div className='bg-white w-full md:max-w-[450px] backdrop-blur-lg mx-auto rounded-xl p-8 border shadow-lg md:p-14'>
                <h2 className='font-poppins font-bold text-4xl text-center'>Login</h2>
                <hr className='mt-5 mb-2' />
                <form onSubmit={handleEmailLogin} className='flex flex-col gap-3'>
                    {error && <p className='text-red-500'>{error}</p>}
                    <Input
                        label='Email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label='Password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant='gradient' color='deep-orange' type='submit' className='w-full'>
                        Login
                    </Button>
                </form>
                <div className='flex items-center gap-3 justify-center my-3'>
                    <hr className='w-1/2 border-1 border-outlet-text' />
                    <p className='flex-1 text-center'>or</p>
                    <hr className='w-1/2 border-1 border-outlet-text' />
                </div>
                <Button
                    variant='outlined'
                    className='flex items-center text-sm gap-4 w-full justify-center'
                    onClick={handleGoogleLogin}
                >
                    <FcGoogle className='text-xl' /> Sign In With Google
                </Button>
                <p className='text-center text-xs mt-6'>
                    Don't have an account?{' '}
                    <Link to={'/registration'} className='text-blue-700 font-bold'>
                        Register Here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
