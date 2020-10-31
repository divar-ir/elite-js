/* eslint-disable no-console */
import 'environments/setup-server-env';
import http from 'http';

let app = require('./server').default;

const server = http.createServer(app);

let currentApp = app;
const {PORT, npm_package_name: PACKAGE_NAME} = process.env;

server.listen(PORT || 3000, (): void => {
    console.log(`🚀  ${PACKAGE_NAME} started`);
});

if (module.hot) {
    console.log('✅  Server-side HMR Enabled!');

    module.hot.accept('./server', () => {
        console.log('🔁  HMR Reloading `./server`...');

        try {
            // eslint-disable-next-line global-require
            app = require('./server').default;
            server.removeListener('request', currentApp);
            server.on('request', app);
            currentApp = app;
        } catch (error) {
            console.error(error);
        }
    });
}
