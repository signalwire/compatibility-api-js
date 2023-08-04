# @signalwire/compatibility-api

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.3] - 2023-08-04

### Changed

- Add a warning message on the `validateRequest` method to inform the user to use a different SDK to validate Relay requests.

## [3.1.2] - 2023-06-28

### Fixed

- Properly export `CompatibilityApi` and include `src` folder in the package.

## [3.1.1] - 2023-06-28

### Fixed

- Fix typescript declaration.

## [3.1.0] - 2023-05-17

### Added

- Add support for `AI` noun.
- Validate the `X-SignalWire-Signature` header for the inbound request.
