declare module "http-request" {
    interface HttpHeaders {
        get: (key: string) => string;

        has: (key: string) => boolean;
    }

    interface HttpRequestOptions {
        method?: string;
        headers?: { [key: string]: string };
        body?: string;
    }

    interface HttpResponse {
        headers: HttpHeaders;

        arrayBuffer: () => Promise<ArrayBuffer>;

        text: () => Promise<string>;
    }

    export type HttpRequest = (url: string, reqOptions?: HttpRequestOptions) => Promise<HttpResponse>;
}
