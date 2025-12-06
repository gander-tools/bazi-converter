# ROADMAP

## Repository Cleanup
- Clean up unnecessary files and metadata in repository
- Remove .idea directory from tracking
- Add proper .gitignore file

## Dependencies & Licensing
- Clean up dependencies - remove unnecessary packages (fs, bazi-converter self-dependency)
- Setup dual license - MIT (tinytinydev) + GPL-3.0 (gander)
- Add LICENSE-MIT and LICENSE-GPL files

## Project Infrastructure
- Setup Biome.js for formatting and linting
- Setup TypeScript configuration
- Setup build configuration (esbuild/Vite)
- Update package.json with proper exports, files, and scripts

## Code Migration to TypeScript
- Convert BaziConverter.js to TypeScript with proper types
- Remove duplicate methods in BaziConverter (lines 91-120 vs 123-174)
- Convert helper functions (common.js) to TypeScript
- Generate TypeScript declaration files (.d.ts)

## Testing (TDD Approach)
- Setup TDD infrastructure - test framework (Vitest), test structure
- Write comprehensive tests for all BaziConverter methods
- Verify all tests pass and code coverage is adequate

## Data Optimization
- Analyze data format optimization - evaluate JSON vs Protobuf vs MessagePack
- Split dates_mapping.json into chunks (by year range or decade)
- Implement async data loading with dynamic imports for heavy files

## Modern ES Modules
- Convert to modern ES modules with browser compatibility
- Create separate browser and Node.js entry points
- Setup build process to bundle app.js + optimized data files

## Documentation
- Update README.md with new API, installation, and usage examples
- Update CLAUDE.md with new architecture details
