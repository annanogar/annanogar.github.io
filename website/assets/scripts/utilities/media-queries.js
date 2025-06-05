export const computedStyle = getComputedStyle(document.documentElement)

export const MOBILE = parseInt(computedStyle.getPropertyValue('--breakpoint-mobile'), 10)
export const PORTRAIT = parseInt(computedStyle.getPropertyValue('--breakpoint-portrait'), 10)
export const LANDSCAPE = parseInt(computedStyle.getPropertyValue('--breakpoint-landscape'), 10)
export const NOTEBOOK = parseInt(computedStyle.getPropertyValue('--breakpoint-notebook'), 10)
export const DESKTOP = parseInt(computedStyle.getPropertyValue('--breakpoint-desktop'), 10)
export const DESKTOP_LARGE = parseInt(computedStyle.getPropertyValue('--breakpoint-desktop-large'), 10)

export const isMobile = () => window.matchMedia(`(max-width: ${PORTRAIT - 1}px))`).matches
export const isPortrait = () => window.matchMedia(`(min-width: ${PORTRAIT}px)`).matches
export const isLandscape = () => window.matchMedia(`(min-width: ${LANDSCAPE}px)`).matches
export const isNotebook = () => window.matchMedia(`(min-width: ${NOTEBOOK}px)`).matches
export const isDesktop = () => window.matchMedia(`(min-width: ${DESKTOP}px)`).matches
export const isDesktopLarge = () => window.matchMedia(`(min-width: ${DESKTOP_LARGE}px)`).matches

export const isMobileOnly = () => window.matchMedia(`(min-width: ${MOBILE}px) and (max-width: ${PORTRAIT - 1})`).matches
export const isPortraitOnly = () => window.matchMedia(`(min-width: ${PORTRAIT}px) and (max-width: ${LANDSCAPE - 1})`).matches
export const isLandscapeOnly = () => window.matchMedia(`(min-width: ${LANDSCAPE}px) and (max-width: ${NOTEBOOK - 1})`).matches
export const isNotebookOnly = () => window.matchMedia(`(min-width: ${NOTEBOOK}px) and (max-width: ${DESKTOP - 1})`).matches
export const isDesktopOnly = () => window.matchMedia(`(min-width: ${DESKTOP}px) and (max-width: ${DESKTOP_LARGE - 1})`).matches

export const isAspectRatioPortrait = () => window.matchMedia(`(max-aspect-ratio: 101 / 100)`).matches
export const isAspectRatioLandscape = () => window.matchMedia(`(min-aspect-ratio: 101 / 100)`).matches

export const supportsHover = () => window.matchMedia(`(hover: hover)`).matches
export const prefersReducedMotion = () => window.matchMedia(`(prefers-reduced-motion: reduce)`).matches

export const isPrintMedia = () => window.matchMedia(`print`).matches
export const isScreenMedia = () => window.matchMedia(`screen`).matches
