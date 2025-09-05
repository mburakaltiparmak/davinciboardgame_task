import React from 'react';
import Users from '../Users';
import Posts from '../Posts';

const Body: React.FC = () => {
  return (
    <main className="flex-1 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            Welcome to
            <span className="block text-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              M.Burak Altiparmak's
            </span>
            <span className="block text-gray-600">
          Web Developer Task
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            I'm applying to Front End Developer position and this is the Phase 1 task.
          </p>

        
          {/* Kullanıcılar Bölümü */}
          <section>
            <Users />
          </section>

         
        </div>
        </div>
      
    </main>
  );
};

export default Body;