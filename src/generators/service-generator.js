import inquirer from "inquirer";
import {
  __dirname,
  generateFile,
  rootFolderPath,
  addBindingToEndOfContainer,
} from "../files.js";
import path from "path";
const ServiceGenerator = async () => {
  const questions = [
    {
      type: "input",
      name: "serviceName",
      message: "Enter the service name:",
    },
  ];
  const answers = await inquirer.prompt(questions);
  let { serviceName } = answers;
  generateFile(serviceName, "service");
  addBindingToEndOfContainer(
    path.join(rootFolderPath, "src/container.ts"),
    serviceName,
    "service"
  );
};

export default ServiceGenerator;
