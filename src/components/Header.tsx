import React from 'react';
import { FileIcon, Save, Undo, Redo } from 'lucide-react';
import { useDocumentStore } from '../store/documentStore';

const Header: React.FC = () => {
  const { title, setTitle, undo, redo, canUndo, canRedo } = useDocumentStore();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileIcon className="h-6 w-6 text-blue-500" />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-none text-lg font-medium focus:outline-none focus:ring-0 placeholder-gray-400"
              placeholder="Untitled Document"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={undo} 
              disabled={!canUndo}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${!canUndo ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700'}`}
              title="Undo"
            >
              <Undo className="h-5 w-5" />
            </button>
            <button 
              onClick={redo} 
              disabled={!canRedo}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${!canRedo ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700'}`}
              title="Redo"
            >
              <Redo className="h-5 w-5" />
            </button>
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
              title="Save Document"
            >
              <Save className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;