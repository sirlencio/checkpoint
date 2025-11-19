export function isStale(updatedAt: string, days = 7) {
    const diff = Date.now() - new Date(updatedAt).getTime();
    return diff > days * 24 * 60 * 60 * 1000;
}
