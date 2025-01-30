"use client";
import { useState } from 'react';
import Head from 'next/head';
import aiIcon from '@/app/assets/images/aiIcon.png';
import tick from '@/app/assets/images/tick.png';
import Image from 'next/image';
import { AlertTriangle, Check } from 'lucide-react';
import VeracityChecker from './components/VeracityChecker';

interface PlagiarismResult {
  isPlagiarized: boolean;
  confidence: number;
  message: string;
}

export default function Home() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlagiarismResult | null>(null);
  const [error, setError] = useState('');

  const checkPlagiarism = async () => {
    if (!text.trim()) {
      setError('Please enter some text to check');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/check-plagiarism', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to check plagiarism');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to check plagiarism. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Veracity Checker - AI-Powered Plagiarism Detection</title>
        <meta name="description" content="AI-powered plagiarism detection tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <VeracityChecker />

        <div className="mx-4 text-black sm:mx-20">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
            Try It Now
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <textarea
              className="w-full h-48 p-4 mb-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:shadow-md"
              placeholder="Paste your text here to check for plagiarism..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="flex justify-center">
              <button
                className={`px-6 py-2 rounded-lg text-white font-medium transition-all transform hover:scale-105 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                onClick={checkPlagiarism}
                disabled={loading}
              >
                {loading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {result && (
              <div
                className={`mt-6 p-6 rounded-lg transition-all hover:shadow-lg ${
                  result.isPlagiarized
                    ? 'bg-orange-50 text-yellow-500'
                    : 'bg-green-50 text-green-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-center">
                  <Image
                    src={result.isPlagiarized ? aiIcon : tick}
                    alt=""
                    className="w-16 h-16 sm:w-24 sm:h-24"
                  />
                  <div className="sm:mx-5 mt-4 sm:mt-0">
                    <h3 className="text-2xl sm:text-3xl text-center font-extralight mb-2">
                      {result.isPlagiarized
                        ? 'AI-Generated Content Detected'
                        : 'Human-Written Content Detected'}
                    </h3>
                    <p className="text-xl sm:text-2xl text-center font-bold">
                      {(result.confidence * 100).toFixed(2)}% Confidence
                    </p>
                  </div>
                </div>

                <div>
                  {result.isPlagiarized ? (
                    <div className="space-y-2 bg-red-100 rounded-md pt-7 mt-10 text-center">
                      <p className="text-yellow-500 text-xl sm:text-2xl font-extralight">
                        Detection Indicators:
                      </p>
                      {[
                        'Highly structured and formal language patterns',
                        'Consistent technical accuracy throughout',
                        'Uniform sentence complexity',
                        'Characteristic AI language model patterns detected',
                      ].map((indicator, index) => (
                        <div key={index} className="flex items-center gap-2 justify-center text-gray-700">
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          <span>{indicator}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2 bg-green-100 rounded-md pt-7 mt-10 text-center">
                      <p className="text-green-500 text-xl sm:text-2xl font-extralight">
                        Analysis Details:
                      </p>
                      {[
                        'Natural language patterns detected',
                        'Consistent writing style',
                        'Organic sentence structure variations',
                        'Authentic thought progression',
                      ].map((detail, index) => (
                        <div key={index} className="flex items-center gap-2 justify-center text-gray-700">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}