import Login from "./pages/Auth/Login/Login";
import { createTheme, NextUIProvider } from "@nextui-org/react"
import Header from "./components/header/Header";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Auth/Register/Register";
import Footer from "./components/footer/Footer";
import UserData from "./pages/Auth/user-data/UserData";
import LinksAndFolders from "./pages/FavoriteLinks/links-and-folders/LinksAndFolders";
import Links from "./pages/FavoriteLinks/links/Links";

const dark = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: '$cyan200',
      primaryLightHover: '$cyan300',
      primaryLightActive: '$cyan400',
      primaryLightContrast: '$cyan600',
      primary: '#06B7DB',
      primaryBorder: '$cyan500',
      primaryBorderHover: '$cyan600',
      primarySolidHover: '$cyan700',
      primarySolidContrast: '$white',
      primaryShadow: '$cyan500',

      background: "#091F2E",

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#06B7DB',

      // you can also create your own color
      myColor: '#ff4ecd'

      // ...  more colors
    },
    space: {},
    fonts: {}
  }
})

const light = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      // generic colors
      white: '#ffffff',
      black: '#000000',

      // background colors (light)
      background: "$white",
      backgroundAlpha: "rgba(255, 255, 255, 0.8)", // used for semi-transparent backgrounds like the navbar
      foreground: "$black",
      backgroundContrast: "$white",


      //semantic colors (light)
      blue50: '#EDF5FF',
      // ...
      blue900: '#00254D',
      // ...

      // brand colors
      primaryLight: '$blue200',
      primaryLightHover: '$blue300', // commonly used on hover state
      primaryLightActive: '$blue400', // commonly used on pressed state
      primaryLightContrast: '$blue600', // commonly used for text inside the component
      primary: '$blue600',
      primaryBorder: '$blue500',
      primaryBorderHover: '$blue600',
      primarySolidHover: '$blue700',
      primarySolidContrast: '$white', // commonly used for text inside the component
      primaryShadow: '$blue500'

      // ... rest of colors (secondary, success, warning, error, etc)
    },
    space: {},
    fonts: {}
  }
})

function App() {

  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useState(darkThemeMq.matches)

  return (
    <NextUIProvider theme={isDark ? dark : light}>

      <BrowserRouter>

        <Header
          isDarkTheme={isDark}
          changeTheme={() => {
            setIsDark(!isDark)
          }}
        />

        <main style={{ minHeight: "100vh" }} >

          <Routes>

            <Route path='*' element={<h1> 404 - Page not found</h1>} />
            <Route path='/' element={<LinksAndFolders />} />
            <Route path='/:nameFolder' element={<Links />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-data" element={<UserData />} />

          </Routes>

        </main>

        <Footer />

      </BrowserRouter>

    </NextUIProvider>
  );
}

export default App;
