// File: src/components/blog/HelmetMeta.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

const HelmetMeta = ({ title, description, imageUrl }) => (
  <Helmet>
    <title>{title} | Doctor Kays</title>
    <meta property="og:type" content="article" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={imageUrl} />
    <meta name="twitter:image:alt" content={title} />
  </Helmet>
);

export default HelmetMeta;