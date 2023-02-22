import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AccountSecurity from './screens/Auth/AccountSecurity';
import ForgotPassword from './screens/Auth/ForgotPassword';
import ListUsers from './screens/Auth/ListUsers';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import UserData from './screens/Auth/UserData';
import UserOptions from './screens/Auth/UserOptions';
import FolderLinks from './screens/FavoriteLinks/FolderLinks';
import LinksAndFolders from './screens/FavoriteLinks/LinksAndFolders';
import Logo from './screens/Logo';

const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName='Logo'>

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
            headerTitle: "Links and Folders",
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("UserOptions")}>
                <Icon name="person-circle-outline" size={40} color="#3694FF" />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="UserData"
          component={UserData}
          options={{
            headerTitle: "User data",
          }}
        />

        <Stack.Screen
          name="UserOptions"
          component={UserOptions}
          options={{
            headerTitle: "User options",
          }}
        />

        <Stack.Screen
          name="AccountSecurity"
          component={AccountSecurity}
          options={{
            headerTitle: "Account security",
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
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerTitle: "Forgot Password",
          }}
        />

        <Stack.Screen
          name="FolderLinks"
          component={FolderLinks}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}

