export const generateShareUrls = (url: string, title: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
  
    return {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      // Note: Instagram doesn't support direct sharing from web, so we'll just open their website
      instagram: 'https://www.instagram.com/'
    };
  };