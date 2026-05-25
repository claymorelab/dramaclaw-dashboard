/**
 * Mock 数据 + 随机波动工具
 */

/** 随机整数 */
export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** 随机小数 */
export function randFloat(min: number, max: number, digits = 1) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(digits));
}

// ===== 左侧面板数据 =====

export interface CumulativeData {
  duration: number;    // 累计生成时长
  episodes: number;    // 累计生成集数
  series: number;      // 累计生成部数
}

/** SSR-safe 初始值（避免 hydration mismatch） */
export const INITIAL_CUMULATIVE: CumulativeData = {
  duration: 98760,
  episodes: 49300,
  series: 1906,
};

/** 在上一次基础上累加 1-3 随机数 */
export function tickCumulative(prev: CumulativeData): CumulativeData {
  return {
    duration: prev.duration + randInt(1, 3),
    episodes: prev.episodes + randInt(1, 3),
    series: prev.series + randInt(1, 3),
  };
}

export interface DailyEpisodesData {
  dates: string[];
  thisWeek: number[];
  lastWeek: number[];
}

export const INITIAL_DAILY_EPISODES: DailyEpisodesData = {
  dates: ['4.09', '4.10', '4.11', '4.12', '4.13', '4.14', '4.15'],
  thisWeek: [64, 50, 86, 70, 58, 136, 34],
  lastWeek: [40, 35, 55, 45, 38, 80, 22],
};

export function getDailyEpisodesMock(): DailyEpisodesData {
  return {
    dates: INITIAL_DAILY_EPISODES.dates,
    thisWeek: INITIAL_DAILY_EPISODES.thisWeek.map(v => randInt(v - 15, v + 15)),
    lastWeek: INITIAL_DAILY_EPISODES.lastWeek.map(v => randInt(v - 8, v + 8)),
  };
}

export interface DailyMinutesData {
  dates: string[];
  thisWeek: number[];
  lastWeek: number[];
}

export const INITIAL_DAILY_MINUTES: DailyMinutesData = {
  dates: ['4.09', '4.10', '4.11', '4.12', '4.13', '4.14', '4.15'],
  thisWeek: [40, 55, 70, 50, 58, 65, 35],
  lastWeek: [25, 38, 52, 35, 42, 48, 22],
};

/**
 * 生成以「今天」结尾的最近 7 天日期标签（格式 'M.DD'）
 * 最右边一项对应今天。
 */
export function getWeekDates(today: Date = new Date()): string[] {
  const dates: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(`${d.getMonth() + 1}.${String(d.getDate()).padStart(2, '0')}`);
  }
  return dates;
}

export function getDailyMinutesMock(): DailyMinutesData {
  const thisWeek = INITIAL_DAILY_MINUTES.thisWeek.map(v => randInt(v - 10, v + 10));
  // 上周值始终低于本周对应值（差额 5-15 之间）
  const lastWeek = thisWeek.map(v => Math.max(0, v - randInt(5, 15)));
  return {
    dates: INITIAL_DAILY_MINUTES.dates,
    thisWeek,
    lastWeek,
  };
}

export interface ComputeCostData {
  dramaClawCost: number;   // DramaClaw 元/分钟
  otherPlatformCost: number; // 其余平台 元/分钟
  tokens: number;            // 累计调用 Tokens（亿）
}

export const INITIAL_COMPUTE_COST: ComputeCostData = {
  dramaClawCost: 20,
  otherPlatformCost: 35,
  tokens: 1500,
};



// 数字产能概览
export interface CumulativeNumberData {
  images: number;
  videos: number;
  dramas: number;
}
export const INITIAL_CUMULATIVE_NUMBER: CumulativeNumberData = {
  images: 6400,
  videos: 300,
  dramas: 2000,
};

/** 在上一次基础上累加 1-3 随机数 */
export function tickCumulativeNumber(
  prev: CumulativeNumberData,
): CumulativeNumberData {
  return {
    images: prev.images + randInt(1, 3),
    videos: prev.videos + randInt(1, 3),
    dramas: prev.dramas + randInt(1, 3),
  };
}

export function getComputeCostMock(): ComputeCostData {
  return {
    dramaClawCost: randFloat(15, 25),
    otherPlatformCost: randFloat(28, 42),
    tokens: randFloat(1200, 1800),
  };
}

// ===== 右侧面板数据 =====

export interface TotalPlayData {
  value: number;
}

export const INITIAL_TOTAL_PLAY: TotalPlayData = { value: 194789429 };

export function getTotalPlayMock(): TotalPlayData {
  return INITIAL_TOTAL_PLAY;
}

export interface PlatformPlayData {
  /** 各平台占全网播放量百分比（求和 = 100） */
  douyin: number;
  kuaishou: number;
  wechat: number;
  other: number;
}

/** 抖音 > 快手 > 微信剧场 > 其余平台 */
export const INITIAL_PLATFORM_PLAY: PlatformPlayData = {
  douyin: 64,
  kuaishou: 23,
  wechat: 9,
  other: 4,
};

export function getPlatformPlayMock(): PlatformPlayData {
  return INITIAL_PLATFORM_PLAY;
}

export interface TopDrama {
  rank: number;
  title: string;
  plays: string;
  poster?: string;
  color?: string;
}

export function getTopDramasMock(): TopDrama[] {
  return [
    { rank: 1, title: '《给废太子借命》', plays: '100万+播放', color: '#FFDA92' },
    { rank: 2, title: '《嫡姐抢嫁太子》', plays: '60万+播放' , color: '#B6BFD3'},
    { rank: 3, title: '《冷宫里的残废太子》', plays: '40万+播放', color: '#BE915F' },
  ];
}

export interface RadarData {
  labels: string[];
  values: number[];
}

export function getRadarMock(): RadarData {
  return {
    labels: ['抖音', '快手', '微信', 'B站', '小红书'],
    values: [90, 75, 60, 45, 30].map(v => randInt(v - 10, v + 10)),
  };
}

// ===== 中间区域数据 =====

export interface NoticeItem {
  text: string;
}

export const NOTICES: NoticeItem[] = [
  { text: '用户雪山雄鹰，完成项目《重生回到90年代》第2集创作' },
  { text: '用户北极光，完成项目《逆袭从离婚开始》第5集创作' },
  { text: '用户星火燎原，完成项目《豪门弃少》第1集创作' },
  { text: '用户云中鹤，完成项目《医妃难囚》第3集创作' },
];
