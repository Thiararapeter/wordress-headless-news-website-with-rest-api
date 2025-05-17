
import React from "react";

const leaders = [
  {
    name: "Sundar Pichai",
    title: "CEO, Google",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    bio: "Sundar led the growth of Google Search and now oversees Alphabet Inc."
  },
  {
    name: "Satya Nadella",
    title: "CEO, Microsoft",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    bio: "Transformed Microsoft into a cloud-first leader and AI innovator."
  },
  {
    name: "Reshma Saujani",
    title: "Founder, Girls Who Code",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    bio: "Champion for diversity in tech and the founder of Girls Who Code."
  },
];

const LeadersPage = () => (
  <div className="container mx-auto py-10 px-4">
    <h1 className="text-3xl font-bold mb-8 text-news-accent">Leaders</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {leaders.map((leader) => (
        <div
          className="bg-white/70 backdrop-blur-lg border border-gray-100 p-6 rounded-lg shadow group hover:shadow-xl transition"
          key={leader.name}
        >
          <img
            src={leader.image}
            alt={leader.name}
            className="w-24 h-24 rounded-full mx-auto shadow mb-4 group-hover:scale-105 transition"
          />
          <div className="text-center">
            <h2 className="font-semibold text-lg text-gray-900">{leader.name}</h2>
            <p className="text-sm text-news-accent mb-2">{leader.title}</p>
            <p className="text-gray-700 text-sm">{leader.bio}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default LeadersPage;
