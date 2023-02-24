import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ForgotPassword from './screens/Auth/ForgotPassword';
import ListUsers from './screens/Auth/ListUsers';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import UpdateAuthenticated from './screens/Auth/UpdateAuthenticated';
import UpdateAUser from './screens/Auth/UpdateAUser';
import UserOptions from './screens/Auth/UserOptions';
import FolderLinks from './screens/FavoriteLinks/FolderLinks';
import LinksAndFolders from './screens/FavoriteLinks/LinksAndFolders';
import Logo from './screens/Logo';

const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName='Logo'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3694FF',
          },
          headerTintColor: '#fff',
        }}>

        <Stack.Screen
          name="Logo"
          component={Logo}
          options={{ headerShown: false }}

        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
        />

        <Stack.Screen
          name="Home"
          component={LinksAndFolders}
          options={({ navigation, route }) => ({
            headerLeft: () => <></>,
            headerTitle: "Root folder",
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("UserOptions")}>
                <Icon name="person-circle-outline" size={40} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="UserOptions"
          component={UserOptions}
          options={{
            headerTitle: "User options",
          }}
        />

        <Stack.Screen
          name="ListUsers"
          component={ListUsers}
          options={{
            headerTitle: "List users",
          }}
        />

        <Stack.Screen
          name="UpdateAUser"
          component={UpdateAUser}
          options={{
            headerTitle: "Update a user",
          }}
        />

        <Stack.Screen
          name="UpdateAuthenticated"
          component={UpdateAuthenticated}
          options={{
            headerTitle: " Account config",
          }}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerTitle: "Forgot Password",
          }}
        />

        <Stack.Screen
          name="FolderLinks"
          component={FolderLinks}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("UserOptions")}>
                <Icon name="person-circle-outline" size={40} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}

