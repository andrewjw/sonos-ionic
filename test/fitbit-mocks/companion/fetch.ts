/* tslint:disable:max-classes-per-file */

import { HttpHeaders, HttpRequest, HttpRequestOptions, HttpResponse } from "http-request";

import Network from "../../sonos-mocks/network";

class HttpResponseMock implements HttpResponse {
    constructor(public headers: HttpHeaders, private body: string) {}

    public arrayBuffer(): Promise<ArrayBuffer> {
        return new Promise<ArrayBuffer>((resolve, reject) => {
            resolve(TextEncoder.encode(this.body));
        });
    }

    public text(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve(this.body);
        });
    }
}

class HttpHeadersMock implements HttpHeaders {
    public get(header: string): string {
        return null;
    }

    public has(header: string): boolean {
        return false;
    }
}

export default class HttpRequestMock {
    public fetch: HttpRequest;

    constructor(private network: Network) {
        this.fetch = this.mockFetch.bind(this);
    }

    private mockFetch(url: string, reqOpts?: HttpRequestOptions): Promise<HttpResponse> {
        const splitUrl = url.split("/");
        let host = splitUrl[2];
        let port = 80;
        if (host.indexOf(":") !== -1) {
            host = host.split(":")[0];
            port = parseInt(host.split(":")[1], 10);
        }

        const zp = this.network.getZonePlayer(host);

        const response = zp.get("/" + splitUrl.slice(3).join("/"));

        return new Promise<HttpResponse>((resolve, reject) => {
            resolve(new HttpResponseMock(new HttpHeadersMock(), response));
        });
    }
}
