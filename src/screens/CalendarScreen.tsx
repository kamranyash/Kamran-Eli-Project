import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, borderRadius, typography } from '../theme';
import { MOCK_BOOKINGS } from '../data/mockBookings';
import type { CalendarStackParamList } from '../navigation/AppTabs';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
type ViewMode = 'Month' | 'Week' | 'Day';

function getWeekStart(d: Date): Date {
  const copy = new Date(d);
  const day = copy.getDay();
  copy.setDate(copy.getDate() - day);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function getDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const day = date.getDate();
  return `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

type CalendarNav = NativeStackNavigationProp<CalendarStackParamList, 'Calendar'>;

export function CalendarScreen() {
  const navigation = useNavigation<CalendarNav>();
  const [viewDate, setViewDate] = useState(new Date(2026, 0, 1));
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('Month');
  const [showDropdown, setShowDropdown] = useState(false);

  const openDayDetail = (date: Date) => {
    setSelectedDay(date);
    navigation.navigate('DayDetail', { date: getDateKey(date) });
  };

  const eventsByDate = useMemo(() => {
    const map: Record<string, { title: string; time: string }[]> = {};
    MOCK_BOOKINGS.forEach((b) => {
      const key = b.date;
      if (!map[key]) map[key] = [];
      map[key].push({
        title: `${b.jobTitle || 'Job'} ${b.time}`,
        time: b.time,
      });
    });
    const d = new Date(2026, 0, 15);
    const key2 = getDateKey(d);
    if (!map[key2]) map[key2] = [];
    map[key2].push({ title: 'Gardening 1-2pm', time: '1:00 PM - 2:00 PM' });
    return map;
  }, []);

  const { cells, headerLabel } = useMemo(() => {
    if (viewMode === 'Month') {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();
      const first = new Date(year, month, 1);
      const last = new Date(year, month + 1, 0);
      const startOffset = first.getDay();
      const numDays = last.getDate();
      const days: (number | null)[] = Array(startOffset).fill(null);
      for (let d = 1; d <= numDays; d++) days.push(d);
      const monthYear = viewDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });
      return {
        cells: days.map((day) => (day === null ? null : new Date(year, month, day))),
        headerLabel: monthYear,
        isMonth: true,
      };
    }
    if (viewMode === 'Week') {
      const start = getWeekStart(viewDate);
      const cells: Date[] = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        cells.push(d);
      }
      const end = cells[6];
      const label = `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      return { cells, headerLabel: label, isMonth: false };
    }
    const dayLabel = viewDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    return {
      cells: [viewDate],
      headerLabel: dayLabel,
      isMonth: false,
    };
  }, [viewDate, viewMode]);

  const goPrev = () => {
    if (viewMode === 'Month') {
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    } else if (viewMode === 'Week') {
      const d = new Date(viewDate);
      d.setDate(d.getDate() - 7);
      setViewDate(d);
    } else {
      const d = new Date(viewDate);
      d.setDate(d.getDate() - 1);
      setViewDate(d);
    }
    setSelectedDay(null);
  };

  const goNext = () => {
    if (viewMode === 'Month') {
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    } else if (viewMode === 'Week') {
      const d = new Date(viewDate);
      d.setDate(d.getDate() + 7);
      setViewDate(d);
    } else {
      const d = new Date(viewDate);
      d.setDate(d.getDate() + 1);
      setViewDate(d);
    }
    setSelectedDay(null);
  };

  const selectedEvents =
    selectedDay !== null
      ? eventsByDate[getDateKey(selectedDay)] || []
      : viewMode === 'Day'
        ? eventsByDate[getDateKey(viewDate)] || []
        : [];

  const selectedEventsLabel =
    viewMode === 'Day'
      ? viewDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' events'
      : selectedDay
        ? `${selectedDay.getMonth() + 1}/${selectedDay.getDate()} events`
        : 'Tap a day to see events';

  const showWeekRow = viewMode === 'Month' || viewMode === 'Week';
  const gridCells: Date[] =
    viewMode === 'Week' ? (cells as Date[]) : viewMode === 'Day' ? (cells as Date[]) : [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goPrev} style={styles.chevron}>
          <Text style={styles.chevronText}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.monthYear}>{headerLabel}</Text>
          <TouchableOpacity
            style={styles.timeSpan}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={styles.timeSpanText}>{viewMode}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={goNext} style={styles.chevron}>
          <Text style={styles.chevronText}>›</Text>
        </TouchableOpacity>
      </View>

      {showDropdown && (
        <View style={styles.dropdown}>
          {(['Month', 'Week', 'Day'] as const).map((mode) => (
            <TouchableOpacity
              key={mode}
              onPress={() => {
                setViewMode(mode);
                setShowDropdown(false);
              }}
              style={styles.dropdownItem}
            >
              <Text style={styles.dropdownItemText}>{mode}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.legend}>
        <View style={[styles.legendDot, styles.legendWhite]} />
        <Text style={styles.legendText}>White : nothing</Text>
        <View style={[styles.legendDot, styles.legendRed]} />
        <Text style={styles.legendText}>red : booked</Text>
      </View>

      {showWeekRow && (
        <View style={styles.weekRow}>
          {DAYS.map((d) => (
            <Text key={d} style={styles.weekDay}>
              {d}
            </Text>
          ))}
        </View>
      )}

      <View
        style={[
          styles.grid,
          viewMode === 'Day' && styles.gridDay,
          viewMode === 'Week' && styles.gridWeek,
        ]}
      >
        {viewMode === 'Month' &&
          cells.map((cell, i) => {
            if (cell === null) {
              return <View key={`empty-${i}`} style={styles.cell} />;
            }
            const key = getDateKey(cell);
            const events = eventsByDate[key] || [];
            const isBooked = events.length > 0;
            const isSelected =
              selectedDay !== null && getDateKey(selectedDay) === key;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.cell, isSelected && styles.cellSelected]}
                onPress={() => openDayDetail(cell)}
              >
                <View
                  style={[
                    styles.dayDot,
                    isBooked ? styles.dayDotBooked : styles.dayDotEmpty,
                  ]}
                />
                {events.length > 0 && events.length <= 3 && (
                  <Text style={styles.dayLabel} numberOfLines={1}>
                    {events[0].title}
                  </Text>
                )}
                {events.length > 3 && (
                  <Text style={styles.dayLabel}>3+</Text>
                )}
                <Text style={styles.dayNum}>{cell.getDate()}</Text>
              </TouchableOpacity>
            );
          })}
        {viewMode === 'Week' &&
          gridCells.map((cell: Date) => {
            const key = getDateKey(cell);
            const events = eventsByDate[key] || [];
            const isBooked = events.length > 0;
            const isSelected =
              selectedDay !== null && getDateKey(selectedDay) === key;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.cell, styles.cellWeek, isSelected && styles.cellSelected]}
                onPress={() => openDayDetail(cell)}
              >
                <View
                  style={[
                    styles.dayDot,
                    isBooked ? styles.dayDotBooked : styles.dayDotEmpty,
                  ]}
                />
                {events.length > 0 && events.length <= 2 && (
                  <Text style={styles.dayLabelWeek} numberOfLines={1}>
                    {events[0].title}
                  </Text>
                )}
                {events.length > 2 && (
                  <Text style={styles.dayLabelWeek}>{events.length}+</Text>
                )}
                <Text style={styles.dayNum}>{cell.getDate()}</Text>
              </TouchableOpacity>
            );
          })}
        {viewMode === 'Day' && (
          <TouchableOpacity
            style={[styles.cell, styles.cellDay]}
            onPress={() => openDayDetail(viewDate)}
          >
            <Text style={styles.dayNumDay}>{viewDate.getDate()}</Text>
            <Text style={styles.daySubtext}>
              {viewDate.toLocaleDateString('en-US', { weekday: 'long' })}
            </Text>
            {(eventsByDate[getDateKey(viewDate)] || []).length > 0 && (
              <View style={[styles.dayDot, styles.dayDotBooked]} />
            )}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.eventsSection}>
        <Text style={styles.eventsTitle}>{selectedEventsLabel}</Text>
        {selectedEvents.map((ev, i) => (
          <View key={i} style={styles.eventCard}>
            <Text style={styles.eventTitle}>{ev.title}</Text>
            <Text style={styles.eventTime}>{ev.time}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthYear: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  chevron: {
    padding: spacing.sm,
  },
  chevronText: {
    fontSize: 28,
    color: colors.text,
    fontWeight: '300',
  },
  timeSpan: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  timeSpanText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  dropdownArrow: {
    fontSize: 12,
    color: colors.text,
  },
  dropdown: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  dropdownItem: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropdownItemText: {
    ...typography.body,
    color: colors.text,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendWhite: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  legendRed: {
    backgroundColor: colors.error,
  },
  legendText: {
    ...typography.bodySmall,
    color: colors.text,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  weekDay: {
    flex: 1,
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridWeek: {
    flexWrap: 'nowrap',
  },
  gridDay: {
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  cellWeek: {
    flex: 1,
    minWidth: 0,
    aspectRatio: 1,
  },
  cellDay: {
    width: '100%',
    maxWidth: 200,
    aspectRatio: 1,
    justifyContent: 'center',
  },
  cellSelected: {
    backgroundColor: colors.gray[200],
  },
  dayDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 2,
  },
  dayDotEmpty: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayDotBooked: {
    backgroundColor: colors.error,
  },
  dayLabel: {
    fontSize: 8,
    color: colors.textSecondary,
    maxWidth: '100%',
    textAlign: 'center',
  },
  dayLabelWeek: {
    fontSize: 10,
    color: colors.textSecondary,
    maxWidth: '100%',
    textAlign: 'center',
  },
  dayNum: {
    ...typography.caption,
    color: colors.text,
    marginTop: 2,
  },
  dayNumDay: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.text,
  },
  daySubtext: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  eventsSection: {
    marginTop: spacing.xl,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    minHeight: 120,
  },
  eventsTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  eventCard: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
  },
  eventTitle: {
    ...typography.body,
    color: colors.text,
  },
  eventTime: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
