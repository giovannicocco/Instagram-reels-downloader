import { VideoInfo } from "@/types";
import { extractTikTokVideoInfo } from "./utils";

export const getTikTokVideoInfo = async (postUrl: string): Promise<VideoInfo> => {
  const videoInfo = await extractTikTokVideoInfo(postUrl);
  return videoInfo;
};
