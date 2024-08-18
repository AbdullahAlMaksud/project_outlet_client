import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Collapse } from '@material-tailwind/react';
import { AuthContext } from '../../provider/AuthProvider';

const UserProfile = () => {
    const { user, updateUserInfo } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

    const handleSave = async () => {
        try {
            await updateUserInfo(name, photoURL);
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            toast.error('Failed to update profile.');
        }
    };

    return (
        <div className="p-5 pt-28 max-w-80 md:max-w-xl lg:max-w-screen-xl mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center border py-2 rounded-xl rounded-b-none border-outlet-secondary border-b-0">
                User Profile
            </h2>
            <div className="flex items-center flex-col gap-4 mb-4">
                <img
                    src={user?.photoURL || 'https://i.postimg.cc/63cVH8m2/84c20033850498-56ba69ac290ea.png'}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                    <h3 className="text-xl font-semibold">{user?.displayName || 'No name'}</h3>
                    <p className="text-gray-600">{user?.email}</p>
                </div>
            </div>
            <Collapse open={isEditing}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Photo URL:</label>
                    <input
                        type="text"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </Collapse>
            {!isEditing && (
                <button
                    onClick={() => setIsEditing(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded w-full mt-4"
                >
                    Edit Profile
                </button>
            )}
        </div>
    );
};

export default UserProfile;
