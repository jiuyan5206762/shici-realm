export {};

declare global {
  type PagesFunction<Env = unknown, Params extends string = any, Data extends Record<string, unknown> = Record<string, unknown>> = (
    context: EventContext<Env, Params, Data>
  ) => Response | Promise<Response>;

  interface EventContext<Env, Params extends string, Data> {
    request: Request;
    functionPath: string;
    waitUntil: (promise: Promise<any>) => void;
    next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
    env: Env;
    params: Record<Params, string | string[]>;
    data: Data;
  }
}
