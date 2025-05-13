
export function stripHtmlTags(html: string): string {
  // Create a DOM parser
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

export function generateExcerpt(content: string, maxLength = 150): string {
  const strippedText = stripHtmlTags(content);
  if (strippedText.length <= maxLength) {
    return strippedText;
  }
  
  // Find the last space before maxLength to avoid cutting words
  const lastSpace = strippedText.substring(0, maxLength).lastIndexOf(' ');
  return strippedText.substring(0, lastSpace) + '...';
}
