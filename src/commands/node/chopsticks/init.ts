import path from "node:path";
import { SwankyCommand } from "../../../lib/swankyCommand.js";
import {
  buildZombienetConfigFromBinaries, copyChopsticksTemplateFile,
  copyZombienetTemplateFile,
  downloadZombienetBinaries, getSwankyConfig,
  getTemplates,
} from "../../../lib/index.js";
import { ConfigBuilder } from "../../../lib/config-builder.js";
import { SwankyConfig } from "../../../types/index.js";

export const chopsticksConfig = "dev.yml";

export class InitChopsticks extends SwankyCommand<typeof InitChopsticks> {
  static description = "Initialize Zombienet";

  async run(): Promise<void> {
    const {} = await this.parse(InitChopsticks);

    const localConfig = getSwankyConfig("local") as SwankyConfig;
    const projectPath = path.resolve();

    const chopsticksTemplatePath = getTemplates().chopsticksTemplatesPath;
    const configPath = path.resolve(projectPath, "node", "config");

    await this.spinner.runCommand(
      () =>
        copyChopsticksTemplateFile(chopsticksTemplatePath, configPath),
      "Copying template files",
    );

    await this.spinner.runCommand(async () => {
      const newLocalConfig = new ConfigBuilder(localConfig)
        .addChopsticks(path.resolve(projectPath, "node", "config", chopsticksConfig))
        .build();
      await this.storeConfig(newLocalConfig, "local");
    }, "Writing config");

    this.log("Chopsticks config initialized successfully");
  }
}

