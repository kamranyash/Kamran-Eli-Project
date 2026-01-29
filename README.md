# Producer App (React Native + Expo + TypeScript)

PRODUCER-side mobile app for small business workers (painters, lawn mowers, gardeners). Features bookings, messaging, calendar, job listings, and payment request UI (mock only).

## How to run the app

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Run on a device/simulator**
   - Press `i` in the terminal for iOS simulator, or `a` for Android emulator.
   - Or scan the QR code with the Expo Go app on your phone.

## Where to change mock data

- **Bookings:** `src/data/mockBookings.ts`  
  Edit the `MOCK_BOOKINGS` array and the `Booking` type.

- **Chat threads and messages:** `src/data/mockThreads.ts`  
  Edit `MOCK_THREADS` and the `getMockMessagesForThread()` function for thread list and chat content.

- **Job listings:** `src/data/mockJobListings.ts`  
  Edit the `MOCK_JOB_LISTINGS` array and the `JobListing` type.

## What file controls navigation

- **Root (auth vs app):** `src/navigation/RootNavigator.tsx`  
  Switches between `AuthNavigator` (login/sign up) and `AppTabs` based on mock auth state.

- **Auth flow:** `src/navigation/AuthNavigator.tsx`  
  Stack: Login → Sign Up. On success, `RootNavigator` switches to main tabs.

- **Main app (tabs + stacks):** `src/navigation/AppTabs.tsx`  
  Bottom tabs: Home, Calendar, Messages, Job Listings, Payments.  
  Each tab can have its own stack (e.g. Home stack: Home → Manage Booking → Create Booking; Messages stack: Messages → Chat Thread → New Chat).

## Project structure

```
src/
  screens/       # All screens (Login, SignUp, Home, ManageBooking, CreateBooking, Calendar, Messages, ChatThread, NewChat, JobListings, Payments)
  components/    # BookingCard, PrimaryButton, IconButton, AmountPill, PaymentMethodTile, ThreadRow, JobListingCard
  data/          # mockBookings.ts, mockThreads.ts, mockJobListings.ts
  navigation/     # AuthNavigator, AppTabs, RootNavigator
  theme/          # colors, spacing, typography
App.tsx           # App entry, wraps RootNavigator in SafeAreaProvider
```

## Design

- Light blue background (`#E8F4FC`), white rounded cards, large titles, simple icons, clean spacing.
- Payments screen is UI only (no Stripe/Venmo/Zelle integration).
- Manage Booking → “Request Payment” opens the Payments tab with amount (and optional client/booking) prefilled via params.

## Assets

Add your own `assets/icon.png`, `assets/splash.png`, and `assets/adaptive-icon.png` if you want custom app icons and splash. Otherwise Expo uses defaults.
