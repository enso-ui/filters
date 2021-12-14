const Intervals = {
    today: 'today',
    thisWeek: 'thisWeek',
    thisMonth: 'thisMonth',
    thisYear: 'thisYear',
    yesterday: 'yesterday',
    lastWeek: 'lastWeek',
    lastMonth: 'lastMonth',
    lastYear: 'lastYear',
    tomorrow: 'tomorrow',
    nextWeek: 'nextWeek',
    nextMonth: 'nextMonth',
    nextYear: 'nextYear',
    custom: 'custom',
    all: 'all',
};

const Base = [
    Intervals.today, Intervals.thisWeek, Intervals.thisMonth,
    Intervals.thisYear, Intervals.all, Intervals.custom,
];

const Past = [Intervals.yesterday, Intervals.lastWeek, Intervals.lastMonth, Intervals.lastYear];
const Future = [Intervals.tomorrow, Intervals.nextWeek, Intervals.nextMonth, Intervals.nextYear];

const Adjustments = {
    [Intervals.today]: 0,
    [Intervals.yesterday]: -1,
    [Intervals.tomorrow]: 1,
    [Intervals.thisWeek]: 0,
    [Intervals.lastWeek]: -1,
    [Intervals.nextWeek]: 1,
    [Intervals.thisMonth]: 0,
    [Intervals.lastMonth]: -1,
    [Intervals.nextMonth]: 1,
    [Intervals.thisYear]: 0,
    [Intervals.lastYear]: -1,
    [Intervals.nextYear]: 1,
};

export {
    Intervals, Base, Past, Future, Adjustments,
};
