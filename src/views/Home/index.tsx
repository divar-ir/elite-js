import React, {FunctionComponent} from 'react';
import MetaTags from 'react-helmet';
import logo from '../../assets/logo.svg';

import './Home.scss';

const Home: FunctionComponent = () => {
    return (
        <main className="container home">
            <MetaTags title="divar-starter-kit 🚀"/>
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
