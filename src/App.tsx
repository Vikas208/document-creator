import DocumentEditor from './components/DocumentEditor';
import Toolbar from './components/Toolbar';
import PropertiesPanel from './components/PropertiesPanel';
import ExportPanel from './components/ExportPanel';
import { DocumentProvider } from './context/DocumentContext';
import Header from './components/Header';

function App() {
  return (
    <DocumentProvider>
      <div className="flex flex-col h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          <Toolbar />
          <div className="flex-1 overflow-auto p-4 flex justify-center">
            <DocumentEditor />
          </div>
          <div className="w-full md:w-72 bg-white border-l border-gray-200 overflow-auto">
            <PropertiesPanel />
            <ExportPanel />
          </div>
        </div>
      </div>
    </DocumentProvider>
  );
}

export default App;