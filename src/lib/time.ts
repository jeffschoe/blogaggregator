export function parseDuration(durationStr: string) {
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex);
    if(!match) return;

    /**
     * match array should have 3 indicies
     * For example arg <10m>
     * "10m", index 0: the full match
     * "10",  index 1: first capture group (\d+)
     * "m"    index 2: second capture group (ms|s|m|h)
     * This check may be redundant though because 
     *  the regex should return if not correct
     */
    if (match.length !== 3) return;

    const value = parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
        case "ms":
            return value;
        case "s":
            return value * 1000;
        case "m":
            return value * 60 * 1000;
        case "h":
            return value * 60 * 60 * 1000;
        default:
            return;
    }
}