export default function detectLanguageAndRedirect() {
  // Only run on first visit (or if not already set)
  if (localStorage.getItem('lang_redirect_done')) {
    return
  }

  localStorage.setItem('lang_redirect_done', '1')

  let userLang = navigator.language || navigator.userLanguage
  userLang = userLang.toLowerCase()

  const alternateLinks = [...document.querySelectorAll('link[rel="alternate"][hreflang]')]
  const isItalian = window.location.pathname.startsWith('/it/')
  const italianPath = alternateLinks.find(link => link.hreflang === 'it')?.getAttribute('href') || '/it/'
  const englishPath = alternateLinks.find(link => link.hreflang === 'en')?.getAttribute('href') || '/'

  if (!isItalian && userLang.startsWith('it')) {
    window.location.href = italianPath
  } else if (isItalian && !userLang.startsWith('it')) {
    window.location.href = englishPath
  }
}
