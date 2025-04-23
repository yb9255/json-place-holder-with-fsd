import { AppRouter } from "./routers";
import { ReactQueryProvider } from "./providers";

function App() {
  return (
    <ReactQueryProvider>
      <AppRouter />
    </ReactQueryProvider>
  );
}

export default App;
