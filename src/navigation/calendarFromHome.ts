/**
 * Set to true when user opens Calendar via the home page calendar button.
 * CalendarScreen reads and clears this so the back button only shows when coming from home.
 */
let calendarOpenedFromHome = false;

export function setCalendarOpenedFromHome(value: boolean): void {
  calendarOpenedFromHome = value;
}

export function getAndClearCalendarOpenedFromHome(): boolean {
  const value = calendarOpenedFromHome;
  calendarOpenedFromHome = false;
  return value;
}
