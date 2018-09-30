/// <reference path="../../node_modules/@fitbit/sdk-cli/lib/polyfills.d.ts" />

declare function fetch(url: string, options: any): any;

import * as entitiesModule from 'html-entities';

const entities = new entitiesModule.XmlEntities();

export default class Service {
  private port: number = 1400;

  constructor(protected host: string, protected name: string, private controlURL: string) {
      if (this.host.indexOf(":") !== -1) {
          this.port = parseInt(this.host.split(":")[1], 10);
          this.host = this.host.split(":")[0];
      }
  }

  protected request(action: string, variables: {[key: string]: string|number} = {}): Promise<string> {
    let messageAction = '"urn:schemas-upnp-org:service:' + this.name + ':1#' + action + '"'
    let messageBody = '<u:' + action + ' xmlns:u="urn:schemas-upnp-org:service:' + this.name + ':1">'
    if (variables) {
      Object.keys(variables).forEach((key) => {
        messageBody += "<" + key + ">" + variables[key] + "</" + key + ">";
    });
    }
    messageBody += '</u:' + action + '>'
    var responseTag = 'u:' + action + 'Response'
    return fetch('http://' + this.host + ':' + this.port + this.controlURL, {
      method: 'POST',
      headers: {
        'SOAPAction': messageAction,
        'Content-type': 'text/xml; charset=utf8'
      },
      body: this.createSoapEnvelope(messageBody)
    }).then((response: any) => {
      return response.text();
    }).then((text: string): string => {
      return entities.decode(text);
    });
  }

  private createSoapEnvelope(body: string): string {
    return [// '<?xml version="1.0" encoding="utf-8"?>',
      '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">',
      '<s:Body>' + body + '</s:Body>',
      '</s:Envelope>'].join('');
  }
}
