import { configuration } from "../configuration.js";

export type ConfigurationDTO = Awaited<ReturnType<typeof configuration>>;
