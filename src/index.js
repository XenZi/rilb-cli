#!/usr/bin/env node

// import { program } from "commander";
import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs/promises";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import ServiceGenerator from "./generators/service-generator.js";
import ControllerGenerator from "./generators/controller-generator.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootFolderPath = process.cwd();

const TEMPLATE_PATHS = {
  CONTROLLER_PATH: path.join(__dirname, "templates/controller-template.ejs"),
  REPOSITORY_PATH: path.join(__dirname, "templates/repository-template.ejs"),
  SERVICE_PATH: path.join(__dirname, "templates/service-template.ejs"),
};

const FOLDER_PATHS = {
  CONTROLLER_PATH: path.join(rootFolderPath, "src/controller"),
  SERVICE_PATH: path.join(rootFolderPath, "src/services"),
};
const program = new Command();

program
  .name("rilb-cli")
  .version("1.0.0")
  .command("generate")
  .argument("<layer>")
  .action((layer) => {
    if (layer == "service") {
      ServiceGenerator();
    } else if (layer == "controller") {
      ControllerGenerator();
    } else if (layer == "repository") {
      console.log("Repository");
    } else {
      console.log(
        "Layers that you can create: controller, repository, service"
      );
    }
  });

program.parse();
