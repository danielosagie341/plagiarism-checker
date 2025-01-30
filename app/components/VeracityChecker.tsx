import React from 'react';
import backgroundimage from '@/app/assets/images/backgroundimage.jpg';
import Veracitylogo from '@/app/assets/images/Veracitylogo.png';
import { Check, Lightbulb, Gauge } from 'lucide-react';
import Image from 'next/image';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface HowItWorksProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-gray-100 bg-opacity-80 shadow-md p-6 rounded-lg text-center flex flex-col items-center hover:scale-105 transition-transform duration-300">
    <div className="text-teal-400 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HowItWorks: React.FC<HowItWorksProps> = ({ title, description }) => (
  <div className="bg-gray-100 bg-opacity-80 shadow-sm shadow-emerald-500 p-6 rounded-lg text-center flex flex-col items-center hover:shadow-lg hover:shadow-emerald-600 transition-shadow duration-300">
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const VeracityChecker: React.FC = () => {
  return (
    <div className="min-h-screen relative text-white bg-blue-400 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={backgroundimage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      <div className="container mx-auto pt-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-start mx-5">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="text-white">VERA</span>
              <span className="text-teal-400">CITY</span>
              <span className="text-white ml-2">CHECKER</span>
            </h1>
          </div>

          <div className="flex justify-center my-8">
            <div className="w-16 h-16">
              <Image src={Veracitylogo} alt="Veracity Logo" className="scale-150" />
            </div>
          </div>

          <p className="text-lg mb-8">Ensuring Truth & Integrity in Academic Writing</p>

          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-300 transform hover:scale-105">
            Detect Plagiarism
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20 px-10 bg-white bg-opacity-90">
          <FeatureCard
            icon={<Check size={32} />}
            title="Accurate Detection"
            description="Utilizing AI to detect similarities with high precision."
          />
          <FeatureCard
            icon={<Lightbulb size={32} />}
            title="Explainable AI"
            description="Understand why text is flagged with transparent insights."
          />
          <FeatureCard
            icon={<Gauge size={32} />}
            title="Fast Analysis"
            description="Get results in seconds with our optimized system."
          />
        </div>

        <h1 className="text-3xl py-10 pt-16 bg-white text-center text-black">How It Works</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20 px-10 bg-white bg-opacity-90">
          <HowItWorks
            title="1. Paste Your Text"
            description="Copy And Paste The Text You Want To Analyze"
          />
          <HowItWorks
            title="2. AI Analyzes It"
            description="Our model scans and compares the text with databases"
          />
          <HowItWorks
            title="3. Get Transparent Results"
            description="See flagged Content and explanations instantly"
          />
        </div>
      </div>
    </div>
  );
};

export default VeracityChecker;