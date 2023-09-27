import inquirer from "inquirer";
import {
  __dirname,
  generateFile,
  rootFolderPath,
  addBindingToEndOfContainer,
} from "../files.js";
import path from "path";
const RepositoryGenerator = async () => {
  const questions = [
    {
      type: "input",
      name: "repositoryName",
      message: "Enter the repository name:",
    },
  ];
  const answers = await inquirer.prompt(questions);
  let { repositoryName } = answers;
  generateFile(repositoryName, "repository");
  addBindingToEndOfContainer(
    path.join(rootFolderPath, "src/container.ts"),
    repositoryName,
    "repository"
  );
};

export default RepositoryGenerator;
