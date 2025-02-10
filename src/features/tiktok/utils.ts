import { CheerioAPI } from "cheerio";
import { getTimedFilename } from "@/lib/utils";
import { VideoInfo } from "@/types";

// Function to generate a video filename
export const getTikTokVideoFileName = () =>
  getTimedFilename("tiktok-downloader", "mp4");

// Function to validate TikTok URLs
export const isValidTikTokURL = (postUrl: string) => {
  if (!postUrl) {
    return "TikTok URL was not provided";
  }

  if (!postUrl.includes("tiktok.com/")) {
    return "Invalid URL does not contain TikTok domain";
  }

  if (!postUrl.startsWith("https://")) {
    return 'Invalid URL it should start with "https://www.tiktok.com/..."';
  }

  const postRegex =
    /^https:\/\/(?:www\.)?tiktok\.com\/(@[a-zA-Z0-9._-]+\/video\/[0-9]+)\/?/;

  if (!postRegex.test(postUrl)) {
    return "URL does not match TikTok video";
  }

  return "";
};

// Function to extract TikTok video information
export const extractTikTokVideoInfo = async (postUrl: string): Promise<VideoInfo> => {
  // Placeholder function for extracting TikTok video information
  // Implement the actual logic to extract TikTok video information
  return {
    filename: "tiktok-video.mp4",
    width: "720",
    height: "1280",
    videoUrl: "https://example.com/tiktok-video.mp4",
  };
};
