export class Encoder {
    public static encode(sequence: string): string | null {
        if (!/^[a-zA-Z]+$/.test(sequence)) {
            console.log(123);
            return null;
        }
        let currentCount = 0;
        let currentCharacter = sequence[0];
        let encoded = '';
        for (let i = 0; i <= sequence.length; i++) {
            if (currentCharacter === sequence[i] && currentCount <= 9) {
                currentCount++;
            } else {
                encoded += currentCharacter + currentCount;
                currentCount = 1;
                currentCharacter = sequence[i];
            }
        }
        return encoded;
    }
}
