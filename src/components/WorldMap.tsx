import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { CountryRegulation, RegulationsData } from '../types'

const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'

interface WorldMapProps {
  regulations: RegulationsData
  onCountryClick: (country: CountryRegulation | null) => void
  selectedCountry: CountryRegulation | null
}

const statusColors = {
  regulated: '#10b981',      // green
  developing: '#f59e0b',     // amber
  unclear: '#6b7280',        // gray
  prohibited: '#ef4444',     // red
  default: '#e5e7eb'         // light gray
}

function WorldMap({ regulations, onCountryClick, selectedCountry }: WorldMapProps) {
  const getCountryColor = (geo: any) => {
    const countryCode = geo.id
    const regulation = regulations[countryCode]

    if (!regulation) return statusColors.default
    return statusColors[regulation.regulatoryStatus]
  }

  const handleCountryClick = (geo: any) => {
    const countryCode = geo.id
    const regulation = regulations[countryCode]

    if (regulation) {
      onCountryClick(regulation)
    }
  }

  return (
    <div className="w-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [0, 20]
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryCode = geo.id
              const isSelected = selectedCountry?.countryCode === countryCode

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleCountryClick(geo)}
                  style={{
                    default: {
                      fill: getCountryColor(geo),
                      stroke: '#ffffff',
                      strokeWidth: 0.5,
                      outline: 'none',
                      cursor: regulations[countryCode] ? 'pointer' : 'default'
                    },
                    hover: {
                      fill: regulations[countryCode] ? '#3b82f6' : getCountryColor(geo),
                      stroke: '#ffffff',
                      strokeWidth: 0.5,
                      outline: 'none',
                      cursor: regulations[countryCode] ? 'pointer' : 'default'
                    },
                    pressed: {
                      fill: '#1e40af',
                      stroke: '#ffffff',
                      strokeWidth: 0.5,
                      outline: 'none'
                    }
                  }}
                  className={isSelected ? 'opacity-100' : 'opacity-90'}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.regulated }}></div>
          <span>Regulated</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.developing }}></div>
          <span>Developing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.unclear }}></div>
          <span>Unclear</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.prohibited }}></div>
          <span>Prohibited</span>
        </div>
      </div>
    </div>
  )
}

export default WorldMap
