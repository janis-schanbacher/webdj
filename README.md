# WebDj

WebDj is a DJ web application.

## Getting started

### Prerequisites
- [yarn](https://yarnpkg.com/) - dependency manager

### Installation

- Clone the repository
  ```sh
  git clone git@github.com:janis-schanbacher/webdj.git
  ```
- Install all dependencies from within the repository
  ```sh
  cd webdj
  yarn install
  ```

## Usage
- Run the app in development mode
  ```sh
  yarn start
  ```
- Open [http://localhost:3000](http://localhost:3000) in the browser.
- Build minified, optminized build in production mode (more information see [deployment](https://facebook.github.io/create-react-app/docs/deployment))
  ```
  yarn build
  ```

## Testing
- Launch test runner in interactive mode
  ```sh
  yarn test
  ```
- See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Setup editor

### EditorConfig
Webdj is using [EditorConfig](https://editorconfig.org) to ensure all files have the same style and encoding through different editors.

A plugin might be requiered for your preferred editor to use these settings [EditorConfig](https://editorconfig.org/#download).

### Linting
- Install linter extension to your editor of choice:
  - **VSCode**: [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - **Vim**: [ALE (Asynchronous Lint Engine)](https://github.com/w0rp/ale)
- Lint all JavaScript files:
  ```sh
  yarn lint
  ```

<!-- ### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify -->
