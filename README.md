# WebDj
WebDj is a react web application for mixing songs. Try out the [demo](webdj.herokuapp.com/)!

## Features

- Play two audio files simultaneously

- Change the tracks by dragging an audio file on a deck or by using the "Select Song" Button
- Control volume using the vertical slider of a track or by using the crossfader 
- 3 band equalizer (high shelf, peaking, low shelf)
- Waveform visualization with click handler to jump to selected position
- Progress bar that visualizes the play position
- Play tracks (with same bpm) synchronized
- Beat Jump 1/4/8/16/32 beats forward and backward
- Loop 1/4/8/16/32 beats

## Dependencies
- [React](https://reactjs.org/) 
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [web-audio-beat-detector](https://github.com/chrisguttandin/web-audio-beat-detector?spm=a2c6h.14275010.0.0.268d11e1POKD7O)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Ant Design](https://ant.design/)
- [Styled Components](https://styled-components.com/)
- [React Rotary Knob](https://github.com/hugozap/react-rotary-knob)

## Getting started

### Prerequisites
- [npm](https://www.npmjs.com/) - dependency manager

### Installation

- Clone the repository
  ```sh
  git clone git@github.com:janis-schanbacher/webdj.git
  ```
- Install all dependencies from within the repository
  ```sh
  cd webdj
  npm install
  ```

### Usage
- Run the app in development mode
  ```sh
  npm start
  ```
- Open [http://localhost:3000](http://localhost:3000) in the browser.
- Build minified, optimized build in production mode (more information see [deployment](https://facebook.github.io/create-react-app/docs/deployment))
  ```
  npm build
  ```

<!-- ## Testing
- Launch test runner in interactive mode
  ```sh
  yarn test
  ```
- See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information. -->

### Setup editor

#### EditorConfig
Webdj is using [EditorConfig](https://editorconfig.org) to ensure all files have the same style and encoding through different editors.

A plugin might be required for your preferred editor to use these settings [EditorConfig](https://editorconfig.org/#download).

#### Linting
- Install linter extension to your editor of choice:
  - **VSCode**: [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - **Vim**: [ALE (Asynchronous Lint Engine)](https://github.com/w0rp/ale)
- Lint all JavaScript files:
  ```sh
  yarn lint
  ```
