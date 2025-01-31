import React from 'react';
import { Check, Lightbulb, Gauge } from 'lucide-react';
import Image from 'next/image';
import Veracitylogo from '@/app/assets/images/Veracitylogo.png';
import backgroundImage from '@/public/images/backgroundImage.jpg';

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
  <div className="bg-slate-100 shadow-md p-8 rounded-xl text-center flex flex-col items-center hover:scale-105 transition-transform duration-300 mx-4">
    <div className="text-teal-400 mb-6 scale-150">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h3>
    <p className="text-gray-600 text-lg">{description}</p>
  </div>
);

const HowItWorks: React.FC<HowItWorksProps> = ({ title, description }) => (
  <div className="bg-gray-100 bg-opacity-80 shadow-sm shadow-emerald-500 p-6 rounded-lg text-center flex flex-col items-center hover:shadow-lg hover:shadow-emerald-600 transition-shadow duration-300">
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const VeracityChecker: React.FC = () => {
  const scrollToTryItNow = () => {
    const tryItNowSection = document.getElementById('try-it-now');
    if (tryItNowSection) {
      tryItNowSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div> 
      <div className="relative text-white p-5">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-navy-900"
          style={{
            backgroundImage: 'url(/images/backgroundImage.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(40%)'
          }}
        />

        {/* Content Container */}
        <div className="relative z-10">
          <div className="container">
            {/* Header Section */}
            <div className="text-center pb-32">
              <div className="flex items-center mb-16">
                <h1 className="text-3xl md:text-4xl">
                  <span className="text-white">VERA</span>
                  <span className="text-teal-400 font-bold">CITY</span>
                  <span className="text-white ml-2">CHECKER</span>
                </h1>
              </div>

              <div className="flex justify-center mb-12">
                <div className="w-24 h-24 relative">
                  <Image
                    src={Veracitylogo}
                    alt="Veracity Logo"
                    width={96}
                    height={96}
                    className="scale-150"
                  />
                </div>
              </div>

              <p className="text-xl mb-12 text-gray-200">Ensuring Truth & Integrity in Academic Writing</p>

              <button 
                onClick={scrollToTryItNow}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-300 transform hover:scale-105">
                Detect Plagiarism
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-20 px-4 bg-white">
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
  );
};

export default VeracityChecker;