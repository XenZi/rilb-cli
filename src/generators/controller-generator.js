import inquirer from "inquirer";
import { __dirname, generateFile } from "../files.js";

const ControllerGenerator = async () => {
  const questions = [
    {
      type: "input",
      name: "controllerName",
      message: "Enter the controller name:",
    },
  ];
  const answers = await inquirer.prompt(questions);
  let { controllerName } = answers;
  generateFile(controllerName, "controller");
};

export default ControllerGenerator;
