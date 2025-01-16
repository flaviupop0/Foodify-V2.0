# Here are the real steps to install this project, not that template you know 😂

1. First, you need to clone this project using git clone.
2. Make sure you have a firebase account setup with a project
3. Go to the root folder where you cloned the project and run npm install

# iOS installation

4. Download the GoogleService-info.plist
5. Open xCode and add it into the project
6. Navigate to ios folder and run pod install
7. Go back to the root folder and run react-native start || npx react-native run-ios ||

# Android installation

7. Download the google-service.json file
8. Put it inside the android/app folder
9. Go back to the root folder and run npx react-native start || npx react-native run-android, your choice

# In case you have issues with the fonts from the vector icons either on iOS, usually

1. Remove node_modules
2. Delete pods folder from ios folder
3. Delete link-assets-manifest.json file
4. Add inside the react-native.config.js file from the root folder this code:

```
module.exports = {
  assets: ['./assets/fonts', './node_modules/react-native-vector-icons/Fonts'],
};
```

5. Install node modules again(npm install)
6. Run npx react-native-asset command
7. Install the pod files and you should be good to go. 💪
