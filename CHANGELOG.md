# @signalwire/compatibility-api

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.2.0] - 2025-09-30

### Changed

- Update axios dependency to 1.12.2 to address security vulnerability (CVE-2024-39338).
- Drop support for Node.js 14 (EOL) - minimum supported version is now Node.js 16.
- Update CI testing to Node.js 16, 18, and 20.

### Fixed

- Add mdurl type override to resolve dependency conflicts.

## [3.1.4] - 2023-08-30

### Fixed

- Restore `create()` and `update()` methods on FaxInstance and FaxListInstance namespaces.

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
