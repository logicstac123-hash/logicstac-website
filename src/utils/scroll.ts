import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Global reference for ScrollSmoother instance in ESM environment
let smootherInstance: any = null;

export const registerScrollSmoother = (instance: any) => {
  smootherInstance = instance;
};

export const getScrollSmoother = () => {
  if (smootherInstance) return smootherInstance;
  try {
    if (typeof ScrollSmoother?.get === 'function') {
      const instance = ScrollSmoother.get();
      if (instance) {
        smootherInstance = instance;
        return instance;
      }
    }
  } catch {
    // ignore
  }
  return null;
};

/**
 * Robust scroll utility that works seamlessly with ScrollSmoother and provides
 * graceful fallback to native scrolling.
 */
export const scrollToSection = (target: string | HTMLElement, smooth: boolean = true) => {
  if (!target) return;

  let selector = '';
  let element: HTMLElement | null = null;

  if (typeof target === 'string') {
    selector = target.trim();

    // Map template legacy and alias targets
    if (selector === '#helmets' || selector === 'helmets') {
      selector = '#store';
    } else if (selector === '#contact' || selector === 'contact') {
      selector = '#contact-form';
    } else if (selector === '#portfolio' || selector === 'portfolio') {
      selector = document.querySelector('#portfolio') ? '#portfolio' : '#showcase';
    }

    if (!selector.startsWith('#') && !selector.startsWith('.') && !selector.startsWith('[')) {
      selector = `#${selector}`;
    }

    element = document.querySelector<HTMLElement>(selector);

    // Fallbacks if specific element not found directly
    if (!element && selector.startsWith('#')) {
      const rawId = selector.slice(1);
      if (rawId === 'helmets') {
        element = document.querySelector<HTMLElement>('#store');
      } else if (rawId === 'contact') {
        element = document.querySelector<HTMLElement>('#contact-form');
      }
    }
  } else if (target instanceof HTMLElement) {
    element = target;
  }

  const smoother = getScrollSmoother();

  if (smoother && typeof smoother.scrollTo === 'function') {
    if (element) {
      smoother.scrollTo(element, smooth);
    } else if (selector) {
      smoother.scrollTo(selector, smooth);
    }
    return;
  }

  // Fallback for native scrolling
  if (element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    window.scrollTo({
      top: rect.top + scrollTop - 70,
      behavior: smooth ? 'smooth' : 'auto',
    });
  } else if (selector) {
    try {
      const el = document.querySelector(selector);
      if (el) {
        el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
      }
    } catch {
      // ignore
    }
  }
};
