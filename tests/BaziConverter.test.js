import { describe, it, expect } from 'vitest';
import BaziConverter from '../BaziConverter.js';

describe('BaziConverter', () => {
  describe('Constructor', () => {
    it('should create instance with valid date and hour', () => {
      const bazi = new BaziConverter(1994, 5, 10, 21);
      expect(bazi.year).toBe(1994);
      expect(bazi.month).toBe(5);
      expect(bazi.day).toBe(10);
      expect(bazi.hour).toBe(21);
    });
  });

  describe('getEarthNumberFromHour', () => {
    it('should return correct earth number for valid hours', () => {
      const bazi = new BaziConverter(2000, 1, 1, 0);

      expect(bazi.getEarthNumberFromHour(0)).toBe('E1');   // 23-1
      expect(bazi.getEarthNumberFromHour(23)).toBe('E1');  // 23-1
      expect(bazi.getEarthNumberFromHour(1)).toBe('E2');   // 1-3
      expect(bazi.getEarthNumberFromHour(3)).toBe('E3');   // 3-5
      expect(bazi.getEarthNumberFromHour(5)).toBe('E4');   // 5-7
      expect(bazi.getEarthNumberFromHour(7)).toBe('E5');   // 7-9
      expect(bazi.getEarthNumberFromHour(9)).toBe('E6');   // 9-11
      expect(bazi.getEarthNumberFromHour(11)).toBe('E7');  // 11-13
      expect(bazi.getEarthNumberFromHour(13)).toBe('E8');  // 13-15
      expect(bazi.getEarthNumberFromHour(15)).toBe('E9');  // 15-17
      expect(bazi.getEarthNumberFromHour(17)).toBe('E10'); // 17-19
      expect(bazi.getEarthNumberFromHour(19)).toBe('E11'); // 19-21
      expect(bazi.getEarthNumberFromHour(21)).toBe('E12'); // 21-23
    });

    it('should return "-" for invalid hours', () => {
      const bazi = new BaziConverter(2000, 1, 1, 0);
      expect(bazi.getEarthNumberFromHour(-1)).toBe('-');
      expect(bazi.getEarthNumberFromHour(-5)).toBe('-');
    });
  });

  describe('convertToTianGangNumber', () => {
    it('should convert number to TianGang format', () => {
      const bazi = new BaziConverter(2000, 1, 1, 0);
      expect(bazi.convertToTianGangNumber(1)).toBe('H1');
      expect(bazi.convertToTianGangNumber(10)).toBe('H10');
    });
  });

  describe('convertToDiziNumber', () => {
    it('should convert number to Dizi format', () => {
      const bazi = new BaziConverter(2000, 1, 1, 0);
      expect(bazi.convertToDiziNumber(1)).toBe('E1');
      expect(bazi.convertToDiziNumber(12)).toBe('E12');
    });
  });

  describe('getBaziJson - Normal case with valid hour', () => {
    it('should return correct bazi for 1994-05-10 21:00', () => {
      const bazi = new BaziConverter(1994, 5, 10, 21);
      const result = bazi.getBaziJson();

      expect(result).toEqual({
        year: '甲戌',
        month: '己巳',
        day: '丙申',
        time: '己亥'
      });
    });

    it('should return correct bazi for 2025-05-10 21:00', () => {
      const bazi = new BaziConverter(2025, 5, 10, 21);
      const result = bazi.getBaziJson();

      expect(result).toEqual({
        year: '乙巳',
        month: '辛巳',
        day: '己卯',
        time: '乙亥'
      });
    });

    it('should return correct bazi for 2030-05-10 21:00', () => {
      const bazi = new BaziConverter(2030, 5, 10, 21);
      const result = bazi.getBaziJson();

      expect(result).toEqual({
        year: '庚戌',
        month: '辛巳',
        day: '乙巳',
        time: '丁亥'
      });
    });
  });

  describe('getBaziJson - Unknown hour case', () => {
    it('should return "吉" for time when hour is invalid', () => {
      const bazi = new BaziConverter(1993, 5, 10, -1);
      const result = bazi.getBaziJson();

      expect(result).toEqual({
        year: '癸酉',
        month: '丁巳',
        day: '辛卯',
        time: '吉'
      });
    });
  });

  describe('getBaziChineseFullString', () => {
    it('should return full Chinese string format', () => {
      const bazi = new BaziConverter(1994, 5, 10, 21);
      const result = bazi.getBaziChineseFullString();

      expect(result).toBe('甲戌年己巳月丙申日己亥时');
    });

    it('should handle unknown hour case', () => {
      const bazi = new BaziConverter(1993, 5, 10, -1);
      const result = bazi.getBaziChineseFullString();

      expect(result).toBe('癸酉年丁巳月辛卯日吉时');
    });
  });

  describe('translateBaziEnglish', () => {
    it('should translate bazi to English for normal case', () => {
      const bazi = new BaziConverter(1994, 5, 10, 21);
      const result = bazi.translateBaziEnglish();

      expect(result).toEqual({
        year: 'Wood Dog',
        month: 'Earth Snake',
        day: 'Fire Monkey',
        time: 'Earth Pig'
      });
    });

    it('should handle unknown hour with "Lucky"', () => {
      const bazi = new BaziConverter(1993, 5, 10, -1);
      const result = bazi.translateBaziEnglish();

      expect(result).toEqual({
        year: 'Water Rooster',
        month: 'Fire Snake',
        day: 'Gold Rabbit',
        time: 'Lucky '
      });
    });

    it('should translate bazi for 2025 correctly', () => {
      const bazi = new BaziConverter(2025, 5, 10, 21);
      const result = bazi.translateBaziEnglish();

      expect(result).toEqual({
        year: 'Wood Snake',
        month: 'Gold Snake',
        day: 'Earth Rabbit',
        time: 'Wood Pig'
      });
    });

    it('should translate bazi for 2030 correctly', () => {
      const bazi = new BaziConverter(2030, 5, 10, 21);
      const result = bazi.translateBaziEnglish();

      expect(result).toEqual({
        year: 'Gold Dog',
        month: 'Gold Snake',
        day: 'Wood Snake',
        time: 'Fire Pig'
      });
    });
  });

  describe('getBaziEnglishMapping', () => {
    it('should map Chinese bazi to English element and animal', () => {
      const bazi = new BaziConverter(1994, 5, 10, 21);
      const result = bazi.getBaziEnglishMapping('甲戌');

      expect(result).toEqual({
        element: 'Wood',
        animal_mnemonic: 'Dog'
      });
    });

    it('should map different Chinese bazi correctly', () => {
      const bazi = new BaziConverter(1994, 5, 10, 21);

      expect(bazi.getBaziEnglishMapping('癸酉')).toEqual({
        element: 'Water',
        animal_mnemonic: 'Rooster'
      });

      expect(bazi.getBaziEnglishMapping('丁巳')).toEqual({
        element: 'Fire',
        animal_mnemonic: 'Snake'
      });
    });

    // Note: Single character case is not handled by the second duplicate method (line 252)
    // This is a known issue that should be fixed when removing duplicate methods
  });

  describe('getBaziJsonWithElementalZodiac', () => {
    it('should return bazi with elemental zodiac mapping', () => {
      const bazi = new BaziConverter(1994, 5, 10, 21);
      const result = bazi.getBaziJsonWithElementalZodiac();

      expect(result).toEqual({
        year: '甲戌',
        month: '己巳',
        day: '丙申',
        time: '己亥',
        elemental_zodiac: {
          year: '木狗',
          month: '土蛇',
          day: '火猴',
          time: '土豬'
        }
      });
    });

    it('should handle unknown hour with "NA" for elemental zodiac', () => {
      const bazi = new BaziConverter(1993, 5, 10, -1);
      const result = bazi.getBaziJsonWithElementalZodiac();

      expect(result).toEqual({
        year: '癸酉',
        month: '丁巳',
        day: '辛卯',
        time: '吉',
        elemental_zodiac: {
          year: '水雞',
          month: '火蛇',
          day: '金兔',
          time: 'NA'
        }
      });
    });
  });

  describe('getElementalZodiacMappingChinese', () => {
    it('should convert English element+zodiac to Chinese', () => {
      const bazi = new BaziConverter(1994, 5, 10, 21);
      const result = bazi.getElementalZodiacMappingChinese('Wood Dog');

      expect(result).toBe('木狗');
    });

    it('should return "NA" for "Lucky" time', () => {
      const bazi = new BaziConverter(1993, 5, 10, -1);
      const result = bazi.getElementalZodiacMappingChinese('Lucky ');

      expect(result).toBe('NA');
    });
  });

  describe('Edge cases and boundary testing', () => {
    it('should handle midnight hour (0)', () => {
      const bazi = new BaziConverter(2000, 1, 1, 0);
      const result = bazi.getBaziJson();

      expect(result.time).toBeDefined();
      expect(typeof result.time).toBe('string');
    });

    it('should handle 23:00 hour', () => {
      const bazi = new BaziConverter(2000, 1, 1, 23);
      const result = bazi.getBaziJson();

      expect(result.time).toBeDefined();
      expect(typeof result.time).toBe('string');
    });

    it('should handle different years within data range', () => {
      const years = [1930, 1950, 1970, 1990, 2000, 2010, 2020, 2030];

      years.forEach(year => {
        const bazi = new BaziConverter(year, 6, 15, 12);
        const result = bazi.getBaziJson();

        expect(result.year).toBeDefined();
        expect(result.month).toBeDefined();
        expect(result.day).toBeDefined();
        expect(result.time).toBeDefined();
      });
    });
  });
});
