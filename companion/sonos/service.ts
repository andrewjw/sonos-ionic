import * as entitiesModule from "html-entities";
import { HttpRequest } from "http-request";

const entities = new entitiesModule.XmlEntities();

export default class Service {
  protected port: number = 1400;

  constructor(private httpRequest: HttpRequest,
              protected host: string,
              protected name: string,
              private controlURL: string) {
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
    return this.httpRequest('http://' + this.host + ':' + this.port + this.controlURL, {
      method: 'POST',
      headers: {
        'SOAPAction': messageAction,
        'Content-type': 'text/xml; charset=utf8'
      },
      body: this.createSoapEnvelope(messageBody)
    }).then((response) => {
      return response.text();
    }).then((text) => {
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
