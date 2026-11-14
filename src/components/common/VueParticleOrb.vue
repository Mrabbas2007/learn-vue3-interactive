<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ============================================================================
// Unified 3D volumetric particle orb (~4800 ultra-fine micro-particles).
//
// Two layers rotate together in one coordinate space:
//
//   1. Outer translucent sphere shell (~2600 particles) - hollow glass-like
//      boundary with Fresnel/rim shading.
//   2. Inner 3D Vue.js logo core (~2200 particles) - emerald outer V and
//      deep slate inner V with real Z thickness.
//
// The logo core diffuses into a soft nebula-like cloud at idle
// (focusFactor = 0) and snaps into crisp focus when hovered or dragged
// (focusFactor = 1).
// ============================================================================

const containerRef = ref(null)
const canvasRef = ref(null)

// Fired on pointerdown so the parent can dismiss its "drag me" hint.
const emit = defineEmits(['interact'])

// --------------------------------------------------------------------------
// Counts (~4800 total micro-particles)
// --------------------------------------------------------------------------
const SHELL_SURFACE = 2350 // translucent sphere shell (rim-shaded)
const AMBIENT_DUST = 250 // faint dust drifting just outside the sphere
const LOGO_OUTER = 1150 // outer V chevron (emerald green)
const LOGO_INNER = 1050 // inner V chevron (deep slate)
const TOTAL = SHELL_SURFACE + AMBIENT_DUST + LOGO_OUTER + LOGO_INNER

// --------------------------------------------------------------------------
// Geometry & physics constants
// --------------------------------------------------------------------------
const SPHERE_RADIUS = 142
const FOV = 700
const LOGO_K = 0.68 // logo scale (~58% of sphere diameter)
const LOGO_Z_DEPTH = 20 // Z extrusion thickness of the logo slab

const IDLE_RATE_Y = 0.15 // ambient Y auto-rotation (rad/s) when at rest
const DAMPING = 0.95 // per-frame angular-velocity retention (momentum)
const DRAG_SENS = 0.0015 // drag sensitivity (radians per pixel)
const HOVER_TILT_MAX = 0.14 // max cursor parallax tilt (~8 degrees), radians
const HOVER_TILT_RATE = 2.0 // hover-tilt spring rate (per second)
const DT_CLAMP = 0.05 // max frame delta in seconds (50ms) for stable physics

// Logo dispersion / focus
const SCATTER_IDLE_RADIUS = 58 // idle radial spread (~45-65px spherical cloud)
const SCATTER_FOCUS_RADIUS = 0 // focused: exact logo coordinates (zero scatter)
const FOCUS_RATE = 3.0 // per-second ease; ~0.05 per frame at 60fps
const DRIFT_AMP = 2.6 // idle floating drift amplitude (px)

// Auto showcase: periodically gather the dispersed cloud back into the crisp
// Vue logo so visitors see it without needing to hover first.
const SHOWCASE_FIRST_WAIT = 1.2 // seconds after mount before the first reveal
const SHOWCASE_WAIT = 6.5 // idle seconds between reveals
const SHOWCASE_HOLD = 3.2 // seconds the crisp logo stays formed

// --------------------------------------------------------------------------
// Brand palette
// --------------------------------------------------------------------------
const COLOR_GREEN = '#10B981' // outer V (emerald)
const COLOR_SLATE = '#1E293B' // inner V (deep slate)
const COLOR_SHELL_A = '#64748B' // shell base (slate)
const COLOR_SHELL_B = '#10B981' // shell rim tint (emerald)

// --------------------------------------------------------------------------
// Per-particle typed arrays
//   [0 .. SHELL_SURFACE)        : shell surface
//   [SHELL_SURFACE .. SHELL_COUNT): ambient dust
//   [SHELL_COUNT .. TOTAL)      : logo core (outer then inner)
// --------------------------------------------------------------------------
const pType = new Uint8Array(TOTAL) // 0 shell, 1 dust, 2 logo outer, 3 logo inner
const baseX = new Float32Array(TOTAL)
const baseY = new Float32Array(TOTAL)
const baseZ = new Float32Array(TOTAL)
const radius = new Float32Array(TOTAL)
const pMix = new Float32Array(TOTAL) // shell tint factor / logo brightness
const pPhase = new Float32Array(TOTAL) // per-particle phase for drift/breathe
const pSpeed = new Float32Array(TOTAL) // per-particle drift speed
// Precomputed fill styles: building 4800 rgb() strings per frame is a large
// GC/CPU cost, so each particle's color string is composed exactly once.
const colorStr = Array.from({ length: TOTAL })

// Logo scatter offset (only meaningful for logo indices)
const scatterDX = new Float32Array(TOTAL) // unit scatter direction X
const scatterDY = new Float32Array(TOTAL) // unit scatter direction Y
const scatterDZ = new Float32Array(TOTAL) // unit scatter direction Z
const scatterMag = new Float32Array(TOTAL) // 0..1 magnitude (Gaussian-like, near 0)

// Shared render state
let animationId = null
let lastTime = 0
let width = 0
let height = 0
let ctx = null

// Assembly rotation (applied to both shell and logo together)
let rotY = 0
let rotX = 0
let velY = 0 // angular momentum, rad/s (Y)
let velX = 0 // angular momentum, rad/s (X)

// Drag tracking
let isDragging = false
let lastClientX = 0
let lastClientY = 0

// Focus (logo dispersion) + hover parallax
let isHovered = false
let focusFactor = 0 // 0 = fully dispersed idle cloud, 1 = crisp logo
let targetFocusFactor = 0

let hoverTiltY = 0
let hoverTiltX = 0
let targetHoverTiltY = 0
let targetHoverTiltX = 0

// Auto-showcase state machine (idle -> gather -> hold -> release).
const PHASE_WAIT = 0
const PHASE_GATHER = 1
const PHASE_HOLD = 2
const PHASE_RELEASE = 3
let showcasePhase = PHASE_WAIT
let showcaseClock = 0
let showcaseDoneOnce = false

// Visibility & motion preferences.
let inView = true // hero scrolled out of view => pause the render loop
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true

let introFade = 0 // 0 -> 1 over the first second (soft entrance)

// Drag velocity bookkeeping (pointermove rate differs per display refresh).
let lastMoveTime = 0
const MAX_FLING = 7 // rad/s ceiling for release momentum

// Projected particles (reused each frame to avoid allocation)
const projX = new Float32Array(TOTAL)
const projY = new Float32Array(TOTAL)
const projAlpha = new Float32Array(TOTAL)
const projDepth = new Float32Array(TOTAL)
const projSize = new Float32Array(TOTAL)

// Draw order indices for painter's algorithm (native O(n log n) sort).
const drawOrder = new Uint16Array(TOTAL)

// ============================================================================
// Helpers
// ============================================================================

// Clamp a value to ±max (keeps fling momentum sane).
function clamp(v, max) {
  return v > max ? max : v < -max ? -max : v
}

// Point-in-polygon (crossing number), logo-local coordinates.
function insidePolygon(px, py, pts) {
  let inside = false
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const xi = pts[i].x
    const yi = pts[i].y
    const xj = pts[j].x
    const yj = pts[j].y
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside
    }
  }
  return inside
}

// Vue.js chevron outlines (logo-local space, 0..240 x 0..208).
const OUTER_V = [
  { x: 0, y: 0 },
  { x: 68, y: 0 },
  { x: 120, y: 90 },
  { x: 172, y: 0 },
  { x: 240, y: 0 },
  { x: 120, y: 208 },
]

const INNER_V = [
  { x: 68, y: 0 },
  { x: 120, y: 90 },
  { x: 172, y: 0 },
  { x: 143.8, y: 0 },
  { x: 120, y: 41.3 },
  { x: 96.2, y: 0 },
]

function isOuterChevron(x, y) {
  return insidePolygon(x, y, OUTER_V) && !insidePolygon(x, y, INNER_V)
}

function isInnerChevron(x, y) {
  return insidePolygon(x, y, INNER_V)
}

function toLogoSpace(lx, ly) {
  return { x: (lx - 120) * LOGO_K, y: (ly - 104) * LOGO_K }
}

// Hex -> [r,g,b]
const colorCache = new Map()
function parseColor(hex) {
  const cached = colorCache.get(hex)
  if (cached) return cached
  const v = hex.replace('#', '')
  const rgb = [
    parseInt(v.substring(0, 2), 16),
    parseInt(v.substring(2, 4), 16),
    parseInt(v.substring(4, 6), 16),
  ]
  colorCache.set(hex, rgb)
  return rgb
}

const C_GREEN = parseColor(COLOR_GREEN)
const C_SLATE = parseColor(COLOR_SLATE)
const C_SHELL_A = parseColor(COLOR_SHELL_A)
const C_SHELL_B = parseColor(COLOR_SHELL_B)

// ============================================================================
// Geometry builders
// ============================================================================

// Outer shell: Fibonacci sphere with ±3% radial scatter.
function buildShell() {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  let i = 0

  // Shell surface particles.
  for (; i < SHELL_SURFACE; i++) {
    const y = 1 - (i / (SHELL_SURFACE - 1)) * 2
    const ringRadius = Math.sqrt(1 - y * y)
    const theta = goldenAngle * i
    const scatter = 1 + (Math.random() - 0.5) * 0.06 // ±3%

    baseX[i] = Math.cos(theta) * ringRadius * SPHERE_RADIUS * scatter
    baseY[i] = y * SPHERE_RADIUS * scatter
    baseZ[i] = Math.sin(theta) * ringRadius * SPHERE_RADIUS * scatter

    pType[i] = 0
    radius[i] = 0.6 + Math.random() * 0.6 // 0.6 .. 1.2 px
    pMix[i] = Math.random() // shell tint mix (slate <-> emerald)
    pPhase[i] = Math.random() * Math.PI * 2
    pSpeed[i] = 0.4 + Math.random() * 0.8

    // Muted shell base color (slate <-> emerald blend), low contrast.
    const m = pMix[i]
    const r = C_SHELL_A[0] + (C_SHELL_B[0] - C_SHELL_A[0]) * m
    const g = C_SHELL_A[1] + (C_SHELL_B[1] - C_SHELL_A[1]) * m
    const b = C_SHELL_A[2] + (C_SHELL_B[2] - C_SHELL_A[2]) * m
    colorStr[i] = `rgb(${r | 0},${g | 0},${b | 0})`
  }

  // Ambient dust: faint particles drifting just outside the sphere radius.
  for (; i < SHELL_SURFACE + AMBIENT_DUST; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(1 - Math.random() * 2)
    const r = SPHERE_RADIUS * (1.0 + 0.04 + Math.random() * 0.1) // just outside

    baseX[i] = Math.sin(phi) * Math.cos(theta) * r
    baseY[i] = Math.cos(phi) * r
    baseZ[i] = Math.sin(phi) * Math.sin(theta) * r

    pType[i] = 1
    radius[i] = 0.5 + Math.random() * 0.4
    pMix[i] = Math.random()
    pPhase[i] = Math.random() * Math.PI * 2
    pSpeed[i] = 0.2 + Math.random() * 0.5
    colorStr[i] = `rgb(${C_SHELL_A[0]},${C_SHELL_A[1]},${C_SHELL_A[2]})`
  }
}

// Inner logo core: sampled 3D points inside the two chevrons with real Z depth.
// Each logo particle also gets a random 3D scatter offset (Gaussian-like
// magnitude) so it can disperse into a nebula-like cloud at idle.
function buildLogo() {
  const offset = SHELL_SURFACE + AMBIENT_DUST

  // Collect filled samples for each chevron.
  const outerSamples = []
  const innerSamples = []
  const step = 2.0
  const maxX = 240
  const maxY = 208

  for (let y = 0; y <= maxY; y += step) {
    for (let x = 0; x <= maxX; x += step) {
      if (isOuterChevron(x, y)) {
        outerSamples.push({ x, y })
      } else if (isInnerChevron(x, y)) {
        innerSamples.push({ x, y })
      }
    }
  }

  // Shuffle so assignment isn't in scan order.
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const t = arr[i]
      arr[i] = arr[j]
      arr[j] = t
    }
  }
  shuffle(outerSamples)
  shuffle(innerSamples)

  let i = offset
  let oi = 0
  let ii = 0

  // Outer V -> emerald green.
  for (; oi < LOGO_OUTER && i < TOTAL; oi++, i++) {
    const s = outerSamples[oi % outerSamples.length]
    const p = toLogoSpace(s.x, s.y)
    const jx = (Math.random() - 0.5) * 1.5
    const jy = (Math.random() - 0.5) * 1.5
    const z = (Math.random() - 0.5) * LOGO_Z_DEPTH

    baseX[i] = p.x + jx
    baseY[i] = p.y + jy
    baseZ[i] = z
    pType[i] = 2
    radius[i] = 1.0 + Math.random() * 0.5 // 1.0-1.5 px crisp focused dot
    pMix[i] = 0.75 + Math.random() * 0.25 // brightness
    pPhase[i] = Math.random() * Math.PI * 2
    pSpeed[i] = 0.3 + Math.random() * 0.5
    colorStr[i] = `rgb(${C_GREEN[0]},${C_GREEN[1]},${C_GREEN[2]})`

    // Random 3D scatter direction (unit vector on a sphere).
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(1 - Math.random() * 2)
    scatterDX[i] = Math.sin(phi) * Math.cos(theta)
    scatterDY[i] = Math.cos(phi)
    scatterDZ[i] = Math.sin(phi) * Math.sin(theta)
    // Gaussian-like magnitude concentrated near 0 (most stay near the core).
    scatterMag[i] = Math.random() * Math.random()
  }

  // Inner V -> deep slate.
  for (; ii < LOGO_INNER && i < TOTAL; ii++, i++) {
    const s = innerSamples[ii % innerSamples.length]
    const p = toLogoSpace(s.x, s.y)
    const jx = (Math.random() - 0.5) * 1.5
    const jy = (Math.random() - 0.5) * 1.5
    const z = (Math.random() - 0.5) * LOGO_Z_DEPTH

    baseX[i] = p.x + jx
    baseY[i] = p.y + jy
    baseZ[i] = z
    pType[i] = 3
    radius[i] = 1.0 + Math.random() * 0.5 // 1.0-1.5 px crisp focused dot
    pMix[i] = 0.75 + Math.random() * 0.25
    pPhase[i] = Math.random() * Math.PI * 2
    pSpeed[i] = 0.3 + Math.random() * 0.5
    colorStr[i] = `rgb(${C_SLATE[0]},${C_SLATE[1]},${C_SLATE[2]})`

    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(1 - Math.random() * 2)
    scatterDX[i] = Math.sin(phi) * Math.cos(theta)
    scatterDY[i] = Math.cos(phi)
    scatterDZ[i] = Math.sin(phi) * Math.sin(theta)
    scatterMag[i] = Math.random() * Math.random()
  }
}

// ============================================================================
// Depth order via index sort (native O(n log n); far particles drawn first)
// ============================================================================
function buildDrawOrder(count) {
  for (let i = 0; i < count; i++) drawOrder[i] = i
  drawOrder.subarray(0, count).sort((a, b) => projDepth[b] - projDepth[a])
}

// ============================================================================
// Animation loop
// ============================================================================
function render(now) {
  if (!ctx) return
  // Hero scrolled out of view: stop burning CPU/battery; the IntersectionObserver
  // restarts the loop (with a clean clock) once the orb becomes visible again.
  if (!inView) {
    animationId = null
    return
  }
  if (!lastTime) lastTime = now
  let dtSec = Math.min(now - lastTime, DT_CLAMP * 1000) / 1000
  // Guard against NaN / Infinity / non-positive delta so hover transitions stay stable.
  if (!Number.isFinite(dtSec) || dtSec <= 0) dtSec = 0.016
  lastTime = now
  if (introFade < 1) introFade = Math.min(1, introFade + dtSec / 0.9)

  const w = width
  const h = height
  const cx = w / 2
  const cy = h / 2

  ctx.clearRect(0, 0, w, h)

  // --- Assemble rotation: momentum + ambient drift -------------------------
  rotY += velY * dtSec
  rotX += velX * dtSec
  const damp = Math.pow(DAMPING, dtSec * 60)
  velY *= damp
  velX *= damp

  // Slow hypnotic ambient Y drift when the orb is at rest (not being dragged).
  // Disabled entirely for users who prefer reduced motion.
  if (!prefersReducedMotion && !isDragging && Math.abs(velY) < 0.0005 && Math.abs(velX) < 0.0005) {
    rotY += IDLE_RATE_Y * dtSec
  }

  // Focus (dispersion) ease: dt-normalized, ~0.05 per frame at 60fps.
  const focusEase = 1 - Math.exp(-FOCUS_RATE * dtSec)
  focusFactor += (targetFocusFactor - focusFactor) * focusEase
  focusFactor = Math.max(0, Math.min(1, focusFactor))
  // Smoothstep cubic curve (t*t*(3-2*t)) for an accelerating gather-and-lock.
  const focusCurve = focusFactor * focusFactor * (3 - 2 * focusFactor)
  const disperse = 1 - focusCurve

  // Idle auto-showcase: periodically crystallize the logo so visitors see the
  // Vue mark without needing to hover. Paused while interacting, off-screen,
  // or when the user prefers reduced motion (which stays focused permanently).
  if (!prefersReducedMotion && !isHovered && !isDragging && inView) {
    showcaseClock += dtSec
    if (showcasePhase === PHASE_WAIT) {
      const wait = showcaseDoneOnce ? SHOWCASE_WAIT : SHOWCASE_FIRST_WAIT
      if (showcaseClock >= wait) {
        showcasePhase = PHASE_GATHER
        showcaseClock = 0
      }
    } else if (showcasePhase === PHASE_GATHER) {
      targetFocusFactor = 1
      if (focusFactor > 0.985) {
        showcasePhase = PHASE_HOLD
        showcaseClock = 0
      }
    } else if (showcasePhase === PHASE_HOLD) {
      targetFocusFactor = 1
      if (showcaseClock >= SHOWCASE_HOLD) {
        showcasePhase = PHASE_RELEASE
        showcaseClock = 0
      }
    } else {
      targetFocusFactor = 0
      if (focusFactor < 0.015) {
        showcasePhase = PHASE_WAIT
        showcaseClock = 0
        showcaseDoneOnce = true
      }
    }
  }

  // Effective logo scatter radius: wide idle nebula -> exact logo geometry.
  const effScatterRadius = SCATTER_IDLE_RADIUS * disperse + SCATTER_FOCUS_RADIUS * focusCurve

  // Hover parallax tilt spring (dt-normalized), capped to ±HOVER_TILT_MAX.
  const tiltEase = 1 - Math.exp(-HOVER_TILT_RATE * dtSec)
  hoverTiltY += (targetHoverTiltY - hoverTiltY) * tiltEase
  hoverTiltX += (targetHoverTiltX - hoverTiltX) * tiltEase

  // Combined rotation matrices: main assembly + subtle hover tilt.
  const cY = Math.cos(rotY)
  const sY = Math.sin(rotY)
  const cX = Math.cos(rotX)
  const sX = Math.sin(rotX)
  const tCY = Math.cos(hoverTiltY)
  const tSY = Math.sin(hoverTiltY)
  const tCX = Math.cos(hoverTiltX)
  const tSX = Math.sin(hoverTiltX)

  const hoverIntensity = isHovered && !isDragging && !prefersReducedMotion ? 1 : 0

  let count = 0

  for (let i = 0; i < TOTAL; i++) {
    // --- Start from rest position ------------------------------------------
    let x = baseX[i]
    let y = baseY[i]
    let z = baseZ[i]

    // Logo particles: apply 3D scatter offset (rotates with the assembly).
    if (pType[i] >= 2) {
      x += scatterDX[i] * scatterMag[i] * effScatterRadius
      y += scatterDY[i] * scatterMag[i] * effScatterRadius
      z += scatterDZ[i] * scatterMag[i] * effScatterRadius

      // Gentle low-frequency 3D floating drift while dispersed (idle).
      if (disperse > 0.01) {
        const ph = pPhase[i] + now * 0.001 * pSpeed[i]
        x += Math.sin(ph) * DRIFT_AMP * disperse
        y += Math.cos(ph * 1.1) * DRIFT_AMP * disperse
        z += Math.sin(ph * 0.7) * DRIFT_AMP * disperse
      }
    }

    // --- Rotate by the main assembly rotation ------------------------------
    const x1 = x * cY - z * sY
    let z1 = z * cY + x * sY
    const y2 = y * cX - z1 * sX
    z1 = z1 * cX + y * sX

    // Apply hover tilt as an additional subtle rotation (parallax).
    let x2 = x1 * tCY - z1 * tSY
    let z2 = z1 * tCY + x1 * tSY
    let y3 = y2 * tCX - z2 * tSX
    z2 = z2 * tCX + y2 * tSX

    // Light micro-breathe on shell surface particles while hovered.
    if (hoverIntensity && pType[i] === 0) {
      const ph = pPhase[i] + now * 0.0015 * pSpeed[i]
      x2 += Math.sin(ph) * 0.9
      y3 += Math.cos(ph * 1.1) * 0.9
    }

    // --- Perspective projection -------------------------------------------
    const denom = FOV + z2
    if (!Number.isFinite(denom) || denom <= 10) continue
    const scale = FOV / denom
    const px = x2 * scale + cx
    const py = y3 * scale + cy
    let pr = radius[i] * scale
    if (!Number.isFinite(px) || !Number.isFinite(py) || !Number.isFinite(pr) || pr <= 0) {
      continue
    }

    // --- Alpha / color by type --------------------------------------------
    let alpha

    if (pType[i] === 0 || pType[i] === 1) {
      // Shell / dust: Fresnel rim shading.
      // normal ≈ (x2, y3, z2) / radius; camera looks down -Z.
      // fresnel = 1 - |normal·view| = 1 - |z2|/R  (rim=1, poles=0)
      const rMag = Math.sqrt(x2 * x2 + y3 * y3 + z2 * z2) || SPHERE_RADIUS
      const fresnel = 1 - Math.abs(z2) / rMag

      if (pType[i] === 0) {
        // Shell surface: rim crisp (0.65-0.9), center faint (0.04-0.12).
        alpha = 0.04 + fresnel * 0.86
      } else {
        // Ambient dust: always very faint, slight depth tint.
        alpha = 0.03 + fresnel * 0.05
      }
      alpha *= pMix[i] * 0.6 + 0.4 // subtle per-particle variation
      // Step the translucent shell back while the logo crystallizes in focus.
      alpha *= 1 - 0.4 * focusCurve
    } else {
      // Logo core: atmospheric blending.
      // Core particles (scatterMag -> 0) are brightest (~0.95), halo edge
      // fades to ~0.35. Idle is soft and faint; focus snaps to ~0.95.
      const coreAlpha = 0.38 + 0.57 * focusCurve // 0.38 idle -> 0.95 focused
      const haloFalloff = 1 - scatterMag[i] * 0.6 // 1.0 at core -> 0.4 at halo edge
      alpha = coreAlpha * haloFalloff
      // Depth shading: brighter/sharper when closer to camera.
      const depthNorm = (z2 + 40) / 80 // ~0 (far) .. 1 (near)
      const depthBright = 0.5 + 0.5 * depthNorm
      alpha *= depthBright
      // Size falloff: core size -> 0.6px for far halo particles.
      pr = (radius[i] - scatterMag[i] * (radius[i] - 0.6)) * scale
    }

    // Guard against NaN, then clamp into [0.02, 1.0]. The low floor keeps the
    // designed Fresnel falloff intact (dust is meant to sit near 0.03) instead
    // of lifting every faint dot to a uniform haze.
    if (!Number.isFinite(alpha)) continue
    alpha = alpha < 0.02 ? 0.02 : alpha > 1 ? 1 : alpha
    if (pr < 0.15) continue
    // Soft entrance: fade the whole assembly in over the first second.
    if (introFade < 1) {
      alpha *= introFade
      if (alpha < 0.01) continue
    }

    projX[count] = px
    projY[count] = py
    projAlpha[count] = alpha
    projDepth[count] = z2
    projSize[count] = pr
    count++
  }

  // Painter's algorithm: far particles first.
  buildDrawOrder(count)

  for (let i = 0; i < count; i++) {
    const idx = drawOrder[i]
    const alpha = projAlpha[idx]
    const pr = projSize[idx]
    const px = projX[idx]
    const py = projY[idx]

    ctx.globalAlpha = alpha
    ctx.fillStyle = colorStr[idx]
    if (pr <= 1.2) {
      // Sub-pixel dots: a square is visually identical to a circle here and
      // fillRect avoids ~40% of the path setup/rasterization cost.
      ctx.fillRect(px - pr, py - pr, pr + pr, pr + pr)
    } else {
      ctx.beginPath()
      ctx.arc(px, py, pr, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  ctx.globalAlpha = 1

  animationId = requestAnimationFrame(render)
}

// ============================================================================
// Pointer interaction (drag-to-rotate + hover focus/parallax)
// ============================================================================
function handlePointerDown(e) {
  const el = containerRef.value
  if (!el) return
  isDragging = true
  lastClientX = e.clientX
  lastClientY = e.clientY
  lastMoveTime = performance.now()
  velY = 0
  velX = 0
  showcasePhase = PHASE_WAIT
  showcaseClock = 0
  emit('interact')
  // Keep receiving moves even if the pointer leaves the orb mid-drag.
  el.setPointerCapture?.(e.pointerId)
}

function handlePointerMove(e) {
  const el = containerRef.value
  if (!el) return

  if (isDragging) {
    // Direct drag rotation + capture angular momentum for after release.
    // Velocity is computed from the real event timestamp, so the fling speed
    // is identical on 60Hz and 120Hz+ displays.
    const nowMs = e.timeStamp || performance.now()
    const dtMs = Math.max(nowMs - lastMoveTime, 1)
    const dy = (e.clientX - lastClientX) * DRAG_SENS
    const dx = (e.clientY - lastClientY) * DRAG_SENS
    rotY += dy
    rotX += dx
    velY = clamp((dy / dtMs) * 1000, MAX_FLING)
    velX = clamp((dx / dtMs) * 1000, MAX_FLING)
    lastClientX = e.clientX
    lastClientY = e.clientY
    lastMoveTime = nowMs
    return
  }

  // Hover: magnetic parallax tilt toward cursor (±8 deg max).
  const rect = el.getBoundingClientRect()
  const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1 // -1 .. 1
  const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
  targetHoverTiltY = nx * HOVER_TILT_MAX
  targetHoverTiltX = -ny * HOVER_TILT_MAX * 0.8
}

function handlePointerUp(e) {
  isDragging = false
  containerRef.value?.releasePointerCapture?.(e.pointerId)
}

// System-interrupted drags (incoming call, gesture nav, ...) must also release.
function handlePointerCancel(e) {
  isDragging = false
  containerRef.value?.releasePointerCapture?.(e.pointerId)
}

function handlePointerEnter() {
  isHovered = true
  targetFocusFactor = 1 // snap logo into crisp focus on hover
}

function handlePointerLeave() {
  isDragging = false
  isHovered = false
  targetFocusFactor = 0 // diffuse back into a soft cloud on leave
  targetHoverTiltY = 0
  targetHoverTiltX = 0
}

// ============================================================================
// Canvas sizing (devicePixelRatio scaling for crisp retina rendering)
// ============================================================================
function resize() {
  const canvas = canvasRef.value
  const el = containerRef.value
  if (!canvas || !el) return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const rect = el.getBoundingClientRect()
  width = rect.width
  height = rect.height

  canvas.width = Math.round(width * dpr)
  canvas.height = Math.round(height * dpr)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

let resizeObserver = null
let viewObserver = null

onMounted(() => {
  resize()
  buildShell()
  buildLogo()

  // Reduced motion: keep the logo crisp and static (no drift, no showcase).
  if (prefersReducedMotion) targetFocusFactor = 1

  if (window.ResizeObserver) {
    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(containerRef.value)
  } else {
    window.addEventListener('resize', resize)
  }

  // Pause the whole render loop while the hero is scrolled out of view.
  if (window.IntersectionObserver) {
    viewObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((en) => en.isIntersecting)
        if (visible && !inView) {
          inView = true
          lastTime = 0 // reset the clock so the first resumed dt is clean
          if (!animationId) animationId = requestAnimationFrame(render)
        } else if (!visible && inView) {
          inView = false
        }
      },
      { threshold: 0.05 },
    )
    viewObserver.observe(containerRef.value)
  }

  animationId = requestAnimationFrame(render)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  animationId = null
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  } else {
    window.removeEventListener('resize', resize)
  }
  if (viewObserver) {
    viewObserver.disconnect()
    viewObserver = null
  }
})
</script>

<template>
  <div
    ref="containerRef"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerUp"
    @pointercancel="handlePointerCancel"
    @pointerleave="handlePointerLeave"
    @pointerenter="handlePointerEnter"
    class="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] select-none [touch-action:pan-y]"
    :class="isDragging ? 'cursor-grabbing' : 'cursor-grab'"
    role="img"
    aria-label="گوی سه‌بعدی ذره‌ای Vue.js — با کشیدن ماوس، گوی را بچرخانید"
  >
    <canvas ref="canvasRef" class="absolute inset-0 block"></canvas>
  </div>
</template>
