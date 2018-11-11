[![David](https://img.shields.io/david/andrewjw/sonos-ionic.svg)](https://david-dm.org/andrewjw/sonos-ionic?view=list) [![David](https://img.shields.io/david/dev/andrewjw/sonos-ionic.svg)](https://david-dm.org/andrewjw/sonos-ionic?type=dev&view=list) [![TravisCI](https://img.shields.io/travis/andrewjw/sonos-ionic.svg)](https://travis-ci.org/andrewjw/sonos-ionic) [![CodeCov](https://img.shields.io/codecov/c/github/andrewjw/sonos-ionic.svg)](https://codecov.io/gh/andrewjw/sonos-ionic)

# sonos-ionic
An app for the FitBit Ionic to control your Sonos system

# Screenshots

![Zone Group List](docs/zonegroups.png)

# How To Build

To build the application first run `npm install`, then one of the following commands.

- `gulp build` - build the application
- `gulp install` - install the application on either the FitBit Simulator, or your physical watch (if developer mode is enabled.)
- `gulp test` - run the tests
- `gulp watch` - run the linter, builder and tests on every change to a file.

Other commands

- `gulp lint` - run the linter
- `gulp cover` - run the tests and calculate the test coverage

# Thanks

Thanks to [Sergio Morchon](https://github.com/SergioMorchon/fitbit-sdk-types) for providing the [`fitbit-sdk-types`](https://github.com/SergioMorchon/fitbit-sdk-types) package and his help getting it set up.
