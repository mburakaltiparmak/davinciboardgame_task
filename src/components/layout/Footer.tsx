import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-8 flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4">Da Vinci Board Game Web Developer Assessment</h3>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Built with Vite, React, TypeScript, and Tailwind CSS.
            </p>
      </div>
    </footer>
  );
};

export default Footer;