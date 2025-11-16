"use server";

export async function shareArticle(
  platform: "linkedin" | "twitter" | "facebook",
  url: string,
  title: string,
): Promise<string> {
  let shareUrl = "";

  switch (platform) {
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      break;
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
      break;
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      break;
  }

  return shareUrl;
}
