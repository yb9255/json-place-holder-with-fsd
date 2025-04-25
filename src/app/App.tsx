import { AppRouter } from './routers';
import { ReactQueryProvider } from './providers';
import './index.css';

function App() {
  return (
    <ReactQueryProvider>
      <AppRouter />
    </ReactQueryProvider>
  );
}

export default App;
