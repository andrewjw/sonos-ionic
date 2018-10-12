export function startsWith(value: string, prefix: string): boolean {
    return value.slice(0, prefix.length) === prefix;
}
