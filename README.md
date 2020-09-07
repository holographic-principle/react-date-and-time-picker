## Introduction

This is a fork of the awesome [chriskr/react-date-and-time-picker](https://github.com/chriskr/react-date-and-time-picker).

## Installation

Using npm or yarn:
```shell
$ npm i @holographic-principle/react-datetime-picker
$ yarn add @holographic-principle/react-datetime-picker
```

## Development
Run the development compilation process with:
```shell
$ yarn watch
```
The output will be collected into `build/`.

### `yarn link`

You can link this library for local development. Run:
```shell
$ yarn link
```
in the root directory of this repository, followed by:
```shell
$ yarn link "@holographic-principle/react-datetime-picker"
```
in the other project's root. Both the dev and the prod build exclude bundling dependencies such as React.
Those will have to be required by the consumer. Resolutions and aliases will also have to be handled
on that end.

## Releasing

Running the following will release a new version of the library to NPM.
```shell
$ yarn build:prod
$ yarn publish
```
The build output can be found under `dist/`.

## Credits and acknowledgements

Thanks to [chriskr](https://github.com/chriskr), a dear friend, colleague and mentor for writing the
original datepicker.
