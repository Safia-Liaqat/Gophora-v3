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
  // Chart data for earnings progression
  const earningsData = {
    labels: missions.map((m) => m.date),
    datasets: [
      {
        label: "Earnings ($)",
        data: missions.map((m) => m.earnings),
        borderColor: "#FF4F00",
        backgroundColor: "rgba(255, 79, 0, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#FF4F00",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#6b7280",
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#111827",
        bodyColor: "#4b5563",
        borderColor: "#d1d5db",
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        }
      },
      y: {
        ticks: {
          color: "#6b7280",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        }
      }
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 bg-white">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#FF4F00]">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black">Mission History</h1>
            <p className="text-sm text-gray-600">
              Track your missions, skills, badges, and earnings over time
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border bg-white border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Missions</p>
              <p className="text-2xl font-bold mt-1 text-black">{missions.length}</p>
            </div>
            <Target className="h-8 w-8 text-[#FF4F00]" />
          </div>
        </div>
        
        <div className="p-4 rounded-lg border bg-white border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold mt-1 text-black">
                ${missions.reduce((sum, mission) => sum + mission.earnings, 0)}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-[#FF4F00]" />
          </div>
        </div>
        
        <div className="p-4 rounded-lg border bg-white border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Skills Verified</p>
              <p className="text-2xl font-bold mt-1 text-black">
                {new Set(missions.flatMap(m => m.skillVerified)).size}
              </p>
            </div>
            <UserCheck className="h-8 w-8 text-[#FF4F00]" />
          </div>
        </div>
        
        <div className="p-4 rounded-lg border bg-white border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Badges Earned</p>
              <p className="text-2xl font-bold mt-1 text-black">
                {new Set(missions.flatMap(m => m.badges)).size}
              </p>
            </div>
            <Award className="h-8 w-8 text-[#FF4F00]" />
          </div>
        </div>
      </div>

      {/* Missions Timeline */}
      <div className="rounded-lg p-4 border bg-white border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="h-5 w-5 text-[#FF4F00]" />
          <h2 className="text-lg font-semibold text-black">Completed Missions Timeline</h2>
        </div>
        
        <div className="relative border-l border-gray-300 pl-6 space-y-6">
          {missions.map((mission) => (
            <div key={mission.id} className="relative">
              <div className="absolute -left-3 top-1 w-6 h-6 rounded-full border-2 bg-[#FF4F00] border-white flex items-center justify-center">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
              <div className="p-4 rounded-lg border bg-white border-gray-200 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div>
                    <h3 className="font-medium text-black">{mission.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3 text-gray-600" />
                      <span className="text-sm text-gray-600">{mission.date}</span>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-lg text-sm bg-green-100 border-green-200 text-green-700">
                    +${mission.earnings}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <div className="px-2 py-1 rounded text-xs bg-gray-100 border-gray-200 text-gray-700">
                    <span className="flex items-center gap-1">
                      <UserCheck className="h-3 w-3" />
                      {mission.skillVerified.join(", ")}
                    </span>
                  </div>
                  <div className="px-2 py-1 rounded text-xs bg-[#FF4F00]/10 border-[#FF4F00]/20 text-[#FF4F00]">
                    <span className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {mission.badges.join(", ")}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 text-sm text-gray-600">
                  {mission.achievement}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earnings Progression Chart */}
      <div className="rounded-lg p-4 border bg-white border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-[#FF4F00]" />
          <h2 className="text-lg font-semibold text-black">Earnings Progression</h2>
        </div>
        <div className="h-64">
          <Line data={earningsData} options={chartOptions} />
        </div>
      </div>

      {/* Personal Achievements */}
      <div className="rounded-lg p-4 border bg-white border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-5 w-5 text-[#FF4F00]" />
          <h2 className="text-lg font-semibold text-black">Personal Achievements</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {missions.map((mission) => (
            <div 
              key={mission.id} 
              className="p-4 rounded-lg border bg-white border-gray-200 shadow-sm hover:border-[#FF4F00]/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#FF4F00]/10 border-[#FF4F00]/20 text-[#FF4F00]">
                  <Award className="h-4 w-4 text-[#FF4F00]" />
                </div>
                <div>
                  <h3 className="font-medium text-black">{mission.title}</h3>
                  <p className="text-sm mt-1 text-gray-600">{mission.achievement}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <DollarSign className="h-3 w-3 text-gray-600" />
                    <span className="text-sm font-medium text-[#FF4F00]">
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
      <div className="rounded-lg p-4 border bg-white border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-[#FF4F00]" />
          <h2 className="text-lg font-semibold text-black">Mission Insights</h2>
        </div>
        <div className="space-y-3">
          <div className="p-3 rounded-lg border bg-gray-50 border-gray-200">
            <p className="text-sm text-black">
              <span className="font-medium">Productivity Trend: </span>
              Your mission completion rate increased by 15% this week.
            </p>
          </div>
          <div className="p-3 rounded-lg border bg-gray-50 border-gray-200">
            <p className="text-sm text-black">
              <span className="font-medium">Skill Focus: </span>
              Top verified skill is <span className="font-medium">Delivery</span>. Consider advanced missions in this category.
            </p>
          </div>
          <div className="p-3 rounded-lg border bg-gray-50 border-gray-200">
            <p className="text-sm text-black">
              <span className="font-medium">Achievement Milestone: </span>
              You earned 3 new badges this month. Keep exploring!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}