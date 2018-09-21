/// <reference path="../node_modules/@types/node/index.d.ts" />

import Topology from "./sonos/topology";

new Topology('192.168.1.117').getTopology()
    .then((groups) => {
        for(let group of groups) {
            console.log(group.getName(), group.getCoordinator().location);
        }
    });

console.log("Hello world!");
