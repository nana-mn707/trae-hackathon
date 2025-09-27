// カレンダーイベントの型定義
export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  startTime?: string; // HH:MM format
  endTime?: string; // HH:MM format
  type: 'work' | 'personal' | 'free' | 'travel';
  person: 'person1' | 'person2' | 'both';
  description?: string;
}

// チャットメッセージの型定義
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'plan';
}

// 旅行アクティビティの型定義
export interface Activity {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  category: 'sightseeing' | 'food' | 'shopping' | 'entertainment' | 'relaxation' | 'transport';
  cost?: number;
  location?: string;
  imageUrl?: string;
}

// 旅行プランの型定義
export interface TravelPlan {
  id: string;
  title: string;
  destination: string;
  startDate: string; // YYYY-MM-DD format
  endDate: string; // YYYY-MM-DD format
  budget?: number;
  activities: Activity[];
  timeline: TimelineItem[];
  createdAt: Date;
  updatedAt: Date;
}

// タイムラインアイテムの型定義
export interface TimelineItem {
  id: string;
  day: number; // 1, 2, 3...
  date: string; // YYYY-MM-DD format
  activities: {
    activityId: string;
    startTime: string; // HH:MM format
    endTime: string; // HH:MM format
  }[];
}

// ユーザー情報の型定義
export interface User {
  id: string;
  name: string;
  preferences: string[];
  avatar?: string;
}

// カップル情報の型定義
export interface Couple {
  person1: User;
  person2: User;
  relationshipStart?: string; // YYYY-MM-DD format
}

// AIチャットの固定レスポンス型定義
export interface FixedResponse {
  trigger: string[];
  response: string;
  planId?: string; // 関連する旅行プランのID
}