import AppLoading from "expo-app-loading";
import { StyleSheet, Text, View, StatusBar, Platform, Image, ImageBackground, Dimensions } from "react-native";
import { useFonts } from "expo-font";
import { Themes, Icons, Profiles } from "./assets/Themes";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Footer } from "./app/components";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

/* Keep the splash screen visible while we fetch resources */
SplashScreen.preventAutoHideAsync();

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
/* This is the home screen used for the navigation system, we'll
 * learn more about in the coming weeks!
 */
function HomeScreen() {
  /* TODO: insert your code here */

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headerIcons} source={Icons.menu.light}/>
        <Text style={styles.logo}>ensom</Text>
        <Image style={styles.headerIcons} source={Icons.sun}/>
      </View>
      <View style={styles.profileContainer}>
        <ImageBackground source={Profiles.mtl.image} 
          style={styles.profileCardDimensions} 
          imageStyle={styles.profileCardStyle}>
          <Text style={styles.profileName}>{Profiles.mtl.name}</Text>
          <Text style={styles.profileCaption}>{Profiles.mtl.caption}</Text>
        </ImageBackground> 
      </View>

      <View style={styles.hotTakeContainer}> 
        <Text style={styles.hotTakeText}>My hottest take</Text>
        <View style={styles.hotTakeAudioContainer}>
          <Image source={Icons.player.light} style={styles.hotTakeAudioPlayer}/>
          <Image source={Icons.audioWave.light} style={styles.hotTakeAudioWave}/>
        </View>
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Sydney: require("./assets/Fonts/Sydney-Serial-Regular.ttf"),
    "Sydney-Bold": require("./assets/Fonts/Sydney-Serial-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  /* ^Don't mind/edit the code above, it's there to load the font for you! */
  StatusBar.setBarStyle(Themes.light.statusBar);
  /* ^Don't mind/edit this one either unless you decide to do the dark theme one, in that case, you will have to change it accordingly*/

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Tab.Navigator
          tabBar={Footer}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.light.bg,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    flexDirection: "column"
  },
  header: {
    backgroundColor: Themes.light.bg,
    height: Platform.OS === 'ios' ? 120 : 108,
    width: "100%",
    top: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 20,
    
  },
  headerIcons: {
    width: 40,
    height: 40
  },
  hotTakeAudioContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 10
  },
  hotTakeAudioWave: {
    height: 50,
    width: 200,
    margin: 5
  },
  hotTakeContainer: {
    backgroundColor: Themes.light.bgSecondary,
    width: "80%",
    height: "18%",  
    marginTop: 30,
    borderRadius: 10,
    padding: 10,
    shadowColor: Themes.light.shadows.shadowColor,
    shadowRadius: Themes.light.shadows.shadowRadius,
    shadowOffset: Themes.light.shadows.shadowOffset,
    shadowOpacity: Themes.light.shadows.shadowOpacity
  },
  hotTakeAudioPlayer: {
    height: 50,
    width: 50,
    margin: 5
  }, 
  hotTakeText: {
    fontFamily: "Sydney",
    fontSize: 20,
    color: Themes.light.text
  },
  logo: {
    color: Themes.light.text,
    fontFamily: "Sydney-Bold", 
    fontSize: 40,
    alignSelf: "auto"
  },
  profileName: {
    fontFamily: "Sydney",
    fontSize: 30,
    color: Themes.light.textSecondary
  },
  profileCaption: {
    fontFamily: "Sydney",
    fontSize: 12,
    color: Themes.light.textSecondary,
  },
  profileCardDimensions: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  profileCardStyle: {
    borderRadius: 10,
    borderWidth: 1,
  },
  profileContainer: {
    width: "80%",
    height: windowWidth*0.8, // make square
    shadowColor: Themes.light.shadows.shadowColor,
    shadowRadius: Themes.light.shadows.shadowRadius,
    shadowOffset: Themes.light.shadows.shadowOffset,
    shadowOpacity: Themes.light.shadows.shadowOpacity 
  },

});
