interface ITextEncoder {
    encode(text: string): ArrayBuffer;
}

declare var TextEncoder: ITextEncoder;
