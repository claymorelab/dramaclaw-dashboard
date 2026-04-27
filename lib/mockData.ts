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
  duration: 10000,
  episodes: 1000,
  series: 100,
};

export function getCumulativeMock(): CumulativeData {
  return {
    duration: randInt(8000, 12000),
    episodes: randInt(800, 1200),
    series: randInt(80, 150),
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
  values: number[];
}

export const INITIAL_DAILY_MINUTES: DailyMinutesData = {
  dates: ['4.09', '4.10', '4.11', '4.12', '4.13', '4.14', '4.15'],
  values: [40, 55, 70, 50, 58, 65, 35],
};

export function getDailyMinutesMock(): DailyMinutesData {
  return {
    dates: INITIAL_DAILY_MINUTES.dates,
    values: INITIAL_DAILY_MINUTES.values.map(v => randInt(v - 10, v + 10)),
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

export const INITIAL_TOTAL_PLAY: TotalPlayData = { value: 280000 };

export function getTotalPlayMock(): TotalPlayData {
  return { value: randInt(200000, 350000) };
}

export interface PlatformPlayData {
  douyin: number;
  kuaishou: number;
  wechat: number;
}

export const INITIAL_PLATFORM_PLAY: PlatformPlayData = {
  douyin: 1000,
  kuaishou: 800,
  wechat: 600,
};

export function getPlatformPlayMock(): PlatformPlayData {
  return {
    douyin: randInt(800, 1200),
    kuaishou: randInt(600, 1000),
    wechat: randInt(400, 800),
  };
}

export interface TopDrama {
  rank: number;
  title: string;
  plays: string;
  poster?: string;
}

export function getTopDramasMock(): TopDrama[] {
  return [
    { rank: 1, title: '《给废太子借命》', plays: '10万+播放' },
    { rank: 2, title: '《嫡姐抢嫁太子》', plays: '5万+播放' },
    { rank: 3, title: '《冷宫里的残废太子》', plays: '3万+播放' },
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
