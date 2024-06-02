import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const AdSense = ({ client, slot, format = 'auto', responsive = 'true' }) => {
  useEffect(() => {
    if (window) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <div>
      <Helmet>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </Helmet>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      ></ins>
    </div>
  );
};

AdSense.propTypes = {
  client: PropTypes.string.isRequired,
  slot: PropTypes.string.isRequired,
  format: PropTypes.string,
  responsive: PropTypes.string,
};

export default AdSense;
