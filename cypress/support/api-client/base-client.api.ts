import { getApiUrl } from "../utils.get-api-url";

export abstract class BaseClient {
  protected readonly apiUrl = getApiUrl();
}
