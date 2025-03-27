import React from 'react';

const ImpactVideo = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute h-full w-full object-cover"
      >
        <source
          src="https://player.vimeo.com/external/478260084.sd.mp4?s=f6d5c2c4c7c9f8c7f8c7f8c7f8c7f8c7f8c7f8c7&profile_id=165&oauth2_token_id=57447761"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
    </div>
  );
};

export default ImpactVideo;