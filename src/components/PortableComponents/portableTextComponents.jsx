import React from "react";

const portableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="mt-4 text-lg leading-relaxed">{children}</p>
      ),
      h1: ({ children }) => (
        <h1 className="text-2xl font-bold mt-6">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-xl font-semibold mt-6">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-lg font-medium mt-4">{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-3xl font-medium mt-3">{children}</h4>
      ),
      h5: ({ children }) => (
        <h5 className="text-2xl font-semibold mt-2">{children}</h5>
      ),
      h6: ({ children }) => (
        <h6 className="text-2xl font-medium mt-2">{children}</h6>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc list-inside mt-4 space-y-2">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal list-inside mt-4 space-y-2">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="ml-6">{children}</li>,
      number: ({ children }) => <li className="ml-6">{children}</li>,
    },
    marks: {
      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ value, children }) => (
        <a
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {children}
        </a>
      ),
    },
  };