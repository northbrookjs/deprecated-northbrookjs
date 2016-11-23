export function tryRequire(pkgName: string): any | null;
export function tryRequire<T>(pkgName: string): T | null;
export function tryRequire(pkgName: any): any {
  try {
    return require(pkgName);
  } catch (e) {
    return null;
  }
}