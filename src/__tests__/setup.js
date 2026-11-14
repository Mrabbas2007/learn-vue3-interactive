/**
 * Global test setup.
 *
 * jsdom does not ship localStorage in every configuration and has no canvas
 * implementation at all, while the workshop uses both. These polyfills keep the
 * component tests focused on behaviour instead of environment gaps.
 */

// --- localStorage ---------------------------------------------------------
if (!('localStorage' in globalThis) || !globalThis.localStorage) {
  const store = new Map()
  const localStorageMock = {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
    key: (index) => Array.from(store.keys())[index] ?? null,
    get length() {
      return store.size
    },
  }
  Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageMock,
    writable: true,
    configurable: true,
  })
  if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
      configurable: true,
    })
  }
}

// --- matchMedia -----------------------------------------------------------
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}

// --- canvas 2D context ----------------------------------------------------
// VueParticleOrb draws on a canvas; jsdom returns null from getContext, so we
// hand back a permissive stub that supports chaining.
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = function getContext() {
    const handler = {
      get: (target, prop) => {
        if (prop === 'canvas') return { width: 300, height: 300 }
        if (prop === 'measureText') return () => ({ width: 0 })
        if (prop === 'createLinearGradient' || prop === 'createRadialGradient') {
          return () => ({ addColorStop: () => {} })
        }
        if (prop === 'getImageData') return () => ({ data: new Uint8ClampedArray(4) })
        if (prop in target) return target[prop]
        return () => {}
      },
      set: (target, prop, value) => {
        target[prop] = value
        return true
      },
    }
    return new Proxy({}, handler)
  }
}
