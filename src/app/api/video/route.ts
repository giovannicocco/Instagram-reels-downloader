import { NextResponse } from "next/server";

import { HTTPError } from "@/lib/errors";
import { makeErrorResponse, makeSuccessResponse } from "@/lib/http";

import { VideoInfo } from "@/types";
import { getVideoInfo } from "@/features/instagram";
import { INSTAGRAM_CONFIGS } from "@/features/instagram/constants";
import { getPostIdFromUrl } from "@/features/instagram/utils";

function handleError(error: any) {
  if (error instanceof HTTPError) {
    const response = makeErrorResponse(error.message);
    return NextResponse.json(response, { status: error.status });
  } else {
    console.error(error);
    const response = makeErrorResponse();
    return NextResponse.json(response, { status: 500 });
  }
}

async function getTikTokVideoInfo(postUrl: string): Promise<VideoInfo> {
  // Placeholder function for fetching TikTok video information
  // Implement the actual logic to fetch TikTok video information
  return {
    filename: "tiktok-video.mp4",
    width: "720",
    height: "1280",
    videoUrl: "https://example.com/tiktok-video.mp4",
  };
}

export async function GET(request: Request) {
  if (!INSTAGRAM_CONFIGS.enableServerAPI) {
    const notImplementedResponse = makeErrorResponse("Not Implemented");
    return NextResponse.json(notImplementedResponse, { status: 501 });
  }

  const postUrl = new URL(request.url).searchParams.get("postUrl");
  if (!postUrl) {
    const badRequestResponse = makeErrorResponse("Post URL is required");
    return NextResponse.json(badRequestResponse, { status: 400 });
  }

  const postId = await getPostIdFromUrl(postUrl);
  if (!postId) {
    const noPostIdResponse = makeErrorResponse("Invalid Post URL");
    return NextResponse.json(noPostIdResponse, { status: 400 });
  }

  try {
    let postJson: VideoInfo;
    if (postUrl.includes("tiktok.com")) {
      postJson = await getTikTokVideoInfo(postUrl);
    } else {
      postJson = await getVideoInfo(postId);
    }
    const response = makeSuccessResponse<VideoInfo>(postJson);
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return handleError(error);
  }
}
