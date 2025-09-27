import { CalendarEvent, ChatMessage, TravelPlan, Activity, TimelineItem, Couple, FixedResponse } from '../types';
import { addDays, format } from 'date-fns';

// カップル情報のダミーデータ
export const mockCouple: Couple = {
  person1: {
    id: 'user1',
    name: 'さくら',
    preferences: ['温泉', '美術館', 'カフェ', '写真撮影'],
    avatar: '🌸'
  },
  person2: {
    id: 'user2', 
    name: 'たけし',
    preferences: ['アウトドア', '歴史', 'グルメ', 'ドライブ'],
    avatar: '🎋'
  }
};

// カレンダーイベントのダミーデータ
const today = new Date();
export const mockCalendarEvents: CalendarEvent[] = [
  // Person1のイベント
  {
    id: 'cal1',
    title: '会議',
    date: format(today, 'yyyy-MM-dd'),
    startTime: '10:00',
    endTime: '12:00',
    type: 'work',
    person: 'person1',
    description: 'プロジェクト会議'
  },
  {
    id: 'cal2',
    title: 'ヨガクラス',
    date: format(addDays(today, 1), 'yyyy-MM-dd'),
    startTime: '19:00',
    endTime: '20:30',
    type: 'personal',
    person: 'person1'
  },
  {
    id: 'cal3',
    title: '空き時間',
    date: format(addDays(today, 2), 'yyyy-MM-dd'),
    type: 'free',
    person: 'person1'
  },
  // Person2のイベント
  {
    id: 'cal4',
    title: '出張',
    date: format(today, 'yyyy-MM-dd'),
    startTime: '09:00',
    endTime: '18:00',
    type: 'work',
    person: 'person2',
    description: '大阪出張'
  },
  {
    id: 'cal5',
    title: 'ジム',
    date: format(addDays(today, 1), 'yyyy-MM-dd'),
    startTime: '20:00',
    endTime: '21:30',
    type: 'personal',
    person: 'person2'
  },
  {
    id: 'cal6',
    title: '空き時間',
    date: format(addDays(today, 2), 'yyyy-MM-dd'),
    type: 'free',
    person: 'person2'
  },
  // 共通の空き時間
  {
    id: 'cal7',
    title: '二人とも空き',
    date: format(addDays(today, 3), 'yyyy-MM-dd'),
    type: 'free',
    person: 'both'
  },
  {
    id: 'cal8',
    title: '二人とも空き',
    date: format(addDays(today, 4), 'yyyy-MM-dd'),
    type: 'free',
    person: 'both'
  }
];

// アクティビティのダミーデータ
export const mockActivities: Activity[] = [
  {
    id: 'act1',
    name: '清水寺参拝',
    description: '京都の代表的な寺院で、美しい景色を楽しめます',
    duration: 120,
    category: 'sightseeing',
    cost: 400,
    location: '京都市東山区'
  },
  {
    id: 'act2',
    name: '嵐山竹林散策',
    description: '幻想的な竹林の小径を歩きます',
    duration: 90,
    category: 'sightseeing',
    location: '京都市右京区'
  },
  {
    id: 'act3',
    name: '湯豆腐ランチ',
    description: '京都名物の湯豆腐を味わいます',
    duration: 60,
    category: 'food',
    cost: 2500,
    location: '嵐山'
  },
  {
    id: 'act4',
    name: '金閣寺見学',
    description: '黄金に輝く美しい寺院',
    duration: 90,
    category: 'sightseeing',
    cost: 500,
    location: '京都市北区'
  }
];

// タイムラインのダミーデータ
const timelineItems: TimelineItem[] = [
  {
    id: 'timeline1',
    day: 1,
    date: format(addDays(today, 3), 'yyyy-MM-dd'),
    activities: [
      { activityId: 'act1', startTime: '09:00', endTime: '11:00' },
      { activityId: 'act3', startTime: '12:00', endTime: '13:00' },
      { activityId: 'act2', startTime: '14:30', endTime: '16:00' }
    ]
  },
  {
    id: 'timeline2',
    day: 2,
    date: format(addDays(today, 4), 'yyyy-MM-dd'),
    activities: [
      { activityId: 'act4', startTime: '10:00', endTime: '11:30' }
    ]
  }
];

// 旅行プランのダミーデータ
export const mockTravelPlan: TravelPlan = {
  id: 'plan1',
  title: '京都2日間カップル旅行',
  destination: '京都',
  startDate: format(addDays(today, 3), 'yyyy-MM-dd'),
  endDate: format(addDays(today, 4), 'yyyy-MM-dd'),
  budget: 50000,
  activities: mockActivities,
  timeline: timelineItems,
  createdAt: new Date(),
  updatedAt: new Date()
};

// チャットメッセージのダミーデータ
export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg1',
    content: 'こんにちは！カップル旅行の計画を立てたいです。',
    sender: 'user',
    timestamp: new Date(Date.now() - 300000), // 5分前
    type: 'text'
  },
  {
    id: 'msg2',
    content: 'こんにちは！素敵ですね✨ お二人の空いている日程を確認させていただきました。京都への2日間旅行はいかがでしょうか？',
    sender: 'ai',
    timestamp: new Date(Date.now() - 240000), // 4分前
    type: 'text'
  },
  {
    id: 'msg3',
    content: '京都いいですね！どんなプランがありますか？',
    sender: 'user',
    timestamp: new Date(Date.now() - 180000), // 3分前
    type: 'text'
  },
  {
    id: 'msg4',
    content: 'お二人の好みを考慮して、素敵な京都プランを作成しました！清水寺や嵐山など、ロマンチックなスポットを中心に組み立てています。',
    sender: 'ai',
    timestamp: new Date(Date.now() - 120000), // 2分前
    type: 'plan'
  }
];

// 固定AIレスポンスのダミーデータ
export const mockFixedResponses: FixedResponse[] = [
  {
    trigger: ['旅行', '計画', 'プラン'],
    response: 'お二人の空いている日程を確認して、素敵な旅行プランを提案させていただきますね！どちらか希望の場所はありますか？'
  },
  {
    trigger: ['京都', 'きょうと'],
    response: '京都は素晴らしい選択ですね！清水寺、金閣寺、嵐山など、カップルにおすすめのスポットがたくさんあります。2日間のプランを作成いたしました。',
    planId: 'plan1'
  },
  {
    trigger: ['温泉', 'おんせん'],
    response: '温泉旅行も素敵ですね！箱根や熱海など、カップルに人気の温泉地があります。ゆっくりとした時間を過ごせそうです。'
  },
  {
    trigger: ['予算', 'よさん', '費用'],
    response: 'ご予算に合わせてプランを調整いたします。交通費、宿泊費、食事代、観光費用を含めて計算しますね。'
  },
  {
    trigger: ['ありがとう', 'ありがとございます'],
    response: 'どういたしまして！お二人の素敵な旅行のお手伝いができて嬉しいです✨ 他にもご質問があればお気軽にどうぞ！'
  }
];