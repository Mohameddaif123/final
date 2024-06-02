// AdSense.js

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const AdSense = ({ client, slot }) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <Helmet>
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
        crossOrigin="anonymous"
      ></script>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ca-pub-4481504048762478}
        data-ad-slot={3937695569}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </Helmet>
  );
};

AdSense.propTypes = {
  client: PropTypes.string.isRequired,
  slot: PropTypes.string.isRequired,
};

export default AdSense;
