"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instrumentationInitializetion = void 0;
const sdk_node_1 = require("@opentelemetry/sdk-node");
const exporter_zipkin_1 = require("@opentelemetry/exporter-zipkin");
const instrumentation_express_1 = require("@opentelemetry/instrumentation-express");
const instrumentation_http_1 = require("@opentelemetry/instrumentation-http");
const resources_1 = require("@opentelemetry/resources");
const semantic_conventions_1 = require("@opentelemetry/semantic-conventions");
const instrumentation_mongoose_1 = require("@opentelemetry/instrumentation-mongoose");
// Enable diagnostic logging
//diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
const instrumentationInitializetion = () => {
    console.log("OpenTelemetry started here");
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("ZIPKIN_ENDPOINT:", process.env.ZIPKIN_ENDPOINT);
    const traceExporter = new exporter_zipkin_1.ZipkinExporter({
        url: process.env.ZIPKIN_ENDPOINT || "http://zipkin:9411/api/v2/spans",
        serviceName: "Testing",
    });
    const sdk = new sdk_node_1.NodeSDK({
        resource: new resources_1.Resource({
            [semantic_conventions_1.ATTR_SERVICE_NAME]: "Testing",
            [semantic_conventions_1.ATTR_SERVICE_VERSION]: "1.0",
        }),
        traceExporter,
        instrumentations: [
            new instrumentation_express_1.ExpressInstrumentation(),
            new instrumentation_http_1.HttpInstrumentation(),
            new instrumentation_mongoose_1.MongooseInstrumentation(),
        ],
    });
    sdk.start();
    process.on("SIGTERM", () => {
        sdk
            .shutdown()
            .then(() => console.log("Tracing terminated"))
            .catch((error) => console.error("Error terminating tracing:", error))
            .finally(() => process.exit(0));
    });
    console.log("OpenTelemetry ended here after initialization done");
};
exports.instrumentationInitializetion = instrumentationInitializetion;
