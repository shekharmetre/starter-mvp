export function splitTextByWords(text: string, maxCharsFirstLine: number, maxCharsSecondLine?: number) {
    const words = text.trim().split(/\s+/);

    let firstLine = '';
    let secondLine = '';

    for (const word of words) {
        const testLine = firstLine ? `${firstLine} ${word}` : word;

        if (testLine.length <= maxCharsFirstLine) {
            firstLine = testLine;
        } else {
            secondLine = secondLine ? `${secondLine} ${word}` : word;
        }
    }

    if (maxCharsSecondLine && secondLine.length > maxCharsSecondLine) {
        secondLine = secondLine.slice(0, maxCharsSecondLine).trimEnd() + '…';
    }

    return { firstLine, secondLine };
}
