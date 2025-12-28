import { CountryRegulation } from '../types'

interface RegulationPanelProps {
  regulation: CountryRegulation | null
}

function RegulationPanel({ regulation }: RegulationPanelProps) {
  if (!regulation) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-500">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No country selected</h3>
          <p className="mt-1 text-sm text-gray-500">
            Click on a country on the map to view its tokenization regulations
          </p>
        </div>
      </div>
    )
  }

  const statusBadgeColors = {
    regulated: 'bg-green-100 text-green-800',
    developing: 'bg-amber-100 text-amber-800',
    unclear: 'bg-gray-100 text-gray-800',
    prohibited: 'bg-red-100 text-red-800'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-h-[600px] overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{regulation.countryName}</h2>
        <span
          className={`inline-flex items-center mt-2 px-3 py-1 rounded-full text-sm font-medium ${
            statusBadgeColors[regulation.regulatoryStatus]
          }`}
        >
          {regulation.regulatoryStatus.charAt(0).toUpperCase() + regulation.regulatoryStatus.slice(1)}
        </span>
        <p className="mt-2 text-xs text-gray-500">
          Last updated: {new Date(regulation.lastUpdated).toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Summary</h3>
          <p className="text-sm text-gray-700">{regulation.summary}</p>
        </div>

        {regulation.keyRegulators.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Key Regulators</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {regulation.keyRegulators.map((regulator, idx) => (
                <li key={idx}>{regulator}</li>
              ))}
            </ul>
          </div>
        )}

        {regulation.regulations.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Regulations & Guidelines</h3>
            <div className="space-y-3">
              {regulation.regulations.map((reg, idx) => (
                <div key={idx} className="border-l-2 border-blue-500 pl-3">
                  <h4 className="text-sm font-medium text-gray-900">{reg.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{reg.description}</p>
                  {reg.effectiveDate && (
                    <p className="text-xs text-gray-500 mt-1">
                      Effective: {new Date(reg.effectiveDate).toLocaleDateString()}
                    </p>
                  )}
                  {reg.url && (
                    <a
                      href={reg.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 mt-1 inline-block"
                    >
                      View document →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {regulation.sources.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Sources</h3>
            <ul className="space-y-2">
              {regulation.sources.map((source, idx) => (
                <li key={idx}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {source.title}
                  </a>
                  <span className="text-xs text-gray-500 ml-2">
                    ({new Date(source.date).toLocaleDateString()})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default RegulationPanel
