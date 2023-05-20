import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date | null): string {
    if (value === null) {
      return ''; // or any other default value you prefer for null dates
    }

    const now = new Date();
    const date = typeof value === 'string' ? new Date(value) : value;
    const diff = now.getTime() - date.getTime();

    // Time calculations
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;

    if (diff < minute) {
      return 'A moment ago';
    } else if (diff < (minute * 2)) {
      return '1 minute ago';
    } else if (diff < hour) {
      const minutes = Math.floor(diff / minute);
      return `${minutes} minutes ago`;
    } else if (diff < day) {
      return `Today at ${this.formatTime(date)}`;
    } else if (diff < 2 * day) {
      return `Yesterday at ${this.formatTime(date)}`;
    } else if (diff < week) {
      return `${this.getDayOfWeek(date)} at ${this.formatTime(date)}`;
    } else {
      return this.formatDate(date);
    }
  }

  // Helper functions
  private formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  private getDayOfWeek(date: Date): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
