/**
 * 视频资源 CDN 工具
 * 所有大体积 mp4 托管在七牛云，避免仓库膨胀。
 */
export const VIDEO_CDN_BASE = "http://tev59wop7.hn-bkt.clouddn.com";

export const videoUrl = (filename: string) =>
  `${VIDEO_CDN_BASE}/${filename}`;
