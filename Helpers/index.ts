export function formatPostDate(postDate: Date | string): string {
    const now = new Date();
    const diffInMs = now.getTime() - new Date(postDate).getTime();

    // Converter diferenças
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInSeconds < 60) {
        return "agora";
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} min`;
    } else if (diffInHours < 24) {
        return `${diffInHours}h`;
    } else if (diffInDays < 7) {
        return `${diffInDays}d`;
    } else if (diffInWeeks < 4) {
        return `${diffInWeeks}sem`;
    } else if (diffInMonths < 12) {
        return `${diffInMonths}mês`;
    } else {
        return `${diffInYears}ano${diffInYears > 1 ? 's' : ''}`;
    }
}
