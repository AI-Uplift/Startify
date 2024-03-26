import "./App.css";
import "xterm/css/xterm.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";
import useAuthStateListener from "./hooks/useAuthStateListener";

const App = () => {
	useAuthStateListener();
	return (
		<>
			<RouterProvider router={router} />
			<Toaster />
		</>
	);
};

export default App;
