# Changelog

All notable changes to this project will be documented in this file.

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