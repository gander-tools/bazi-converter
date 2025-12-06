# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bazi Converter is a Node.js library that converts Gregorian dates (year, month, day, hour) into Chinese Bazi (八字) or "Four Pillars of Destiny" representations. It provides both Chinese character output and English translations with elemental and zodiac animal mappings.

## Development Commands

- **Run sample/test**: `node sample.js`
- **Generate documentation**: `npm run generate-docs`

## Architecture

### Core Components

**BaziConverter.js** - Main class that:
- Takes birth date/time as input (year, month, day, hour in 24h format)
- Converts to four pillars (year, month, day, time) in Chinese characters
- Provides English translations with element + animal zodiac format
- Returns elemental zodiac variations commonly used in practice

### Data Mapping Structure

The conversion logic relies on pre-scraped JSON mappings in `/data`:

- **dates_mapping.json** - Core mapping for year/month/day. Structure: `{year: {month: {day: {HYear, EYear, HMonth, EMonth, HDay, EDay, season}}}}` where H = Heavenly Stem number (1-10) and E = Earthly Branch number (1-12)
- **hour_mapping.json** - Maps hour ranges to heavenly stems based on day stem. Structure: `{E1-E12: {HDay: HHour}}`
- **tiangan.json** - Heavenly stems lookup (H1-H10 to Chinese characters)
- **dizi.json** - Earthly branches lookup (E1-E12 to Chinese characters)
- **heavenly_stems_english.json** - Maps Chinese heavenly stems to elements (Wood, Fire, Earth, Metal, Water)
- **earthly_branches_english.json** - Maps Chinese earthly branches to zodiac animals
- **elements_mapping.json** - Element names to Chinese characters
- **zodiac_mapping.json** - Animal names to Chinese characters

### Key Conversion Flow

1. **Hour to Earth Branch**: `getEarthNumberFromHour()` converts 24h time to E1-E12 (2-hour periods)
2. **Date Lookup**: Index into `dates_mapping` by year/month/day to get H/E numbers for year, month, day pillars
3. **Hour Pillar Calculation**: Use `hour_mapping[earthHour][HDay]` to get heavenly stem for time pillar
4. **Chinese Assembly**: Combine heavenly stem (H) + earthly branch (E) characters for each pillar
5. **English Translation**: Map Chinese characters through heavenly_stems_english and earthly_branches_english

### Special Cases

- **Unknown hour** (hour < 0): Returns "吉" (Lucky) for time pillar
- **Time ranges**: Hours 23-1 = E1, 1-3 = E2, ..., 21-23 = E12 (handles midnight wrap)
- **Duplicate methods**: There are duplicate `convertToTianGangNumber`, `convertToDiziNumber`, and `getBaziJson` methods in BaziConverter.js (lines 91-120 vs 123-174)

### Data Coverage

The dates_mapping.json contains data from 1930-2100. Data was scraped from WikiBooks Ba Zi pages (1991-2033) and extended through data regeneration.

### Helper Functions

**functions/common.js** provides:
- `loadRawData(filePath)` - Loads and parses JSON files
- `loadRawDataToMap(filePath)` - Loads JSON as a Map object for efficient lookup

## ES Module Usage

This package uses ES modules (`"type": "module"` in package.json). All imports must use `.js` extensions explicitly.