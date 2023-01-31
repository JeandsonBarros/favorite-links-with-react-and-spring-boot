import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import "./FooterStyle.css"

function Footer() {
    return (
        <footer>
             <div>
                <a target='_blank' href='https://www.linkedin.com/in/jeandson-barros/' rel="noreferrer" >
                    <BsLinkedin />
                </a>
                <a target='_blank' href='https://github.com/JeandsonBarros' rel="noreferrer" >
                    <BsGithub />
                </a>
                <a target='_blank' href='https://www.instagram.com/jeandsonbarros/' rel="noreferrer">
                    <BsInstagram />
                </a>
                
            </div>

            <span>Created by Jeandson Barros. &copy; 2023</span>

        </footer>
    );
}

export default Footer;