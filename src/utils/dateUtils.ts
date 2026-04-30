export const dateUtils = {
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  },

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  },

  formatDateTime(date: Date): string {
    return `${this.formatDate(date)} às ${this.formatTime(date)}`;
  },

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  },

  isTomorrow(date: Date): boolean {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear()
    );
  },

  getRelativeDate(date: Date): string {
    if (this.isToday(date)) {
      return `Hoje às ${this.formatTime(date)}`;
    }
    if (this.isTomorrow(date)) {
      return `Amanhã às ${this.formatTime(date)}`;
    }
    return this.formatDateTime(date);
  },

  isPast(date: Date): boolean {
    return date.getTime() < Date.now();
  },

  isFuture(date: Date): boolean {
    return date.getTime() > Date.now();
  },
};

// Made with Bob
