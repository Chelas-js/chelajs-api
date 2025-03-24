import { configuration } from "../configuration";

export type ConfigurationDTO = Awaited<ReturnType<typeof configuration>>;
