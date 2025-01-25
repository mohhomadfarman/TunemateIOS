import RNFS from 'react-native-fs';

export const saveMultipleFilesLocally = async (files) => {
  const savedFiles = [];

  for (let file of files) {
    const path = `${RNFS.DocumentDirectoryPath}/${file.name}`;

    try {
      // Check if the file already exists
      const fileExists = await RNFS.exists(path);

      if (fileExists) {
        // Handle if the file already exists (rename the new file)
        const newFileName = `${Date.now()}_${file.name}`; // Add a timestamp to avoid conflicts
        const newPath = `${RNFS.DocumentDirectoryPath}/${newFileName}`;

        console.log(`File already exists. Saving as ${newFileName}`);
        await RNFS.copyFile(file.uri, newPath);
        savedFiles.push(newPath); // Store the new path for the saved file
      } else {
        // File doesn't exist, proceed to save it
        await RNFS.copyFile(file.uri, path);
        savedFiles.push(path); // Store the original path for the saved file
      }
      
    } catch (err) {
      console.log(`Error saving file ${file.name}:`, err);
      throw err;
    }
  }

  return savedFiles; // Return the array of saved file paths
};
