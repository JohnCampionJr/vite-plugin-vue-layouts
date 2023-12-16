# Changelog

All notable changes to this project will be documented in this file.

## v0.9.1...v0.10.0

[compare changes](https://github.com/johncampionjr/vite-plugin-vue-layouts/compare/v0.9.1...v0.10.0)

### 🚀 Enhancements

- Use fastest plugin available based on options ([8e76bad](https://github.com/johncampionjr/vite-plugin-vue-layouts/commit/8e76bad))

### 🩹 Fixes

- Synchronize the logic of clientLayout to defaultLayout, close #130 ([#132](https://github.com/johncampionjr/vite-plugin-vue-layouts/pull/132), [#130](https://github.com/johncampionjr/vite-plugin-vue-layouts/issues/130))

### 📖 Documentation

- Add config for unplug-vue-router ([5542aa7](https://github.com/johncampionjr/vite-plugin-vue-layouts/commit/5542aa7))

### 🏡 Chore

- Add simpler example with unplugin-vue-router ([cae7638](https://github.com/johncampionjr/vite-plugin-vue-layouts/commit/cae7638))
- Fix eslint ([d10ac31](https://github.com/johncampionjr/vite-plugin-vue-layouts/commit/d10ac31))

### ❤️ Contributors

- Markthree ([@markthree](http://github.com/markthree))

## v0.9.0...v0.9.1

[compare changes](https://github.com/johncampionjr/vite-plugin-vue-layouts/compare/699638bf817e1f93c32266af78efadd95b28c6e1...v0.9.1)

### 🩹 Fixes

- **ClientSideLayout:** More user-friendly virtual ID, close #126 ([#127](https://github.com/johncampionjr/vite-plugin-vue-layouts/pull/127), [#126](https://github.com/johncampionjr/vite-plugin-vue-layouts/issues/126))

### ❤️ Contributors

- Yeser ([@yeli19950109](http://github.com/yeli19950109))

## v0.8.0...v0.9.0

[compare changes](https://github.com/johncampionjr/vite-plugin-vue-layouts/compare/95a54f17859dbcb8444f29f6368d1517e581a075...v0.9.0)

#### ⚠️ Breaking Changes

- ⚠️  Remove vue2, vite2 and vite3 ([db752fa](https://github.com/johncampionjr/vite-plugin-vue-layouts/commit/db752fa))

### 🚀 Enhancements

- Add no layout support ([eaaa8c3](https://github.com/johncampionjr/vite-plugin-vue-layouts/commit/eaaa8c3))
- Add client-side ([c278c0d](https://github.com/johncampionjr/vite-plugin-vue-layouts/commit/c278c0d))
- Alternative getRoutes that filters layouts ([31d3474](https://github.com/johncampionjr/vite-plugin-vue-layouts/commit/31d3474))
- Support layout dir globs ([1cead57](https://github.com/johncampionjr/vite-plugin-vue-layouts/commit/1cead57))

### 🩹 Fixes

- Layouts on nested routes / unplugin-vue-router ([406a402](https://github.com/johncampionjr/vite-plugin-vue-layouts/commit/406a402))
- Only watch pages and layouts dir for module reloading ([526fbf6](https://github.com/johncampionjr/vite-plugin-vue-layouts/commit/526fbf6))

### 📖 Documentation

- Fix ClientSideLayout ([ec525fc](https://github.com/johncampionjr/vite-plugin-vue-layouts/commit/ec525fc))
- Vite-plugin-pages ([2591b2c](https://github.com/johncampionjr/vite-plugin-vue-layouts/commit/2591b2c))

### 🏀 Examples

- Added vitesse for easier testing ([9f4419d](https://github.com/johncampionjr/vite-plugin-vue-layouts/commit/9f4419d))

### ❤️ Contributors

- Markthree ([@markthree](http://github.com/markthree))
- Xbmlz ([@xbmlz](http://github.com/xbmlz))

## [0.8.0] - 2023-02-18

- Vite 4.0 support

## [0.7.0] - 2022-07-24

- Vite 3.0 support

## [0.6.0] - 2022-02-04

### Added

- Added extensions option - [@deathpresence](https://github.com/deathpresence)
- Added multiple layout dirs (closed #45) - [@domsen123](https://github.com/domsen123)

**Breaking Change**
`layoutsDir` option is now called `layoutsDirs`

### Fixed

- Fixed ESM imports (closed #50) - [@josh-hemphill](https://github.com/josh-hemphill)

## [0.5.0] - 2021-09-21

### Added

- New option to specify default layout name

### Fixed

- Added vue2 peer dependency (closed #38) - [@byoungd](https://github.com/byoungd)

## [0.4.1] - 2021-09-03

### Fixed

- Accidentally moved type declaration import to wrong place

## [0.4.0] - 2021-09-02

### Fixed

- Changed plugin name
- Merged typings changes
- Updated dependencies

## [0.3.1] - 2021-05-06

### Fixed

- Removed postinstall command that slipped in

## [0.3.0] - 2021-05-04

### Fixed

- Layout changes before Page on slow connections - [@ctholho](https://github.com/ctholho)
- default.vue layout always runs - [@ctholho](https://github.com/ctholho)

### Changed

- import changed from `layouts-generated` to `virtual:generated-layouts` to be consistent with other Vite plugins (old still works for non-breaking) - thanks [@ctholho](https://github.com/ctholho).

## [0.2.2] - 2021-02-14

### Added

- Initial releases
