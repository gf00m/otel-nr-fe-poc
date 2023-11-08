import {
    CompositePropagator,
    W3CBaggagePropagator,
    W3CTraceContextPropagator,
} from '@opentelemetry/core';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const FrontendTracer = async () => {
    const { ZoneContextManager } = await import('@opentelemetry/context-zone');

    const provider = new WebTracerProvider({
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: 'otel-poc-v1',
        }),
    });

    const otelExporter = new OTLPTraceExporter({
        //vendor URL and token details
        url: '',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    provider.addSpanProcessor(new SimpleSpanProcessor(otelExporter));

    const contextManager = new ZoneContextManager();

    provider.register({
        contextManager,
        propagator: new CompositePropagator({
            propagators: [
                new W3CBaggagePropagator(),
                new W3CTraceContextPropagator(),
            ],
        }),
    });

    registerInstrumentations({
        tracerProvider: provider,
        instrumentations: [
            getWebAutoInstrumentations({
                '@opentelemetry/instrumentation-fetch': {
                    requireParentSpan: true,
                    propagateTraceHeaderCorsUrls: /.*/,
                    clearTimingResources: true,
                    applyCustomAttributesOnSpan(span) {
                        span.setAttribute('app.synthetic_request', 'false');
                    },
                },
            }),
        ],
    });
};

export default FrontendTracer;
