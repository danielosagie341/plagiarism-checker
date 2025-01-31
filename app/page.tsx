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
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_HOST}/api/check-plagiarism`, {
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
    <div className="min-h-screen pb-20 bg-gray-50">
      <Head>
        <title>Veracity Checker - AI-Powered Plagiarism Detection</title>
        <meta name="description" content="AI-powered plagiarism detection tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
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
              <div className={`mt-6 p-6 rounded-lg border ${
                result.confidence * 100 <= 20 ? 'bg-green-50' :
                result.confidence * 100 <= 45 ? 'bg-yellow-50' :
                result.confidence * 100 <= 60 ? 'bg-orange-50' : 'bg-red-50'
              }`}>
                <div className="flex items-center justify-center mb-4">
                  {result.confidence * 100 <= 20 ? (
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">🎉</span>
                      <h2 className="text-2xl font-semibold text-green-600">No Plagiarism Detected</h2>
                    </div>
                  ) : result.confidence * 100 <= 45 ? (
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">📊</span>
                      <h2 className="text-2xl font-semibold text-yellow-500">Low Similarities Detected</h2>
                    </div>
                  ) : result.confidence * 100 <= 60 ? (
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">⚠️</span>
                      <h2 className="text-2xl font-semibold text-orange-500">High Similarities Detected</h2>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">🚫</span>
                      <h2 className="text-2xl font-semibold text-red-600">Plagiarism Detected</h2>
                    </div>
                  )}
                </div>

                <p className="text-center text-gray-700 mb-6">
                  {result.confidence * 100 <= 20 
                    ? "No plagiarism detected. Your writing is unique. Ensure citations are formatted correctly where needed."
                    : result.confidence * 100 <= 45
                    ? "Your text has minimal detected plagiarism. However, consider the following to maintain high originality and credibility."
                    : result.confidence * 100 <= 60
                    ? "Significant similarities have been detected in your text. Please review and revise the content to ensure academic integrity."
                    : "Critical level of matching content detected. Immediate revision is required to meet academic integrity standards."}
                </p>

                <div className="bg-opacity-20 py-3 px-6 rounded-lg mb-6 text-center" 
                  style={{ 
                    backgroundColor: result.confidence * 100 <= 20 ? 'rgba(220, 252, 231, 0.4)' :
                      result.confidence * 100 <= 45 ? 'rgba(255, 237, 213, 0.4)' :
                      result.confidence * 100 <= 60 ? 'rgba(255, 237, 213, 0.6)' :
                      'rgba(254, 226, 226, 0.6)'
                  }}>
                  <h3 className="text-xl font-semibold mb-2" style={{
                    color: result.confidence * 100 <= 20 ? '#16a34a' :
                      result.confidence * 100 <= 45 ? '#f97316' :
                      result.confidence * 100 <= 60 ? '#ea580c' : '#dc2626'
                  }}>
                    Overall Plagiarism Score: {(result.confidence * 100).toFixed(2)}%
                  </h3>
                  {result.confidence * 100 > 20 && (
                    <p className="text-gray-600">
                      {result.confidence * 100 <= 45
                        ? "Some common phrases and citations detected."
                        : result.confidence * 100 <= 60
                        ? "Multiple matching passages identified."
                        : "Substantial matching content found across sources."}
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 p-6 text-center rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Improvement Suggestions:
                  </h3>
                  <div className="space-y-3">
                    {result.confidence * 100 <= 20 ? (
                      <>
                        <div className="flex items-start justify-center gap-2">
                          <Check className="w-5 h-5 text-green-600 mt-1" />
                          <span className="text-gray-600">Maintain your current level of originality in future work.</span>
                        </div>
                        <div className="flex items-start justify-center gap-2">
                          <Check className="w-5 h-5 text-green-600 mt-1" />
                          <span className="text-gray-600">Continue using proper citation practices for referenced materials.</span>
                        </div>
                      </>
                    ) : result.confidence * 100 <= 45 ? (
                      <>
                        <div className="flex items-start justify-center gap-2">
                          <Check className="w-5 h-5 text-yellow-600 mt-1" />
                          <span className="text-gray-600">Review common phrases and consider rephrasing for uniqueness.</span>
                        </div>
                        <div className="flex items-start justify-center gap-2">
                          <Check className="w-5 h-5 text-yellow-600 mt-1" />
                          <span className="text-gray-600">Ensure all sources are properly cited and referenced.</span>
                        </div>
                        <div className="flex items-start justify-center gap-2">
                          <Check className="w-5 h-5 text-yellow-600 mt-1" />
                          <span className="text-gray-600">Consider incorporating more original analysis and insights.</span>
                        </div>
                      </>
                    ) : result.confidence * 100 <= 60 ? (
                      <>
                        <div className="flex items-start justify-center gap-2">
                          <Check className="w-5 h-5 text-orange-600 mt-1" />
                          <span className="text-gray-600">Thoroughly revise matching passages with original writing.</span>
                        </div>
                        <div className="flex items-start justify-center gap-2">
                          <Check className="w-5 h-5 text-orange-600 mt-1" />
                          <span className="text-gray-600">Use proper quotation marks for direct quotes.</span>
                        </div>
                        <div className="flex items-start justify-center gap-2">
                          <Check className="w-5 h-5 text-orange-600 mt-1" />
                          <span className="text-gray-600">Implement extensive paraphrasing while maintaining accurate citations.</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-start justify-center gap-2">
                          <Check className="w-5 h-5 text-red-600 mt-1" />
                          <span className="text-gray-600">Completely rewrite the content using your own words and ideas.</span>
                        </div>
                        <div className="flex items-start justify-center gap-2">
                          <Check className="w-5 h-5 text-red-600 mt-1" />
                          <span className="text-gray-600">Add proper citations for all referenced materials.</span>
                        </div>
                        <div className="flex items-start justify-center gap-2">
                          <Check className="w-5 h-5 text-red-600 mt-1" />
                          <span className="text-gray-600">Consider consulting with academic writing resources for guidance.</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}