import React from "react";
import { CheckCircle, Star, Award, TrendingUp, UserCheck, Calendar, DollarSign, Target, Zap } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Mock data
const missions = [
  {
    id: 1,
    title: "Survey - Tech Feedback",
    date: "2025-11-20",
    earnings: 5,
    skillVerified: ["Surveying"],
    badges: ["Novice Explorer"],
    achievement: "Completed first survey"
  },
  {
    id: 2,
    title: "App Review Task",
    date: "2025-11-21",
    earnings: 12,
    skillVerified: ["App Review"],
    badges: ["Task Master"],
    achievement: "Reviewed 5 apps"
  },
  {
    id: 3,
    title: "Delivery Task",
    date: "2025-11-22",
    earnings: 15,
    skillVerified: ["Delivery"],
    badges: ["Quick Mover"],
    achievement: "First on-time delivery"
  }
];

export default function BookHistory() {
  const [isDarkMode, setIsDarkMode] = React.useState(document.documentElement.classList.contains('dark'));

  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Theme variables
  const theme = {
    bg: isDarkMode ? "bg-[#0a0514]" : "bg-slate-50",
    card: isDarkMode ? "bg-[#0f0a1c] border border-white/10" : "bg-white border border-gray-200 shadow-sm",
    textColor: isDarkMode ? "text-white" : "text-gray-900",
    textMuted: isDarkMode ? "text-gray-400" : "text-gray-600",
    textLight: isDarkMode ? "text-gray-500" : "text-gray-500",
    badgePrimary: isDarkMode ? "bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400" : "bg-fuchsia-100 border-fuchsia-200 text-fuchsia-700",
    badgeSecondary: isDarkMode ? "bg-white/5 border-white/10 text-gray-300" : "bg-gray-100 border-gray-200 text-gray-700",
    badgeSuccess: isDarkMode ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-green-100 border-green-200 text-green-700",
  };

  // Chart data for earnings progression
  const earningsData = {
    labels: missions.map((m) => m.date),
    datasets: [
      {
        label: "Earnings ($)",
        data: missions.map((m) => m.earnings),
        borderColor: isDarkMode ? "#d946ef" : "#a855f7",
        backgroundColor: isDarkMode ? "rgba(216, 70, 239, 0.2)" : "rgba(168, 85, 247, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: isDarkMode ? "#d946ef" : "#a855f7",
        pointBorderColor: isDarkMode ? "#ffffff" : "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? "#9ca3af" : "#6b7280",
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
        titleColor: isDarkMode ? "#ffffff" : "#111827",
        bodyColor: isDarkMode ? "#d1d5db" : "#4b5563",
        borderColor: isDarkMode ? "#374151" : "#d1d5db",
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? "#9ca3af" : "#6b7280",
        },
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
        }
      },
      y: {
        ticks: {
          color: isDarkMode ? "#9ca3af" : "#6b7280",
        },
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
        }
      }
    }
  };

  return (
    <div className={`p-4 md:p-6 space-y-6 transition-colors duration-700 ${theme.bg}`}>
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isDarkMode 
              ? "bg-fuchsia-500/10 border border-fuchsia-500/20" 
              : "bg-fuchsia-50 border border-fuchsia-200"
          }`}>
            <Calendar className={`h-5 w-5 ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`} />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${theme.textColor}`}>Mission History</h1>
            <p className={`text-sm ${theme.textMuted}`}>
              Track your missions, skills, badges, and earnings over time
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-xl border ${theme.card}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme.textMuted}`}>Total Missions</p>
              <p className={`text-2xl font-bold mt-1 ${theme.textColor}`}>{missions.length}</p>
            </div>
            <Target className={`h-8 w-8 ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`} />
          </div>
        </div>
        
        <div className={`p-4 rounded-xl border ${theme.card}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme.textMuted}`}>Total Earnings</p>
              <p className={`text-2xl font-bold mt-1 ${theme.textColor}`}>
                ${missions.reduce((sum, mission) => sum + mission.earnings, 0)}
              </p>
            </div>
            <DollarSign className={`h-8 w-8 ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`} />
          </div>
        </div>
        
        <div className={`p-4 rounded-xl border ${theme.card}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme.textMuted}`}>Skills Verified</p>
              <p className={`text-2xl font-bold mt-1 ${theme.textColor}`}>
                {new Set(missions.flatMap(m => m.skillVerified)).size}
              </p>
            </div>
            <UserCheck className={`h-8 w-8 ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`} />
          </div>
        </div>
        
        <div className={`p-4 rounded-xl border ${theme.card}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme.textMuted}`}>Badges Earned</p>
              <p className={`text-2xl font-bold mt-1 ${theme.textColor}`}>
                {new Set(missions.flatMap(m => m.badges)).size}
              </p>
            </div>
            <Award className={`h-8 w-8 ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`} />
          </div>
        </div>
      </div>

      {/* Missions Timeline */}
      <div className={`rounded-xl p-4 border ${theme.card}`}>
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className={`h-5 w-5 ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`} />
          <h2 className={`text-lg font-semibold ${theme.textColor}`}>Completed Missions Timeline</h2>
        </div>
        
        <div className="relative border-l border-gray-300 dark:border-white/10 pl-6 space-y-6">
          {missions.map((mission) => (
            <div key={mission.id} className="relative">
              <div className={`absolute -left-3 top-1 w-6 h-6 rounded-full border-2 ${
                isDarkMode 
                  ? "bg-fuchsia-500 border-white/20" 
                  : "bg-fuchsia-500 border-white"
              } flex items-center justify-center`}>
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
              <div className={`p-4 rounded-lg border ${theme.card}`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div>
                    <h3 className={`font-medium ${theme.textColor}`}>{mission.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className={`h-3 w-3 ${theme.textMuted}`} />
                      <span className={`text-sm ${theme.textMuted}`}>{mission.date}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-sm ${theme.badgeSuccess}`}>
                    +${mission.earnings}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <div className={`px-2 py-1 rounded text-xs ${theme.badgeSecondary}`}>
                    <span className="flex items-center gap-1">
                      <UserCheck className="h-3 w-3" />
                      {mission.skillVerified.join(", ")}
                    </span>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${theme.badgePrimary}`}>
                    <span className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {mission.badges.join(", ")}
                    </span>
                  </div>
                </div>
                
                <div className={`mt-3 text-sm ${theme.textMuted}`}>
                  {mission.achievement}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earnings Progression Chart */}
      <div className={`rounded-xl p-4 border ${theme.card}`}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className={`h-5 w-5 ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`} />
          <h2 className={`text-lg font-semibold ${theme.textColor}`}>Earnings Progression</h2>
        </div>
        <div className="h-64">
          <Line data={earningsData} options={chartOptions} />
        </div>
      </div>

      {/* Personal Achievements */}
      <div className={`rounded-xl p-4 border ${theme.card}`}>
        <div className="flex items-center gap-2 mb-4">
          <Star className={`h-5 w-5 ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`} />
          <h2 className={`text-lg font-semibold ${theme.textColor}`}>Personal Achievements</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {missions.map((mission) => (
            <div 
              key={mission.id} 
              className={`p-4 rounded-lg border hover:border-fuchsia-500/30 transition-colors ${theme.card}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${theme.badgePrimary}`}>
                  <Award className={`h-4 w-4 ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`} />
                </div>
                <div>
                  <h3 className={`font-medium ${theme.textColor}`}>{mission.title}</h3>
                  <p className={`text-sm mt-1 ${theme.textMuted}`}>{mission.achievement}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <DollarSign className={`h-3 w-3 ${theme.textMuted}`} />
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`}>
                      ${mission.earnings} earned
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className={`rounded-xl p-4 border ${theme.card}`}>
        <div className="flex items-center gap-2 mb-4">
          <Zap className={`h-5 w-5 ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`} />
          <h2 className={`text-lg font-semibold ${theme.textColor}`}>Mission Insights</h2>
        </div>
        <div className="space-y-3">
          <div className={`p-3 rounded-lg border ${theme.card}`}>
            <p className={`text-sm ${theme.textColor}`}>
              <span className="font-medium">Productivity Trend: </span>
              Your mission completion rate increased by 15% this week.
            </p>
          </div>
          <div className={`p-3 rounded-lg border ${theme.card}`}>
            <p className={`text-sm ${theme.textColor}`}>
              <span className="font-medium">Skill Focus: </span>
              Top verified skill is <span className="font-medium">Delivery</span>. Consider advanced missions in this category.
            </p>
          </div>
          <div className={`p-3 rounded-lg border ${theme.card}`}>
            <p className={`text-sm ${theme.textColor}`}>
              <span className="font-medium">Achievement Milestone: </span>
              You earned 3 new badges this month. Keep exploring!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}