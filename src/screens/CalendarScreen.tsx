import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme';
import { MOCK_BOOKINGS } from '../data/mockBookings';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function CalendarScreen() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1));
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [timeSpan, setTimeSpan] = useState<'Week' | 'Month' | 'Year'>('Month');
  const [showTimeSpanDropdown, setShowTimeSpanDropdown] = useState(false);

  const { days, startOffset } = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const startOffset = first.getDay();
    const numDays = last.getDate();
    const days: (number | null)[] = Array(startOffset).fill(null);
    for (let d = 1; d <= numDays; d++) days.push(d);
    return { days, startOffset };
  }, [currentMonth]);

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
    const key2 = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (!map[key2]) map[key2] = [];
    map[key2].push({ title: 'Gardening 1-2pm', time: '1:00 PM - 2:00 PM' });
    return map;
  }, []);

  const getDateKey = (day: number) => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth() + 1;
    return `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDay(null);
  };

  const selectedEvents = selectedDay
    ? eventsByDate[getDateKey(selectedDay.getDate())] || []
    : [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth} style={styles.chevron}>
          <Text style={styles.chevronText}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.timeSpan}
          onPress={() => setShowTimeSpanDropdown(!showTimeSpanDropdown)}
        >
          <Text style={styles.timeSpanText}>Time Span (drop down menu)</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextMonth} style={styles.chevron}>
          <Text style={styles.chevronText}>›</Text>
        </TouchableOpacity>
      </View>

      {showTimeSpanDropdown && (
        <View style={styles.dropdown}>
          {(['Week', 'Month', 'Year'] as const).map((span) => (
            <TouchableOpacity
              key={span}
              onPress={() => {
                setTimeSpan(span);
                setShowTimeSpanDropdown(false);
              }}
              style={styles.dropdownItem}
            >
              <Text style={styles.dropdownItemText}>{span}</Text>
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

      <View style={styles.weekRow}>
        {DAYS.map((d) => (
          <Text key={d} style={styles.weekDay}>
            {d}
          </Text>
        ))}
      </View>
      <View style={styles.grid}>
        {days.map((day, i) => {
          if (day === null) {
            return <View key={`empty-${i}`} style={styles.cell} />;
          }
          const key = getDateKey(day);
          const events = eventsByDate[key] || [];
          const isBooked = events.length > 0;
          const isSelected =
            selectedDay &&
            selectedDay.getDate() === day &&
            selectedDay.getMonth() === currentMonth.getMonth();
          return (
            <TouchableOpacity
              key={key}
              style={[styles.cell, isSelected && styles.cellSelected]}
              onPress={() =>
                setSelectedDay(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
              }
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
              <Text style={styles.dayNum}>{day}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.eventsSection}>
        <Text style={styles.eventsTitle}>
          {selectedDay
            ? `${selectedDay.getMonth() + 1}/${selectedDay.getDate()} events`
            : 'Tap a day to see events'}
        </Text>
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
    ...typography.h3,
    color: colors.text,
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
  dayNum: {
    ...typography.caption,
    color: colors.text,
    marginTop: 2,
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
