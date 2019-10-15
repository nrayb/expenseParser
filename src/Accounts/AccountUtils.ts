export function getAccountName(materializedPath: string): string {
    const splitPath = materializedPath.split(":");
    return splitPath[splitPath.length - 1] || materializedPath;
}

export function validatePath(materializedPath: string): boolean {
    return !!materializedPath &&
        materializedPath[0] !== ":" &&
        materializedPath[materializedPath.length - 1] !== ":" &&
        !/[^\w:-]/.test(materializedPath); // Only allow letters, ":", and "-"
}
