import { useStore } from '../../store/editorStore';
import { Sun, Moon, Grid, Move } from 'lucide-react';

export function SettingsPanel({ isOpen }: { isOpen: boolean }) {
  const { settings, updateSettings } = useStore();

  if (!isOpen) return null;

  return (
    <div className="absolute left-4 top-4 bottom-4 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-200">Theme</span>
            <button
              onClick={() => updateSettings({ theme: settings.theme === 'light' ? 'dark' : 'light' })}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {settings.theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </label>
        </div>

        <div>
          <label className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-200">Grid</span>
            <button
              onClick={() => updateSettings({ gridEnabled: !settings.gridEnabled })}
              className={`p-2 rounded-lg ${
                settings.gridEnabled
                  ? 'bg-blue-100 dark:bg-blue-900'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
          </label>
        </div>

        <div>
          <label className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-200">Snap to Grid</span>
            <button
              onClick={() => updateSettings({ snapToGrid: !settings.snapToGrid })}
              className={`p-2 rounded-lg ${
                settings.snapToGrid
                  ? 'bg-blue-100 dark:bg-blue-900'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Move className="w-5 h-5" />
            </button>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Grid Size
          </label>
          <input
            type="number"
            value={settings.gridSize}
            onChange={(e) => updateSettings({ gridSize: Number(e.target.value) })}
            min={0.1}
            step={0.1}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Snap Value
          </label>
          <input
            type="number"
            value={settings.snapValue}
            onChange={(e) => updateSettings({ snapValue: Number(e.target.value) })}
            min={0.1}
            step={0.1}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}