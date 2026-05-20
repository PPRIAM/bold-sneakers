/**
 * Utility to resolve asset paths, appending the basePath if configured
 * (especially useful for static deployments like GitHub Pages).
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (basePath && path.startsWith('/') && !path.startsWith(basePath)) {
    return `${basePath}${path}`;
  }
  return path;
}
