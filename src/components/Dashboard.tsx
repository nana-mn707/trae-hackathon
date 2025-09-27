import React, { useState, useEffect } from 'react';
import { ChatHistory } from './ChatHistory';
import { TravelPlanDisplay } from './TravelPlanDisplay';
import CalendarView from './CalendarView';
import { ChevronLeft, ChevronRight, MessageSquare, MapPin, Calendar } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [collapsedColumns, setCollapsedColumns] = useState({
    chat: false,
    plan: false,
    calendar: false
  });
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleColumn = (column: 'chat' | 'plan' | 'calendar') => {
    setCollapsedColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  const openColumns = Object.values(collapsedColumns).filter(collapsed => !collapsed).length;
  const columnWidth = openColumns > 0 ? `${100 / openColumns}%` : '33.333%';

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
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* Left Column - Chat History */}
          <div 
            className={`transition-all duration-300 h-full lg:h-full overflow-hidden ${
              collapsedColumns.chat ? 'lg:w-12 h-12' : 'flex-1 lg:flex-1'
            }`}
            style={!collapsedColumns.chat && isDesktop ? { width: columnWidth } : {}}
          >
            <div className="relative h-full">
              <button
                onClick={() => toggleColumn('chat')}
                className="absolute top-0 right-0 z-10 bg-white shadow-md rounded-l-lg p-2 hover:bg-gray-50 transition-colors"
                title={collapsedColumns.chat ? 'チャット履歴を展開' : 'チャット履歴を折りたたむ'}
              >
                {collapsedColumns.chat ? (
                  <div className="flex flex-col items-center">
                    <ChevronRight className="w-4 h-4" />
                    <MessageSquare className="w-4 h-4 mt-1" />
                  </div>
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </button>
              {!collapsedColumns.chat && <ChatHistory />}
            </div>
          </div>

          {/* Middle Column - Travel Plan */}
          <div 
            className={`transition-all duration-300 h-full lg:h-full overflow-hidden ${
              collapsedColumns.plan ? 'lg:w-12 h-12' : 'flex-1 lg:flex-1'
            }`}
            style={!collapsedColumns.plan && isDesktop ? { width: columnWidth } : {}}
          >
            <div className="relative h-full">
              <button
                onClick={() => toggleColumn('plan')}
                className="absolute top-0 right-0 z-10 bg-white shadow-md rounded-l-lg p-2 hover:bg-gray-50 transition-colors"
                title={collapsedColumns.plan ? '旅行プランを展開' : '旅行プランを折りたたむ'}
              >
                {collapsedColumns.plan ? (
                  <div className="flex flex-col items-center">
                    <ChevronRight className="w-4 h-4" />
                    <MapPin className="w-4 h-4 mt-1" />
                  </div>
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </button>
              {!collapsedColumns.plan && <TravelPlanDisplay />}
            </div>
          </div>

          {/* Right Column - Calendar */}
          <div 
            className={`transition-all duration-300 h-full lg:h-full overflow-hidden ${
              collapsedColumns.calendar ? 'lg:w-12 h-12' : 'flex-1 lg:flex-1'
            }`}
            style={!collapsedColumns.calendar && isDesktop ? { width: columnWidth } : {}}
          >
            <div className="relative h-full">
              <button
                onClick={() => toggleColumn('calendar')}
                className="absolute top-0 right-0 z-10 bg-white shadow-md rounded-l-lg p-2 hover:bg-gray-50 transition-colors"
                title={collapsedColumns.calendar ? 'カレンダーを展開' : 'カレンダーを折りたたむ'}
              >
                {collapsedColumns.calendar ? (
                  <div className="flex flex-col items-center">
                    <ChevronRight className="w-4 h-4" />
                    <Calendar className="w-4 h-4 mt-1" />
                  </div>
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </button>
              {!collapsedColumns.calendar && <CalendarView />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
export { Dashboard };