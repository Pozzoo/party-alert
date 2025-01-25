import {ModalProvider} from "./context/ModalContext";
import App from "./App";

const Main = () => {
    return (
        <ModalProvider>
            <App />
        </ModalProvider>
    );
};

export default Main;