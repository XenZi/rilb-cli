import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootFolderPath = process.cwd();

export const TEMPLATE_PATHS = Object.freeze({
  CONTROLLER_PATH: path.join(__dirname, "templates/controller-template.ejs"),
  REPOSITORY_PATH: path.join(__dirname, "templates/repository-template.ejs"),
  SERVICE_PATH: path.join(__dirname, "templates/service-template.ejs"),
});

export const FOLDER_PATHS = Object.freeze({
  CONTROLLER_PATH: path.join(rootFolderPath, "src/controllers"),
  SERVICE_PATH: path.join(rootFolderPath, "src/services"),
  REPOSITORY_PATH: path.join(rootFolderPath, 'src/repository')
});
