# divar-starter-kit

divar-starter-kit is a React.js SSR-ready boilerplate using Razzle by [divar.ir](https://divar.ir).

**divar-starter-kit comes with the "battery-pack included"**:

* [React](https://github.com/facebook/react) and [Razzle](https://razzlejs.org) features.
* [Next.js](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps) like SSR features.
* Redux ready (CSR and SSR).
* Using React-router-config.
* Recommended Directory Layout.
* HTTP service included (using [Axios](https://github.com/axios/axios)).

## Quick Start



```bash
git clone https://github.com/divar-ir/divar-starter-kit
cd divar-starter-kit
yarn
yarn start
```

Then open http://localhost:3000/ to see your app. Your console should look like this:

<img src="https://cloud.githubusercontent.com/assets/4060187/26324663/b31788c4-3f01-11e7-8e6f-ffa48533af54.png" width="500px" alt="Razzle Development Mode"/>


Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development mode.  
You can view your application at `http://localhost:3000`

The page will reload if you make edits.

### `npm run build` or `yarn build`

Builds the app for production to the build folder.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `npm run start:prod` or `yarn start:prod`

Runs the compiled app in production.

You can again view your application at `http://localhost:3000`

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.

### `npm lint` or `yarn lint`

Runs linter.


## Doing SSR
Only views can be SSR. Views are components that directly connected to a URL. To do SSR you need just 2 simple steps:


* Add `serverSideInitial` static method to your view to do side-effects, dispatch actions to store or return values and promises.

```
 static serverSideInitial({ dispatch, req }) {
   const isSomethingActive = req.query.something === 'active';
 
   if (isSomethingActive) {
     dispatch(
       setSomethingActiveAction(),
     );
   }
 
   return getPosts().then(posts => {
       return {
         posts,
       }
   });
 }

```

* Wrap the view with `withSSRData` HOC to get value returned by `serverSideInitial` as `props.initialSSRData`.

```
Component.propTypes = {
   initialSSRData: PropTypes.shape({
   posts: PropTypes.array(),
};
 
export default withSSRData(Component);
```

## Directory Layout

divar-starter-kit comes with a suggested project structure looks like:

```
.
├── /environments/              # Client, build and setup server enviroment values.
├── /build/                     # The folder for compiled output.
├── /public/                    # Static files which are copied into the  folder
|                                 /build/public and served by server, like sitemap or favicon.
├── /src/                       # The source code of the application.
    ├── /configs/               # Project wide configs like
    |                             router config, paths, constants, API endoints.
    ├── /services/              # Project wide services like HTTP or GTM.
    ├── /shared-components/     # Components that used in many components/views [*].
    ├── /store/                 # Stores will be here.
    |				  DUCKS structure suggested for stores.
    ├── /styles/                # Shared styles.
    ├── /utils/                 # Project wide helper functions.
    ├── /views/                 # Pages/Views/Screens [*].
    |                             Components that directly connected to a URL.
    ├── /client.js              # Client-side startup script.
```

[*]: Views/Shared-components can be a single JSX (like ComponentName.jsx)
	 or a folder containing: 

```
ComponentName
├── /index.jsx             # Component file.
├── /ComponentName.[scss,sass,css,module.*] 
|                          # Component style file.
├── /compponents/          # Component child components will be here.
├── /requests.js           # API call/transformer functions.
├── /configs/              # Component config file or folder for
|							 Constants, router config (for nested routing), etc.
├── /utils.js              # Component helper functions.
```

## Inspiration

* [zeit/next.js](https://github.com/zeit/next.js)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
