import React from 'react';
import { Users, Heart, Star, Trophy } from 'lucide-react';

const Statistics = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      value: "10000+",
      label: "నమోదైన వధూవరులు",
      description: "Registered Profiles"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      value: "5000+",
      label: "విజయవంతమైన వివాహాలు",
      description: "Successful Marriages"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      value: "15+",
      label: "సంవత్సరాల అనుభవం",
      description: "Years of Experience"
    },
    {
      icon: <Trophy className="w-8 h-8 text-green-500" />,
      value: "100%",
      label: "సంతృప్తి",
      description: "Customer Satisfaction"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">మా విజయగాథ</h2>
          <p className="mt-4 text-lg text-gray-600">
            వేలాది కుటుంబాల విశ్వాసం పొందిన వివాహ వేదిక
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-lg font-medium text-gray-800 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;