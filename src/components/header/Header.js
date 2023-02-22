import { Navbar, Button, Text, Input, Popover, Row } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BsFillBookmarkStarFill, BsFillMoonStarsFill, BsFillSunFill, BsPersonCircle, BsSearch } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { removeToken } from "../../services/TokenService"
import { getUserData } from '../../services/AuthService';

function Header({ isDarkTheme, changeTheme }) {

    const navigation = useNavigate()
    const location = useLocation()

    const [visibleContent, setVisibleContent] = useState(false)
    const [visibleListUsers, setVisibleListUsers] = useState(false)
    const [name, setName] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {

        if (location.pathname.includes("/login") ||
            location.pathname.includes("/register") ||
            location.pathname.includes("/forgot-password") ||
            location.pathname.includes("/change-forgot-password")
        ) {
            setVisibleContent(false)
        }
        else {
            setVisibleContent(true)
            showUserData()
        }

    }, [location.pathname])

    async function showUserData() {

        const data = await getUserData()

        if (typeof (data) === 'object') {
            const roles = data.roles.map(role => role.role);
            setVisibleListUsers(roles.includes('ADMIN') || roles.includes('MASTER'))
            setName(data.name)
            return
        }

    }

    function searchNavigate(event) {
        setSearch(event.target.value)
        if (event.target.value.length > 0) {
            navigation(`/search/${event.target.value}`)
        }
        else {
            navigation(`/`)
        }
    }

    return (
        <>
            <Navbar isBordered variant="sticky" css={{ zIndex: "999" }}>

                <Navbar.Brand>
                    <Button light auto onPress={() => navigation("/")}>
                        <BsFillBookmarkStarFill style={{ marginRight: 5, fontSize: 23 }} />
                        <Text b color="inherit" hideIn="xs">
                            Favorite Links
                        </Text>
                    </Button>
                </Navbar.Brand>

                {visibleContent && <>
                    <Navbar.Content hideIn="xs" >
                        <Input
                            aria-label="search"
                            placeholder="Search by name"
                            contentLeft={<BsSearch />}
                            fullWidth
                            value={search}
                            onChange={searchNavigate}
                        />
                    </Navbar.Content>

                    <Navbar.Content>

                        <Button
                            onPress={changeTheme}
                            auto
                            light
                            icon={isDarkTheme ? <BsFillSunFill style={{ fontSize: 20 }} /> : <BsFillMoonStarsFill style={{ fontSize: 20 }} />}
                        />

                        <Popover placement="bottom">
                            <Popover.Trigger>

                                <Button auto light>
                                    <Row align="center">
                                        <BsPersonCircle style={{ fontSize: 20, marginRight: 10 }} />
                                        <span>{name}</span>
                                    </Row>
                                </Button>

                            </Popover.Trigger>
                            <Popover.Content>

                                <Button light onPress={() => navigation("/user-data")}>
                                    Account configurations
                                </Button>

                                {visibleListUsers &&
                                    <Button light onPress={() => navigation("/list-users")}>
                                        List users
                                    </Button>}

                                <Button
                                    color="error"
                                    light
                                    onPress={() => {
                                        removeToken()
                                        navigation("/login")
                                    }}>
                                    Exit
                                </Button>

                            </Popover.Content>
                        </Popover>

                    </Navbar.Content>
                </>
                }

            </Navbar>

            <Navbar.Content showIn="xs">
                <Input
                    underlined
                    aria-label="search"
                    placeholder="Search by name"
                    contentLeft={<BsSearch />}
                    fullWidth
                    value={search}
                    onChange={searchNavigate}
                />
            </Navbar.Content>

        </>
    );
}

export default Header;