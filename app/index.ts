import { me } from "device";
import document from "document";
import { inbox } from "file-transfer";
import * as messaging from "messaging";

import App from "./app";

const app = new App(me, document, messaging.peerSocket, inbox);
