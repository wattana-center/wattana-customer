declare global {
  interface Window {
    gtag: any
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const gtagPageview = (url: string) => {
  window.gtag('config', 'G-6NZ4ZWDH9E', {
    page_path: url
  })
}
// ทำ analytics
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const gtagEvent = ({ action, category, label, value }: any) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}