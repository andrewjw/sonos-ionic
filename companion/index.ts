import { outbox } from "file-transfer";
import { peerSocket } from "messaging";

import Companion from "./companion";

const app = new Companion(outbox, peerSocket, fetch);
app.start();
