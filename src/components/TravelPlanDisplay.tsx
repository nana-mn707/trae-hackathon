import React from 'react';
import { MapPin, Clock, DollarSign, Calendar } from 'lucide-react';
import { Activity } from '../types';
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import { mockTravelPlan } from '../data/mockData';
import GoogleMap from './GoogleMap';

const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sightseeing': return '🏛️';
      case 'food': return '🍽️';
      case 'shopping': return '🛍️';
      case 'entertainment': return '🎭';
      case 'relaxation': return '🧘';
      case 'transport': return '🚗';
      default: return '📍';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sightseeing': return 'bg-blue-100 text-blue-800';
      case 'food': return 'bg-orange-100 text-orange-800';
      case 'shopping': return 'bg-purple-100 text-purple-800';
      case 'entertainment': return 'bg-pink-100 text-pink-800';
      case 'relaxation': return 'bg-green-100 text-green-800';
      case 'transport': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-xl">{getCategoryIcon(activity.category)}</span>
          <h4 className="font-semibold text-gray-900">{activity.name}</h4>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
          {activity.category}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{Math.floor(activity.duration / 60)}時間{activity.duration % 60 > 0 ? `${activity.duration % 60}分` : ''}</span>
          </div>
          {activity.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{activity.location}</span>
            </div>
          )}
        </div>
        {activity.cost && (
          <div className="flex items-center space-x-1 text-pink-600 font-medium">
            <DollarSign className="w-4 h-4" />
            <span>¥{activity.cost.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const getCategoryIcon = (category: string): string => {
  switch (category) {
    case 'sightseeing': return '🏛️';
    case 'food': return '🍽️';
    case 'shopping': return '🛍️';
    case 'entertainment': return '🎭';
    case 'transport': return '🚗';
    default: return '📍';
  }
};

const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'sightseeing': return 'bg-blue-100 text-blue-800';
    case 'food': return 'bg-orange-100 text-orange-800';
    case 'shopping': return 'bg-purple-100 text-purple-800';
    case 'entertainment': return 'bg-pink-100 text-pink-800';
    case 'transport': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const TravelPlanDisplay: React.FC = () => {
  const plan = mockTravelPlan;
  const totalCost = plan.activities.reduce((sum, activity) => sum + (activity.cost || 0), 0);
  const totalDuration = plan.activities.reduce((sum, activity) => sum + activity.duration, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-pink-200 h-full flex flex-col">
      {/* ヘッダー */}
      <div className="p-4 border-b border-pink-100 flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <span className="mr-2">🗺️</span>
          旅行プラン
        </h2>
      </div>

      {/* スクロール可能なコンテンツ */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* プラン概要 */}
        <div className="mb-6">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900">{plan.title}</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-teal-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-teal-700">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">目的地</span>
            </div>
            <p className="text-teal-900 font-semibold mt-1">{plan.destination}</p>
          </div>
          
          <div className="bg-pink-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-pink-700">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">期間</span>
            </div>
            <p className="text-pink-900 font-semibold mt-1">
              {format(parseISO(plan.startDate), 'M/d', { locale: ja })} - {format(parseISO(plan.endDate), 'M/d', { locale: ja })}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-purple-700">
              <DollarSign className="w-4 h-4" />
              <span className="font-medium">予算</span>
            </div>
            <p className="text-purple-900 font-semibold mt-1">
              ¥{plan.budget?.toLocaleString() || totalCost.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-blue-700">
              <Clock className="w-4 h-4" />
              <span className="font-medium">総時間</span>
            </div>
            <p className="text-blue-900 font-semibold mt-1">
              {Math.floor(totalDuration / 60)}時間{totalDuration % 60 > 0 ? `${totalDuration % 60}分` : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Google Maps */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">🗺️</span>
          ルートマップ
        </h4>
        <GoogleMap 
          activities={plan.activities.map(activity => ({
            id: activity.id,
            name: activity.name,
            location: activity.location || '京都',
            description: activity.description,
            duration: activity.duration,
            cost: activity.cost,
            category: activity.category
          }))}
          className="mb-6"
        />
      </div>

      {/* Googleカレンダー風タイムライン */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">📅</span>
          スケジュール
        </h4>
        
        <div className="space-y-6">
          {plan.timeline.map((timelineItem) => (
            <div key={timelineItem.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* 日付ヘッダー */}
              <div className="bg-gradient-to-r from-pink-50 to-teal-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {timelineItem.day}
                  </div>
                  <h5 className="font-semibold text-gray-900">
                    {format(parseISO(timelineItem.date), 'M月d日(E)', { locale: ja })}
                  </h5>
                </div>
              </div>
              
              {/* 時間軸表示 */}
              <div className="relative">
                {/* 時間軸の線 */}
                <div className="absolute left-16 top-0 bottom-0 w-px bg-gray-200"></div>
                
                <div className="space-y-0">
                  {timelineItem.activities.map((activitySchedule, index) => {
                    const activity = plan.activities.find(a => a.id === activitySchedule.activityId);
                    if (!activity) return null;
                    
                    return (
                      <div key={index} className="flex items-start hover:bg-gray-50 transition-colors">
                        {/* 時間表示 */}
                        <div className="w-14 flex-shrink-0 py-3 px-2 text-right">
                          <div className="text-xs text-gray-500 font-medium">
                            {activitySchedule.startTime}
                          </div>
                        </div>
                        
                        {/* タイムライン点 */}
                        <div className="flex-shrink-0 w-4 flex justify-center py-3">
                          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        </div>
                        
                        {/* アクティビティ内容 */}
                        <div className="flex-1 py-2 pr-4">
                          <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-lg">{getCategoryIcon(activity.category)}</span>
                              <span className="font-medium text-gray-900">{activity.name}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                                {activity.category}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 mb-2">{activity.description}</div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center space-x-3">
                                <span>{activitySchedule.startTime} - {activitySchedule.endTime}</span>
                                {activity.location && (
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{activity.location}</span>
                                  </div>
                                )}
                              </div>
                              {activity.cost && (
                                <div className="flex items-center space-x-1 text-pink-600 font-medium">
                                  <DollarSign className="w-3 h-3" />
                                  <span>¥{activity.cost.toLocaleString()}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* アクティビティ一覧 */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">🎯</span>
          アクティビティ詳細
        </h4>
        
        <div className="space-y-3">
          {plan.activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default TravelPlanDisplay;
export { TravelPlanDisplay };