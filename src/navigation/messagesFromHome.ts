/**
 * Set to true when user opens Messages via the home page messages button.
 * MessagesScreen reads and clears this so the back button only shows when coming from home.
 */
let messagesOpenedFromHome = false;

export function setMessagesOpenedFromHome(value: boolean): void {
  messagesOpenedFromHome = value;
}

export function getAndClearMessagesOpenedFromHome(): boolean {
  const value = messagesOpenedFromHome;
  messagesOpenedFromHome = false;
  return value;
}
