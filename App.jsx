import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Coffee, 
  Camera, 
  Utensils, 
  Battery, 
  Moon, 
  Sun, 
  ShoppingBag, 
  Plane, 
  Info,
  Sparkles,
  Train,
  Ship,
  Anchor
} from 'lucide-react';

// --- Data: 根據圖片更新的詳細行程資料 ---
const tripData = [
  {
    day: 1,
    date: "1/1 (四)",
    title: "出發！抵達釜山",
    location: "桃園 ➝ 金海機場 ➝ 廣安里",
    tags: ["#新春出發", "#廣安里住宿", "#83烤腸"],
    energy: 3, 
    events: [
      { time: "13:30", icon: <Plane size={18} />, title: "桃園機場集合", desc: "第一航廈櫃台報到" },
      { time: "15:40", icon: <Plane size={18} />, title: "飛機起飛", desc: "前往釜山 (預計 18:50 抵達)" },
      { time: "20:30", icon: <Train size={18} />, title: "前往廣安里", desc: "入境手續完成後，前往住宿地點" },
      { time: "22:00", icon: <Utensils size={18} />, title: "晚餐：83烤腸", desc: "第一餐就是道地韓式烤腸！" }
    ]
  },
  {
    day: 2,
    date: "1/2 (五)",
    title: "海雲台與遊艇體驗",
    location: "海雲台 ➝ 斜坡滑車 ➝ Spa Land",
    tags: ["#膠囊列車", "#斜坡滑車", "#遊艇夕陽", "#SpaLand"],
    energy: 5, // 行程很滿
    events: [
      { time: "09:30", icon: <Utensils size={18} />, title: "早餐：大海鮑魚粥", desc: "海雲台著名的暖胃早餐" },
      { time: "10:30", icon: <Train size={18} />, title: "膠囊列車 & 天空步道", desc: "尾浦 ➝ 青沙浦，接著走青沙浦天空步道" },
      { time: "11:30", icon: <Utensils size={18} />, title: "午餐：烤貝一條街", desc: "在青沙浦享受新鮮烤貝" },
      { time: "14:00", icon: <Camera size={18} />, title: "樂天 Outlet / 斜坡滑車", desc: "Skyline Luge 玩斜坡滑車！(搭海岸列車前往松亭)" },
      { time: "17:30", icon: <Anchor size={18} />, title: "Yacht Holic 遊艇體驗", desc: "搭遊艇看海景夕陽/夜景" },
      { time: "18:30", icon: <Utensils size={18} />, title: "晚餐：海雲台市場", desc: "海雲台市場小吃 / 味贊王鹽烤肉 / 伍班長烤肉 (三選一)" },
      { time: "20:00", icon: <Battery size={18} />, title: "Spa Land 汗蒸幕", desc: "新世界百貨內的五星級汗蒸幕，消除一整天疲勞" }
    ]
  },
  {
    day: 3,
    date: "1/3 (六)",
    title: "松島纜車與甘川洞",
    location: "松島 ➝ 甘川洞 ➝ 影島 ➝ 南浦",
    tags: ["#海上纜車", "#小王子", "#絕美海景咖", "#無人機秀"],
    energy: 4,
    events: [
      { time: "10:30", icon: <Camera size={18} />, title: "松島纜車 & 天空步道", desc: "搭纜車看海，走龍宮雲橋 (去程20分鐘)" },
      { time: "12:30", icon: <Utensils size={18} />, title: "午餐：札嘎其市場", desc: "釜山最大魚市場吃海鮮" },
      { time: "14:30", icon: <Camera size={18} />, title: "甘川洞文化村", desc: "尋找小王子，漫步童話村" },
      { time: "16:00", icon: <Coffee size={18} />, title: "Thrill on the mug", desc: "影島超人氣海景咖啡廳休息" },
      { time: "18:30", icon: <Utensils size={18} />, title: "晚餐：南浦洞", desc: "百花烤腸或南浦洞商圈美食" },
      { time: "21:00", icon: <Sparkles size={18} />, title: "廣安里無人機秀", desc: "週六限定！廣安里海灘欣賞無人機表演" }
    ]
  },
  {
    day: 4,
    date: "1/4 (日)",
    title: "購物與美食巡禮",
    location: "Centum City ➝ 西面 ➝ Millac",
    tags: ["#水邊最高豬肉湯飯", "#新世界百貨", "#西面逛街"],
    energy: 3,
    events: [
      { time: "09:30", icon: <Utensils size={18} />, title: "早餐：水邊最高豬肉湯飯", desc: "釜山必吃！24小時營業名店" },
      { time: "11:00", icon: <ShoppingBag size={18} />, title: "新世界百貨", desc: "Centum City 逛街購物" },
      { time: "13:30", icon: <Utensils size={18} />, title: "午餐：Shake Shack", desc: "享受人氣漢堡" },
      { time: "15:00", icon: <ShoppingBag size={18} />, title: "西面商圈", desc: "釜山最熱鬧的逛街聖地" },
      { time: "18:00", icon: <Camera size={18} />, title: "Millac the Market", desc: "廣安里複合文化空間，看夜景逛市集" },
      { time: "20:00", icon: <Utensils size={18} />, title: "晚餐：廣安里", desc: "廣安里周邊烤貝或美食" }
    ]
  },
  {
    day: 5,
    date: "1/5 (一)",
    title: "最後採買與返程",
    location: "西面 ➝ 田浦 ➝ 機場",
    tags: ["#松亭3代豬肉湯飯", "#田浦咖啡街", "#樂天百貨"],
    energy: 2,
    events: [
      { time: "10:30", icon: <ShoppingBag size={18} />, title: "前往西面站", desc: "退房後，前往西面站寄放行李" },
      { time: "11:00", icon: <Utensils size={18} />, title: "午餐：松亭3代豬肉湯飯", desc: "西面湯飯一條街的老字號美味" },
      { time: "12:30", icon: <ShoppingBag size={18} />, title: "樂天百貨 & 西面最後衝刺", desc: "補齊伴手禮" },
      { time: "15:00", icon: <Coffee size={18} />, title: "田浦咖啡街", desc: "找間漂亮的咖啡廳享受最後時光" },
      { time: "17:30", icon: <Plane size={18} />, title: "前往金海機場", desc: "19:50 飛機起飛，預計 21:30 抵達桃園" }
    ]
  }
];

const tipsData = [
  { title: "天氣 ❄️", content: "1月釜山很冷 (0°C - 8°C)，尤其海邊風大。請務必準備帽子、圍巾和好穿脫的保暖大衣。" },
  { title: "交通 🚇", content: "行程中有多次計程車移動 (如松島、影島)，建議準備好韓文地址或 Naver Map 給司機看。" },
  { title: "訂位 📝", content: "部分熱門餐廳 (如味贊王、伍班長) 可能無法預訂，建議避開尖峰時間或現場候位。" },
  { title: "電源 🔌", content: "韓國電壓220V (兩孔圓形)。Spa Land 內有充電孔，但建議隨身攜帶行動電源。" },
];

// --- Components ---

const EnergyMeter = ({ level }) => {
  const getColor = () => {
    if (level >= 5) return "text-red-600";
    if (level === 4) return "text-orange-500";
    if (level === 3) return "text-yellow-500";
    return "text-green-500";
  };

  const getText = () => {
    if (level >= 5) return "充實 (行程滿滿)";
    if (level === 4) return "消耗體力 (多走路)";
    if (level === 3) return "普通 (適中)";
    return "輕鬆 (最後採買)";
  };

  return (
    <div className="flex items-center gap-2 text-sm bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
      <span className="text-gray-500 font-medium">體力需求:</span>
      <div className={`flex items-center gap-1 ${getColor()}`}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`w-2 h-4 rounded-sm ${i < level ? "bg-current" : "bg-gray-200"}`}></div>
        ))}
      </div>
      <span className="text-xs text-gray-400 ml-1">({getText()})</span>
    </div>
  );
};

const DayCard = ({ data }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-20 animate-fade-in">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{data.title}</h2>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <MapPin size={14} className="mr-1" />
          {data.location}
        </div>
      </div>
      <div className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
        Day {data.day}
      </div>
    </div>

    {/* Tags */}
    <div className="flex flex-wrap gap-2 mb-4">
      {data.tags.map((tag, idx) => (
        <span key={idx} className="bg-indigo-50 text-indigo-600 text-xs px-2.5 py-1 rounded-md font-medium">
          {tag}
        </span>
      ))}
    </div>

    {/* Energy */}
    <div className="mb-6">
      <EnergyMeter level={data.energy} />
    </div>

    {/* Timeline */}
    <div className="space-y-6 relative pl-2">
      <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100"></div>
      {data.events.map((event, idx) => (
        <div key={idx} className="relative flex items-start gap-4">
          <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white shadow-md shrink-0">
            {event.icon}
          </div>
          <div className="flex-1 bg-gray-50 rounded-xl p-3 hover:bg-blue-50 transition-colors duration-200">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-bold text-gray-800">{event.title}</h4>
              <span className="text-xs font-mono text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-100">{event.time}</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{event.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const InfoCard = () => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-24 animate-fade-in">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
      <Sparkles size={24} className="text-blue-600" />
      貼心小提醒
    </h2>
    <div className="space-y-4">
      {tipsData.map((tip, idx) => (
        <div key={idx} className="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-400">
          <h3 className="font-bold text-gray-800 mb-1">{tip.title}</h3>
          <p className="text-sm text-gray-600">{tip.content}</p>
        </div>
      ))}
    </div>
    
    <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-center">
      <p className="text-sm text-yellow-800 font-medium">
        💡 保持輕鬆愉快的心情最重要，行程隨時可以根據大家的體力調整喔！
      </p>
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [view, setView] = useState('itinerary'); // 'itinerary' or 'info'

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, view]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20 selection:bg-blue-200">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4 shadow-sm">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <div>
            <h1 className="text-xl font-black tracking-tight text-blue-900">
              Busan <span className="text-blue-500">2026</span>
            </h1>
            <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">家族旅行 • 釜山走春</p>
          </div>
          <div className="text-right">
            <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
              1/1 - 1/5
            </div>
          </div>
        </div>
      </header>

      {/* Date Tabs (Horizontal Scroll) */}
      {view === 'itinerary' && (
        <div className="sticky top-[73px] z-40 bg-gray-50/95 backdrop-blur border-b border-gray-200">
          <div className="flex overflow-x-auto px-4 py-3 gap-3 no-scrollbar max-w-md mx-auto snap-x">
            {tripData.map((day) => (
              <button
                key={day.day}
                onClick={() => setActiveTab(day.day)}
                className={`snap-center shrink-0 flex flex-col items-center justify-center min-w-[70px] py-2 rounded-xl transition-all duration-200 border ${
                  activeTab === day.day
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 scale-105"
                    : "bg-white text-gray-400 border-gray-200 hover:border-blue-300 hover:text-blue-500"
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider">Day {day.day}</span>
                <span className="text-[10px] opacity-80 mt-0.5">{day.date.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="px-4 py-6 max-w-md mx-auto min-h-[80vh]">
        {view === 'itinerary' ? (
          <DayCard data={tripData.find(d => d.day === activeTab)} />
        ) : (
          <InfoCard />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
        <div className="flex justify-around items-center max-w-md mx-auto h-16 px-2">
          <button 
            onClick={() => setView('itinerary')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${view === 'itinerary' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <Calendar size={22} strokeWidth={view === 'itinerary' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">每日行程</span>
          </button>
          
          <div className="w-px h-8 bg-gray-100"></div>
          
          <button 
            onClick={() => setView('info')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${view === 'info' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <Info size={22} strokeWidth={view === 'info' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">注意事項</span>
          </button>
        </div>
      </nav>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 20px);
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
