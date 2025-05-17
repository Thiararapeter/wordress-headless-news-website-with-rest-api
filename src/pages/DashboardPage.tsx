
import React from "react";
import { Star, Bookmark, Users, Bell } from "lucide-react";

const stats = [
  { icon: <Star className="text-yellow-400" />, label: "Articles Read", value: 120 },
  { icon: <Bookmark className="text-news-accent" />, label: "Bookmarks", value: 15 },
  { icon: <Users className="text-indigo-500" />, label: "Community Posts", value: 7 },
  { icon: <Bell className="text-red-400" />, label: "Notifications", value: 3 },
];

const DashboardPage = () => (
  <div className="container mx-auto py-10 px-4">
    <h1 className="text-3xl font-bold mb-8 text-news-accent">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat) => (
        <div key={stat.label}
          className="flex flex-col items-center bg-white/75 rounded-xl border border-gray-100 shadow p-6 hover:shadow-lg transition"
        >
          <div className="mb-2">{stat.icon}</div>
          <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
          <div className="text-xs text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
    <div className="rounded-xl bg-gradient-to-r from-blue-50 via-violet-50 to-pink-50 border border-gray-100 p-8 text-center shadow">
      <h2 className="text-xl font-bold text-news-primary mb-2">Welcome back!</h2>
      <p className="text-gray-700">Check out what’s new in your favorite topics, or continue learning!</p>
    </div>
  </div>
);

export default DashboardPage;
