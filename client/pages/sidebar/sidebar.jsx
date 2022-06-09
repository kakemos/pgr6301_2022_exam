import React, { useContext, useEffect, useState } from "react";
import { NewsApiContext } from "../../newsApiContext";
import { useLoading } from "../../lib/useLoading";
import { LiveNewsCard } from "./liveNewsCard";

export function Sidebar() {
  const { listFilteredArticles } = useContext(NewsApiContext);
  const [newsFeed, setNewsFeed] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(window.location.origin.replace(/^http/, "ws"));
    ws.onmessage = (message) => {
      const { title, intro } = JSON.parse(message.data);
      setNewsFeed((oldState) => [...oldState, { title, intro }]);
    };
  }, []);

  const { loading, error, data } = useLoading(
    async () => await listFilteredArticles({}),
    []
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div id="error-text">{error.toString()}</div>
      </div>
    );
  }

  return (
    <>
      <h1>Live newsfeed</h1>

      {[...newsFeed].reverse().map((news) => (
        <LiveNewsCard key={news.title} news={news} />
      ))}

      {data.map((oldNews) => (
        <LiveNewsCard key={oldNews.title} news={oldNews} />
      ))}
    </>
  );
}
