import React from 'react';
import { ChatHistory } from './ChatHistory';
import { TravelPlanDisplay } from './TravelPlanDisplay';
import CalendarView from './CalendarView';

const Dashboard: React.FC = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-pink-50 to-teal-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-pink-100 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Couple Travel Planner</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome back!</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Left Column - Chat History */}
          <div className="lg:col-span-1 h-full overflow-hidden">
            <ChatHistory />
          </div>

          {/* Middle Column - Travel Plan */}
          <div className="lg:col-span-1 h-full overflow-hidden">
            <TravelPlanDisplay />
          </div>

          {/* Right Column - Calendar */}
          <div className="lg:col-span-1 h-full overflow-hidden">
            <CalendarView />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
export { Dashboard };