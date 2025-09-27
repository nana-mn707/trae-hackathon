import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, parseISO, isSameMonth } from 'date-fns';
import { ja } from 'date-fns/locale';
import { mockCalendarEvents, mockCouple } from '../data/mockData';

const CalendarView: React.FC = () => {
  const events = mockCalendarEvents;
  const couple = mockCouple;
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(parseISO(event.date), date));
  };

  const getDateStatus = (date: Date) => {
    const dayEvents = getEventsForDate(date);
    
    const person1Events = dayEvents.filter(e => e.person === 'person1' || e.person === 'both');
    const person2Events = dayEvents.filter(e => e.person === 'person2' || e.person === 'both');
    
    const person1Free = person1Events.some(e => e.type === 'free');
    const person2Free = person2Events.some(e => e.type === 'free');
    const bothFree = dayEvents.some(e => e.person === 'both' && e.type === 'free');
    
    if (bothFree) return 'both-free';
    if (person1Free && person2Free) return 'both-available';
    if (person1Free) return 'person1-free';
    if (person2Free) return 'person2-free';
    
    const person1Busy = person1Events.some(e => e.type === 'work' || e.type === 'personal');
    const person2Busy = person2Events.some(e => e.type === 'work' || e.type === 'personal');
    
    if (person1Busy && person2Busy) return 'both-busy';
    if (person1Busy) return 'person1-busy';
    if (person2Busy) return 'person2-busy';
    
    return 'normal';
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-pink-200 h-full flex flex-col">
      {/* ヘッダー */}
      <div className="p-4 border-b border-pink-100 flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <span className="mr-2">📅</span>
          カレンダー
        </h2>
      </div>

      {/* スクロール可能なコンテンツ */}
      <div className="flex-1 overflow-y-auto p-4">
      {/* カレンダーヘッダー */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <h3 className="text-lg font-semibold text-gray-900">
          {format(currentDate, 'yyyy年M月', { locale: ja })}
        </h3>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* カレンダーグリッド - Googleカレンダー風 */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 mb-4">
        {daysInMonth.map((date) => {
          const dayEvents = getEventsForDate(date);
          const status = getDateStatus(date);
          const isCurrentMonth = isSameMonth(date, currentDate);
          const isToday = isSameDay(date, new Date());
          
          return (
            <div key={date.toISOString()} className={`bg-white min-h-[80px] p-1 relative ${
              !isCurrentMonth ? 'bg-gray-50' : ''
            } ${
              isToday ? 'bg-blue-50' : ''
            }`}>
              {/* 日付 */}
              <div className={`text-xs font-medium mb-1 ${
                !isCurrentMonth ? 'text-gray-400' :
                isToday ? 'text-blue-600 font-bold' :
                'text-gray-700'
              }`}>
                {format(date, 'd')}
                {status === 'both-free' && (
                  <Heart className="w-2 h-2 inline ml-1 text-pink-500 fill-current" />
                )}
              </div>
              
              {/* イベント - Googleカレンダー風 */}
              <div className="space-y-0.5">
                {dayEvents.slice(0, 3).map((event, index) => (
                  <div
                    key={index}
                    className={`text-xs px-1 py-0.5 rounded text-white truncate ${
                      event.type === 'work' ? 'bg-red-500' :
                      event.type === 'personal' ? 'bg-blue-500' :
                      event.type === 'free' ? 'bg-green-500' :
                      'bg-gray-500'
                    }`}
                    title={`${event.title} (${event.person === 'person1' ? couple.person1.name : event.person === 'person2' ? couple.person2.name : '両方'})`}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 px-1">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 凡例 */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-gray-700 mb-2">カップル情報</div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{couple.person1.avatar}</span>
            <span className="text-sm text-gray-700">{couple.person1.name}</span>
            <div className="w-3 h-3 bg-pink-200 rounded-full"></div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-lg">{couple.person2.avatar}</span>
            <span className="text-sm text-gray-700">{couple.person2.name}</span>
            <div className="w-3 h-3 bg-teal-200 rounded-full"></div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="text-sm font-medium text-gray-700 mb-2">ステータス</div>
          
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-br from-pink-200 to-teal-200 rounded-full border border-pink-300"></div>
              <span className="text-gray-600">二人とも空き</span>
              <Heart className="w-3 h-3 text-pink-500 fill-current" />
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-pink-100 rounded-full"></div>
              <span className="text-gray-600">{couple.person1.name}が空き</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-teal-100 rounded-full"></div>
              <span className="text-gray-600">{couple.person2.name}が空き</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
              <span className="text-gray-600">二人とも忙しい</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="text-sm font-medium text-gray-700 mb-2">イベント種別</div>
          
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span className="text-gray-600">仕事</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-gray-600">個人用事</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-600">空き時間</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CalendarView;