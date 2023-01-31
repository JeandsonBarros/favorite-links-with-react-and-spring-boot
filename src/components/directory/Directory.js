import { Button, Row } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import "./StyleDirectory.css"

function Directory({ pathname }) {

    const navigation = useNavigate()

    return (
        <nav className="navDirectory">

            <Row align="center">
                <Button light auto onPress={() => navigation("/")}>Favorite Links</Button>
                {pathname !== "/" &&
                    <>
                        {'/'}
                        <Button light auto onPress={() => navigation(`/${pathname}`)}>{pathname}</Button>
                    </>}
            </Row>

        </nav >
    );
}

Directory.defaultProps = {
    pathname: "/"
}

export default Directory;