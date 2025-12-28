import { useState } from 'react'
import WorldMap from './components/WorldMap'
import RegulationPanel from './components/RegulationPanel'
import { CountryRegulation } from './types'
import regulationsData from './data/regulations.json'

function App() {
  const [selectedCountry, setSelectedCountry] = useState<CountryRegulation | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Global Tokenization Regulations
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Click on a country to view its tokenization regulatory framework
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <WorldMap
                regulations={regulationsData}
                onCountryClick={setSelectedCountry}
                selectedCountry={selectedCountry}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <RegulationPanel regulation={selectedCountry} />
          </div>
        </div>
      </main>

      <footer className="mt-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
