import { dateUtils } from '../../src/utils/dateUtils';

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2026-04-30T12:00:00');
      const result = dateUtils.formatDate(date);
      expect(result).toMatch(/\d{2}\/\d{2}\/2026/);
    });

    it('should pad single digits with zero', () => {
      const date = new Date('2026-01-05T12:00:00');
      const result = dateUtils.formatDate(date);
      expect(result).toBe('05/01/2026');
    });
  });

  describe('formatTime', () => {
    it('should format time correctly', () => {
      const date = new Date('2026-04-30T14:30:00');
      const result = dateUtils.formatTime(date);
      expect(result).toBe('14:30');
    });

    it('should pad single digits with zero', () => {
      const date = new Date('2026-04-30T09:05:00');
      const result = dateUtils.formatTime(date);
      expect(result).toBe('09:05');
    });
  });

  describe('formatDateTime', () => {
    it('should format date and time together', () => {
      const date = new Date('2026-04-30T14:30:00');
      const result = dateUtils.formatDateTime(date);
      expect(result).toContain('às');
      expect(result).toContain('14:30');
    });
  });

  describe('isToday', () => {
    it('should return true for today', () => {
      const today = new Date();
      expect(dateUtils.isToday(today)).toBe(true);
    });

    it('should return false for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(dateUtils.isToday(yesterday)).toBe(false);
    });

    it('should return false for tomorrow', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(dateUtils.isToday(tomorrow)).toBe(false);
    });
  });

  describe('isTomorrow', () => {
    it('should return true for tomorrow', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(dateUtils.isTomorrow(tomorrow)).toBe(true);
    });

    it('should return false for today', () => {
      const today = new Date();
      expect(dateUtils.isTomorrow(today)).toBe(false);
    });

    it('should return false for day after tomorrow', () => {
      const dayAfter = new Date();
      dayAfter.setDate(dayAfter.getDate() + 2);
      expect(dateUtils.isTomorrow(dayAfter)).toBe(false);
    });
  });

  describe('getRelativeDate', () => {
    it('should return "Hoje às" for today', () => {
      const today = new Date();
      const result = dateUtils.getRelativeDate(today);
      expect(result).toContain('Hoje às');
    });

    it('should return "Amanhã às" for tomorrow', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const result = dateUtils.getRelativeDate(tomorrow);
      expect(result).toContain('Amanhã às');
    });

    it('should return full date for other days', () => {
      const future = new Date();
      future.setDate(future.getDate() + 5);
      const result = dateUtils.getRelativeDate(future);
      expect(result).toContain('às');
      expect(result).not.toContain('Hoje');
      expect(result).not.toContain('Amanhã');
    });
  });

  describe('isPast', () => {
    it('should return true for past dates', () => {
      const past = new Date('2020-01-01T00:00:00');
      expect(dateUtils.isPast(past)).toBe(true);
    });

    it('should return false for future dates', () => {
      const future = new Date();
      future.setFullYear(future.getFullYear() + 1);
      expect(dateUtils.isPast(future)).toBe(false);
    });
  });

  describe('isFuture', () => {
    it('should return true for future dates', () => {
      const future = new Date();
      future.setFullYear(future.getFullYear() + 1);
      expect(dateUtils.isFuture(future)).toBe(true);
    });

    it('should return false for past dates', () => {
      const past = new Date('2020-01-01T00:00:00');
      expect(dateUtils.isFuture(past)).toBe(false);
    });
  });
});

// Made with Bob
