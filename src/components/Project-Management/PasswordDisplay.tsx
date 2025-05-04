import { useState } from 'react';

const PasswordDisplay = ({ password }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    // Hide 'Copied' message and password after 1.5 seconds
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">Server Password</label>
        <button
          onClick={handleCopy}
          className={`text-xs px-2 py-1 rounded transition-colors ${
            copied 
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
        >
          {copied ? (
            <>
              <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      <div className="font-mono text-sm bg-gray-50 p-2.5 rounded text-gray-800 break-all select-none">
        ***********
      </div>   
    </div>
  );
};

export default PasswordDisplay;
