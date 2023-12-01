export const extractHeadings = (mdxContent: string): { text: string; id: string }[] => {
    const headingsRegex = /^##\s+(.+)$/gm;
    const matches: { text: string; id: string }[] = [];
    let match;
  
    while ((match = headingsRegex.exec(mdxContent)) !== null) {
      matches.push({
        text: match[1],
        id: match[1].toLowerCase().replace(/\s+/g, '-'),
      });
    }
    console.log('Extracted Headings:', matches);
    return matches;
  };