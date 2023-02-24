import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Styles from "../styles/Styles";
import Button from "./Button";
import CheckBox from "./CheckBox";
import Input from "./Input";
import Line from "./Line";

function UpdateUserForm({ user, updateUserData, updateUserPassword, visibleRoles }) {

    const [userUpdate, setUserUpdate] = useState({ ...user, roles: user.roles.map(role => role.role), confirmPassword: '' })

    function checkBoxChange(isSelected, value) {
        let tempList = [...userUpdate.roles]
        if (isSelected) {
            tempList.push(value)
            setUserUpdate({ ...userUpdate, roles: tempList })
        } else {
            const index = tempList.indexOf(value)
            tempList.splice(index, index + 1)
            setUserUpdate({ ...userUpdate, roles: tempList })
        }
    }

    return (
        <ScrollView>

            <View style={{ marginHorizontal: 10, marginBottom: 20 }}>

                <Text style={Styles.title}>Update data</Text>

                <Input
                    css={{ marginTop: 15 }}
                    label="Email"
                    placeholder="example@email.com"
                    value={userUpdate.email}
                    onChange={text => setUserUpdate({ ...userUpdate, email: text })}
                />

                <Input
                    css={{ marginTop: 25 }}
                    label="Name"
                    placeholder="Example"
                    value={userUpdate.name}
                    onChange={text => setUserUpdate({ ...userUpdate, name: text })}
                />

                {
                    (userUpdate.roles.length > 0 && visibleRoles) &&
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>

                        <CheckBox
                            isChecked={userUpdate.roles.includes("MASTER")}
                            onChange={isSelected => {
                                checkBoxChange(isSelected, "MASTER")
                            }}
                        >
                            <Text>Master</Text>
                        </CheckBox>

                        <CheckBox
                            isChecked={userUpdate.roles.includes("ADMIN")}
                            onChange={isSelected => {
                                checkBoxChange(isSelected, "ADMIN")
                            }}
                        >
                            <Text>Admin</Text>
                        </CheckBox>

                        <CheckBox
                            isChecked={userUpdate.roles.includes("USER")}
                            onChange={isSelected => {
                                checkBoxChange(isSelected, "USER")
                            }}
                        >
                            <Text>User</Text>
                        </CheckBox>

                    </View>
                }

                <Button
                    css={{ marginTop: 20 }}
                    onPress={() => { updateUserData(userUpdate) }}>
                    <Text> Update data </Text>
                </Button>

                <Line />

                <Text style={Styles.title}>Update password</Text>

                <Input
                    css={{ marginTop: 15 }}
                    label="Password"
                    placeholder="user12345"
                    secureTextEntry={true}
                    onChange={text => setUserUpdate({ ...userUpdate, password: text })}
                />

                <Input
                    css={{ marginTop: 25 }}
                    label="Confirm password"
                    placeholder="user12345"
                    secureTextEntry={true}
                    onChange={text => setUserUpdate({ ...userUpdate, confirmPassword: text })}
                />

                <Button
                    css={{ marginTop: 20 }}
                    onPress={() => updateUserPassword(userUpdate)}>
                    <Text> Update password </Text>
                </Button>

            </View>

        </ScrollView>
    );
}

export default UpdateUserForm;