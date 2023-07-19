import Log from "@novemberizing/log";
import Config from "@novemberizing/config";

import _ from "lodash";

import assert from "assert";

import axios from "axios";

import Application from "../src/index.js";

import { ApplicationServerService } from "../src/index.js";

const name = "Application";

Log.config = {
    error: false,
    warning: false,
    information: false,
    debug: false,
    verbose: false
};

describe(name, () => {
    it(" 0000 Application install", async () => {
        await Application.on(await Config.gen({ url: "fs://./test/configure.json" }));

        await Application.administrator.install();

        await Application.off();

    });
    return;
    it(" 0001 Application", async () => {
        await Application.on(await Config.gen({ url: "fs://./test/configure.json" }));

        assert.deepStrictEqual(await Application.administrator.call("", "root"), {});
        assert.deepStrictEqual(await Application.server.call("", "root"), {});

        assert.deepStrictEqual(_.get(await axios.get("http://localhost:40001"), "data"), {});
        assert.deepStrictEqual(_.get(await axios.get("http://localhost:50001"), "data"), {});

        await Application.off();
    });

    it(" 0001 Application use", async () => {
        await Application.on(await Config.gen({ url: "fs://./test/configure.json" }));

        class TempService extends ApplicationServerService {
            constructor(server, config) {
                super("/temp", server, config);
            }
        }

        Application.use(TempService);

        assert.deepStrictEqual(await Application.administrator.call("", "root"), {});
        assert.deepStrictEqual(await Application.server.call("", "root"), {});

        assert.deepStrictEqual(_.get(await axios.get("http://localhost:40001"), "data"), {});
        assert.deepStrictEqual(_.get(await axios.get("http://localhost:50001"), "data"), {});

        await Application.off();
    });
});
