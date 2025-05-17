
import React from "react";

const SettingsPage = () => (
  <div className="container mx-auto py-10 px-4 max-w-2xl">
    <h1 className="text-3xl font-bold mb-8 text-news-accent">Settings</h1>
    <form className="space-y-8 bg-white/75 border border-gray-100 p-8 rounded-xl shadow">
      <fieldset>
        <legend className="block font-semibold text-gray-800 mb-2">Profile</legend>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <div className="flex-1">
            <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="yourname"
              className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-news-accent focus:ring focus:ring-news-accent/30"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@email.com"
              className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-news-accent focus:ring focus:ring-news-accent/30"
            />
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend className="block font-semibold text-gray-800 mb-2">Notifications</legend>
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-3">
            <input type="checkbox" className="accent-news-accent" defaultChecked />
            <span>Email me new article updates</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="accent-news-accent" />
            <span>Send community weekly digest</span>
          </label>
        </div>
      </fieldset>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-news-accent text-white px-6 py-2 rounded-lg hover:bg-news-accent/90 transition font-semibold"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
);

export default SettingsPage;
