import React from 'react';
import MetaTags from 'react-helmet';
import logo from 'src/assets/logo.svg';

import './Home.scss';

function Home() {
  return (
    <main className="container home">
      <MetaTags title="divar-starter-kit 🚀" />
      <img
        className="home__logo"
        src={logo}
        alt="divar-stater-kit"
      />
      <p className="title">Running divar-starter-kit successfully.</p>
    </main>
  );
}

export default Home;
