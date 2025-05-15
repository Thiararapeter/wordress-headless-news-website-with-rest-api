
import React from "react";

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "");
}

interface ReadingTimeProps {
  html: string;
  className?: string;
}

const WORDS_PER_MINUTE = 200;

const ReadingTime: React.FC<ReadingTimeProps> = ({ html, className }) => {
  const text = stripHtml(html);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const mins = Math.ceil(wordCount / WORDS_PER_MINUTE);

  return (
    <span className={className}>
      {mins} min read
    </span>
  );
};

export default ReadingTime;
