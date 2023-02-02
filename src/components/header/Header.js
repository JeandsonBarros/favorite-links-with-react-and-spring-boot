import { Navbar, Button, Link, Text, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BsFillBookmarkStarFill, BsFillMoonStarsFill, BsFillSunFill, BsPersonCircle, BsSearch } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

function Header({ isDarkTheme, changeTheme }) {

    const navigation = useNavigate()
    const location = useLocation()

    const [visibleRight, setVisibleRight] = useState(false)

    useEffect(() => {
        /*  if (getToken()) {
             getUserData().then(data => setEmail(data.email))
         } */
        if (location.pathname.includes("/login") || location.pathname.includes("/register"))
            setVisibleRight(false)
        else
            setVisibleRight(true)

    }, [location.pathname])

    return (
        <Navbar isBordered variant="sticky" css={{ zIndex: "999" }}>
            <Navbar.Brand>
                <Button light auto onPress={() => navigation("/")}>
                    <BsFillBookmarkStarFill style={{ marginRight: 5, fontSize: 23 }} />
                    <Text b color="inherit" hideIn="xs">
                        Favorite Links
                    </Text>
                </Button>
            </Navbar.Brand>
            {visibleRight &&
                <Navbar.Content hideIn="xs">
                    <Input
                        aria-label="search"
                        placeholder="Search by name"
                        contentLeft={<BsSearch />}
                        fullWidth
                        onChange={event => {
                            if (event.target.value.length > 0)
                                navigation(`/search/${event.target.value}`)
                            else
                                navigation(`/`)
                        }}
                    />
                </Navbar.Content>
            }
            <Navbar.Content>
                <Button
                    onPress={changeTheme}
                    auto
                    light
                    icon={isDarkTheme ? <BsFillSunFill style={{ fontSize: 20 }} /> : <BsFillMoonStarsFill style={{ fontSize: 20 }} />}
                />
                {visibleRight &&
                    <Button
                        onPress={() => navigation("/user-data")}
                        auto
                        light
                        icon={<BsPersonCircle style={{ fontSize: 20 }} />}
                    />
                }

            </Navbar.Content>
        </Navbar>
    );
}

export default Header;