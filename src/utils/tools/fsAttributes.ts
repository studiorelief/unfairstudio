import { loadScript } from './loadScript';

const FS_ATTRIBUTES_MODULES = ['list'] as const;
const FS_ATTRIBUTES = FS_ATTRIBUTES_MODULES.map((module) => `fs-${module}` as const);
const FS_SCRIPT_SRC = 'https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js';

interface FinsweetAttributesModule {
  restart?: () => void;
  destroy?: () => void;
}

interface FinsweetAttributes {
  destroy: () => void;
  restart?: () => void;
  modules?: { [key: string]: FinsweetAttributesModule };
}

interface WindowWithFinsweet extends Window {
  FinsweetAttributes?: FinsweetAttributes;
}

export function initFsAttributes() {
  if ((window as WindowWithFinsweet).FinsweetAttributes) return;

  const alreadyLoaded = Array.from(document.querySelectorAll('script')).some(
    (script) =>
      script.src.includes('@finsweet/attributes@2/attributes.js') ||
      FS_ATTRIBUTES.some((attr) => script.hasAttribute(attr))
  );

  if (!alreadyLoaded) {
    loadScript(FS_SCRIPT_SRC, FS_ATTRIBUTES, true);
  }
}

export function destroyFsAttributes(): void {
  const { FinsweetAttributes } = window as WindowWithFinsweet;
  if (FinsweetAttributes) {
    try {
      FinsweetAttributes.destroy();
    } catch {
      // Silently fail
    }
  }
}

export function restartFsAttributes(retryCount = 0): void {
  const { FinsweetAttributes } = window as WindowWithFinsweet;

  if (!FinsweetAttributes) {
    if (retryCount < 3) {
      setTimeout(() => restartFsAttributes(retryCount + 1), 100);
    }
    return;
  }

  try {
    if (FinsweetAttributes.restart && typeof FinsweetAttributes.restart === 'function') {
      FinsweetAttributes.restart();
      return;
    }

    const { modules } = FinsweetAttributes;
    if (modules && typeof modules === 'object') {
      FS_ATTRIBUTES_MODULES.forEach((moduleName) => {
        const mod = modules[moduleName];
        if (mod?.restart && typeof mod.restart === 'function') {
          try {
            mod.restart();
          } catch {
            // Silently fail
          }
        }
      });
    }
  } catch {
    // Silently fail
  }
}
