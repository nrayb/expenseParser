export function getAccountName(materializedPath: string): string {
    const splitPath = materializedPath.split(":");
    return splitPath[splitPath.length - 1] || "";
}
