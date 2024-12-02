import React, { useState, useEffect } from 'react';
import { adminService, profileService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import CustomFieldsForm from '../components/CustomFieldsForm';
import EditProfileModal from '../components/EditProfileModal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Profile } from '../types';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [customFields, setCustomFields] = useState<{ label: string; value: string }[]>([]);
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });
  const [profileForm, setProfileForm] = useState({
    name: '',
    dateOfBirth: '',
    nativePlace: '',
    height: '',
    color: '',
    occupation: '',
    education: '',
    profileType: 'bride',
    fatherName: '',
    fatherOccupation: '',
    mobileNumber: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async () => {
    try {
      await adminService.getProfile();
      setIsLoggedIn(true);
      fetchProfiles();
    } catch (error) {
      console.error('Token verification error:', error);
      adminService.logout();
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProfiles = async () => {
    try {
      const response = await profileService.getProfiles();
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      toast.error('Failed to fetch profiles');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await adminService.login(loginForm);
      setIsLoggedIn(true);
      fetchProfiles();
      toast.success('Logged in successfully');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    adminService.logout();
    setIsLoggedIn(false);
    navigate('/admin');
  };

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const profileData = {
        ...profileForm,
        customFields: customFields.length > 0 ? customFields : undefined,
      };
      await profileService.createProfile(profileData);
      toast.success('Profile created successfully');
      fetchProfiles();
      setProfileForm({
        name: '',
        dateOfBirth: '',
        nativePlace: '',
        height: '',
        color: '',
        occupation: '',
        education: '',
        profileType: 'bride',
        fatherName: '',
        fatherOccupation: '',
        mobileNumber: '',
      });
      setCustomFields([]);
    } catch (error) {
      console.error('Error creating profile:', error);
      toast.error('Failed to create profile');
    }
  };

  const handleEditProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setIsEditModalOpen(true);
  };

  const handleUpdateProfile = async (id: string, data: Partial<Profile>) => {
    try {
      await profileService.updateProfile(id, data);
      toast.success('Profile updated successfully');
      fetchProfiles();
      setIsEditModalOpen(false);
      setSelectedProfile(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleDeleteProfile = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      try {
        await profileService.deleteProfile(id);
        toast.success('Profile deleted successfully');
        fetchProfiles();
      } catch (error) {
        console.error('Error deleting profile:', error);
        toast.error('Failed to delete profile');
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Logout
          </button>
        </div>

        {/* Create Profile Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Profile</h2>
          <form onSubmit={handleCreateProfile} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Form fields remain the same */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                value={profileForm.dateOfBirth}
                onChange={(e) => setProfileForm({ ...profileForm, dateOfBirth: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Native Place</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                value={profileForm.nativePlace}
                onChange={(e) => setProfileForm({ ...profileForm, nativePlace: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Height</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                value={profileForm.height}
                onChange={(e) => setProfileForm({ ...profileForm, height: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                value={profileForm.color}
                onChange={(e) => setProfileForm({ ...profileForm, color: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Occupation</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                value={profileForm.occupation}
                onChange={(e) => setProfileForm({ ...profileForm, occupation: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Education</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                value={profileForm.education}
                onChange={(e) => setProfileForm({ ...profileForm, education: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Type</label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                value={profileForm.profileType}
                onChange={(e) => setProfileForm({ ...profileForm, profileType: e.target.value as 'bride' | 'groom' })}
              >
                <option value="bride">Bride</option>
                <option value="groom">Groom</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Father's Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                value={profileForm.fatherName}
                onChange={(e) => setProfileForm({ ...profileForm, fatherName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Father's Occupation</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                value={profileForm.fatherOccupation}
                onChange={(e) => setProfileForm({ ...profileForm, fatherOccupation: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                value={profileForm.mobileNumber}
                onChange={(e) => setProfileForm({ ...profileForm, mobileNumber: e.target.value })}
              />
            </div>

            <div className="col-span-full">
              <CustomFieldsForm
                customFields={customFields}
                setCustomFields={setCustomFields}
              />
            </div>

            <div className="col-span-full">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              >
                Create Profile
              </button>
            </div>
          </form>
        </div>

        {/* Profiles List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">All Profiles</h3>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {profiles.map((profile) => (
                <li key={profile._id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold">{profile.name}</h4>
                      <p className="text-sm text-gray-500">
                        {profile.profileType === 'bride' ? 'Bride' : 'Groom'} • {new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear()} years
                      </p>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Education: {profile.education}</p>
                        <p>Occupation: {profile.occupation}</p>
                        {profile.customFields && profile.customFields.length > 0 && (
                          <div className="mt-2">
                            <p className="font-medium">Custom Fields:</p>
                            {profile.customFields.map((field, index) => (
                              <p key={index}>
                                {field.label}: {field.value}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="ml-4 flex items-center space-x-4">
                      <button
                        onClick={() => handleEditProfile(profile)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProfile(profile._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {selectedProfile && (
        <EditProfileModal
          profile={selectedProfile}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedProfile(null);
          }}
          onSave={handleUpdateProfile}
        />
      )}
    </div>
  );
};

export default Admin;