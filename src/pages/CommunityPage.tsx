
import React from "react";

const members = [
  { name: "Alice", avatar: "https://randomuser.me/api/portraits/women/10.jpg" },
  { name: "Brian", avatar: "https://randomuser.me/api/portraits/men/10.jpg" },
  { name: "Cynthia", avatar: "https://randomuser.me/api/portraits/women/15.jpg" },
  { name: "Derek", avatar: "https://randomuser.me/api/portraits/men/12.jpg" }
];

const discussions = [
  {
    title: "Has AI gone too far?",
    author: "Alice",
    replies: 42,
    lastReply: "1h ago",
  },
  {
    title: "Best resources to learn blockchain?",
    author: "Brian",
    replies: 27,
    lastReply: "2h ago",
  },
];

const CommunityPage = () => (
  <div className="container mx-auto py-10 px-4">
    <h1 className="text-3xl font-bold mb-8 text-news-accent">Community</h1>
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Featured Discussions</h2>
      <div className="space-y-4">
        {discussions.map((d, i) => (
          <div key={i} className="rounded-lg bg-white/70 border border-gray-100 p-4 shadow flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">{d.title}</div>
              <div className="text-xs text-gray-500">Started by {d.author}</div>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0 items-center text-xs">
              <span className="bg-news-accent/10 text-news-accent px-2 py-1 rounded">{d.replies} replies</span>
              <span className="text-gray-400">{d.lastReply}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Active Members</h2>
      <div className="flex -space-x-4">
        {members.map((m) => (
          <img key={m.name} className="w-12 h-12 rounded-full border-2 border-white ring-2 ring-news-accent" src={m.avatar} alt={m.name} title={m.name}/>
        ))}
      </div>
    </div>
  </div>
);

export default CommunityPage;
