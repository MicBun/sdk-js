import { EnvironmentType } from "@kwilteam/kwil-js/dist/core/enums";
import { WebKwil } from "@kwilteam/kwil-js";
import { BaseTNClient, TNClientOptions } from "./client";

export class BrowserTNClient extends BaseTNClient<EnvironmentType.BROWSER> {
  constructor(options: TNClientOptions) {
    super(options);
    this.kwilClient = new WebKwil({
      ...options,
      kwilProvider: options.endpoint,
    });
  }
}

export default BrowserTNClient;