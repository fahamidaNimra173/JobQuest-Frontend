import React from 'react';

export default function ResumeViewer({ url }: { url: string }) {
  // Simple embed — for PDF docs; for other types the link will open in new tab
  const isPdf = url.toLowerCase().endsWith('.pdf');
  return (
    <div className="border border-primary-light rounded-md overflow-hidden">
      {isPdf ? (
        <iframe src={url} className="w-full h-60" title="Resume PDF" />
      ) : (
        <div className="p-3">
          <a href={url} target="_blank" rel="noreferrer" className="text-primary-medium underline">Open resume</a>
        </div>
      )}
    </div>
  );
}