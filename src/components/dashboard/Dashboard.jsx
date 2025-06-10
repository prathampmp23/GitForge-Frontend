import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

export default function Dashboard() {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/repo/user/${userId}`
        );
        const data = await response.json();
        // console.log(data)
        setRepositories(data.repositories);
      } catch (err) {
        console.error("Error while fecthing repositories: ", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3002/repo/all`);
        const data = await response.json();
        setSuggestedRepositories(data);
        // console.log(suggestedRepositories);
      } catch (err) {
        console.error("Error while fecthing repositories: ", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery == "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      <section
        id="dashboard"
        className="p-2 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6"
      >
        {/* Left Sidebar - Suggested Repositories */}
        <aside className="w-full lg:w-1/4 space-y-4">
          <h3 className="text-xl font-semibold">Suggested Repositories</h3>
          {suggestedRepositories.map((repo) => (
            <div
              key={repo._id}
              className="bg-gray-100 p-2 rounded-lg shadow-sm"
            >
              <h4 className="text-lg font-medium">{repo.name}</h4>
              <p className="text-sm text-gray-600">{repo.description}</p>
            </div>
          ))}
        </aside>

        {/* Main Content - Your Repositories */}
        <main className="w-full lg:w-2/4 space-y-4">
          <h2 className="text-2xl font-bold">Your Repositories</h2>
          <div id="search" className="mb-4">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {searchResults.map((repo) => (
            <div
              key={repo._id}
              className="bg-gray-100 p-2 rounded-lg shadow-sm"
            >
              <h4 className="text-lg font-medium">{repo.name}</h4>
              <p className="text-sm text-gray-600">{repo.description}</p>
            </div>
          ))}
        </main>

        {/* Right Sidebar - Events */}
        <aside className="w-full lg:w-1/4 space-y-4">
          <h3 className="text-xl font-semibold">Upcoming Events</h3>
          <ul className="space-y-2">
            <li>
              <p className="bg-blue-50 p-3 rounded-md text-blue-800">
                Tech Conference - Dec 15
              </p>
            </li>
            <li>
              <p className="bg-green-50 p-3 rounded-md text-green-800">
                Developer Meetup - Dec 25
              </p>
            </li>
            <li>
              <p className="bg-purple-50 p-3 rounded-md text-purple-800">
                React Summit - Jan 5
              </p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
}
