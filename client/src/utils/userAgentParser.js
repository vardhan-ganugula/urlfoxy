export function detectBrowserFromUserAgent(userAgent) {
  const browsers = [
    { name: 'Edge', regex: /Edg\/(\d+)/ },
    { name: 'Chrome', regex: /Chrome\/(\d+)/ },
    { name: 'Firefox', regex: /Firefox\/(\d+)/ },
    { name: 'Safari', regex: /Version\/(\d+).*Safari/ },
    { name: 'Opera', regex: /OPR\/(\d+)/ },
    { name: 'IE', regex: /MSIE (\d+)|Trident\/.*rv:(\d+)/ }
  ];

  for (const browser of browsers) {
    const match = userAgent.match(browser.regex);
    if (match) {
      return { name: browser.name, version: match[1] || match[2] };
    }
  }

  return { name: 'Unknown', version: '0' };
}