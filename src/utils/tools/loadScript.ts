const loadedScripts: HTMLScriptElement[] = [];

export function loadScript(src: string, attributes?: string | string[], module?: boolean) {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');

    script.src = src;
    script.async = true;

    if (module === true) {
      script.type = 'module';
    }

    if (attributes) {
      if (typeof attributes === 'string') {
        script.setAttribute(attributes, '');
      } else if (Array.isArray(attributes)) {
        attributes.forEach((attr) => {
          script.setAttribute(attr, '');
        });
      }
    }

    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

    document.head.appendChild(script);
    loadedScripts.push(script);
  });
}
