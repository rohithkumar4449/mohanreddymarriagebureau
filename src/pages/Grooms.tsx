import React, { useEffect, useState } from 'react';
import { profileService } from '../services/api';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface CustomField {
  label: string;
  value: string;
}

interface Profile {
  _id: string;
  name: string;
  dateOfBirth: string;
  nativePlace: string;
  height: string;
  color: string;
  occupation: string;
  education: string;
  fatherName: string;
  fatherOccupation: string;
  mobileNumber: string;
  customFields?: CustomField[];
}

const Grooms = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        const response = await profileService.getProfiles('groom');
        setProfiles(response.data);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [handleError]);

  const getWhatsAppLink = (profile: Profile) => {
    const message = encodeURIComponent(`I am interested in ${profile.name}'s profile from Mohan Reddy Marriage Bureau.`);
    return `https://wa.me/+91${profile.mobileNumber}?text=${message}`;
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <i className="fas fa-male text-2xl text-blue-500"></i>
          <h1 className="text-3xl font-bold text-gray-900">
            Looking for Groom (వరుడు కావలెను)
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <div 
              key={profile._id} 
              className="profile-card bg-white rounded-lg shadow-lg hover:shadow-xl p-6 transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{profile.name}</h3>
                  <p className="text-blue-500 font-medium">
                    {new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear()} Years
                  </p>
                </div>

                <div className="space-y-2 text-gray-600">
                  <p><span className="font-medium text-gray-700">Native:</span> {profile.nativePlace}</p>
                  <p><span className="font-medium text-gray-700">Height:</span> {profile.height}</p>
                  <p><span className="font-medium text-gray-700">Education:</span> {profile.education}</p>
                  <p><span className="font-medium text-gray-700">Occupation:</span> {profile.occupation}</p>
                  <p><span className="font-medium text-gray-700">Father's Name:</span> {profile.fatherName}</p>
                  <p><span className="font-medium text-gray-700">Father's Occupation:</span> {profile.fatherOccupation}</p>
                  
                  {profile.customFields && profile.customFields.length > 0 && (
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      {profile.customFields.map((field, index) => (
                        <p key={index}>
                          <span className="font-medium text-gray-700">{field.label}:</span> {field.value}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Contact: {profile.mobileNumber.slice(0, 6)}XXXX
                    </span>
                    <a
                      href={getWhatsAppLink(profile)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white transition-colors"
                    >
                      <i className="fab fa-whatsapp mr-2"></i>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!isLoading && profiles.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No profiles available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default Grooms;