import path from "path";
import { fileURLToPath } from "url";
import { FOLDER_PATHS, TEMPLATE_PATHS } from "./enums.js";
import fs from "fs/promises";
import {
  formatImportStatement,
  transformFirstLetterToLowerCase,
  transformFirstLetterToUpperCase,
} from "./utils.js";
import ejs from "ejs";

export const __dirname = fileURLToPath(new URL(".", import.meta.url));
export const rootFolderPath = process.cwd();

export async function generateFile(entityName, entityType) {
  try {
    const templatePath = getTemplatePath(entityType);
    const template = await fs.readFile(templatePath, "utf-8");
    const entityNameWithUpperFirst =
      transformFirstLetterToUpperCase(entityName);
    const entityNameWithLowerFirst =
      transformFirstLetterToLowerCase(entityName);
    const renderedTemplate = ejs.render(template, {
      entityNameWithUpperFirst,
      entityNameWithLowerFirst,
    });

    const outputPath = getOutputPath(
      entityType,
      entityNameWithLowerFirst,
      rootFolderPath
    );
    await fs.writeFile(outputPath, renderedTemplate);

    const containerFilePath = path.join(rootFolderPath, "src/container.ts");
    await addImportStatementToContainer(
      containerFilePath,
      entityName,
      entityType
    );
    console.log(`"${entityName}.${entityType}.ts" has been created.`);
  } catch (error) {
    console.error(
      `An error occured while generating ${entityType}: `,
      error.message
    );
  }
}

function getTemplatePath(entityType) {
  return TEMPLATE_PATHS[`${entityType.toUpperCase()}_PATH`];
}

function getOutputPath(entityType, entityName) {
  const folderPath = FOLDER_PATHS[`${entityType.toUpperCase()}_PATH`];
  return path.join(folderPath, `${entityName}.${entityType}.ts`);
}

async function addImportStatementToContainer(
  containerFilePath,
  entityName,
  entityType
) {
  try {
    let containerFileContent = await fs.readFile(containerFilePath, "utf-8");
    const importLocation = containerFileContent.indexOf(
      'import { Container } from "inversify";'
    );
    let importStatement = formatImportStatement(entityType, entityName);
    containerFileContent =
      containerFileContent.slice(0, importLocation) +
      importStatement +
      containerFileContent.slice(importLocation);
    await fs.writeFile(containerFilePath, containerFileContent, "utf-8");
    console.log(
      `Import statement added to container.ts for "${entityName}${entityType}".`
    );
  } catch (error) {
    console.error(`Error reading/writing container.ts:`, error.message);
  }
}

export async function addBindingToEndOfContainer(
  containerFilePath,
  entityName,
  entityType
) {
  try {
    const bindingStatement = `container.bind(${transformFirstLetterToUpperCase(
      entityName
    )}${transformFirstLetterToUpperCase(entityType)}).toSelf();\n`;

    let containerFileContent = await fs.readFile(containerFilePath, "utf-8");

    containerFileContent += bindingStatement;

    await fs.writeFile(containerFilePath, containerFileContent, "utf-8");
    console.log(
      `Binding added to the end of container.ts for "${entityName}".`
    );
  } catch (error) {
    console.error(`Error reading/writing container.ts:`, error.message);
  }
}
