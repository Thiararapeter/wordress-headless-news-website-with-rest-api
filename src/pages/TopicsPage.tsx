
import React from "react";

const topics = [
  {
    name: "Artificial Intelligence",
    description: "Latest research, startups, and applications in AI.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=cover&w=400&q=80"
  },
  {
    name: "Blockchain",
    description: "Crypto news, projects, and distributed ledger tech.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=cover&w=400&q=80"
  },
  {
    name: "Cybersecurity",
    description: "Protecting data and privacy in the digital age.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=cover&w=400&q=80"
  },
  {
    name: "Cloud Computing",
    description: "Scalable cloud architectures and SaaS trends.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=cover&w=400&q=80"
  },
];

const TopicsPage = () => (
  <div className="container mx-auto py-10 px-4">
    <h1 className="text-3xl font-bold mb-8 text-news-accent">Topics</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
      {topics.map((topic) => (
        <div 
          key={topic.name} 
          className="bg-white/70 backdrop-blur-lg border border-gray-100 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-200 flex flex-col items-center"
        >
          <img
            src={topic.image}
            alt={topic.name}
            className="w-28 h-28 object-cover rounded-full mb-4 shadow"
          />
          <h2 className="font-semibold text-lg text-gray-800 mb-2">{topic.name}</h2>
          <p className="text-gray-600 text-sm text-center">{topic.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default TopicsPage;
