export const transformFirstLetterToUpperCase = (passedString) => {
  return (
    passedString.charAt(0).toUpperCase() +
    passedString.slice(1, passedString.length)
  );
};

export const transformFirstLetterToLowerCase = (passedString) => {
  return (
    passedString.charAt(0).toLowerCase() +
    passedString.slice(1, passedString.length)
  );
};

export const formatPath = (path, name, layer) => {
  return path.join(path, `${name}.${folder}.${layer}.ts`);
};

export const formatImportStatement = (entityType, entityName) => {
  let importStatement = "";
  if (entityType == "service" || entityType == "repository") {
    if (entityType == "repository") {
      importStatement = `import ${transformFirstLetterToUpperCase(
        entityName
      )}${transformFirstLetterToUpperCase(
        entityType
      )} from "./${entityType}/${transformFirstLetterToLowerCase(
        entityName
      )}.${entityType}";\n`;
    } else {
      importStatement = `import ${transformFirstLetterToUpperCase(
        entityName
      )}${transformFirstLetterToUpperCase(
        entityType
      )} from "./${entityType}s/${transformFirstLetterToLowerCase(
        entityName
      )}.${entityType}";\n`;
    }
  } else {
    importStatement = `import "./${entityType}s/${transformFirstLetterToLowerCase(
      entityName
    )}.${entityType}";\n`;
  }
  return importStatement;
};
