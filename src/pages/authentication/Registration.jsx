import React, { useState, useContext } from 'react';
import { Button, Input } from '@material-tailwind/react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../provider/AuthProvider';

const DEFAULT_PHOTO_URL = 'https://i.postimg.cc/SsS9wZWD/pngwing-com-1.png';

const Registration = () => {
    const [name, setName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { registerWithEmailAndPassword, updateUserInfo, signInWithGoogole } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await registerWithEmailAndPassword(email, password);
            const user = userCredential.user;
            const finalPhotoURL = photoURL || DEFAULT_PHOTO_URL;
            await updateUserInfo(name, finalPhotoURL);
            toast.success('Registration successful!');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogole();
            toast.success('Google sign-in successful!');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='md:bg-white h-screen flex items-center px-5'>
            <div className='bg-white w-full md:max-w-[450px] backdrop-blur-lg mx-auto rounded-xl p-8 border shadow-lg md:p-14'>
                <h2 className='font-poppins font-bold text-4xl text-center'>Registration</h2>
                <hr className='mt-5 mb-2' />
                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                    <Input
                        label='Name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Input
                        label='Photo URL'
                        type='text'
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                    />
                    <Input
                        label='Email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label='Password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        variant='gradient'
                        color='deep-orange'
                        type='submit'
                        className='w-full'
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
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
                    onClick={handleGoogleSignIn}
                >
                    <FcGoogle className='text-xl' /> Sign In With Google
                </Button>
                <p className='text-center text-xs mt-6'>
                    Already have an account? <Link to={'/login'} className='text-blue-700 font-bold'>Login Here</Link>
                </p>
            </div>
        </div>
    );
};

export default Registration;
