# Global Tokenization Regulations Map

An interactive world map for exploring tokenization regulations by country. Click on any country to view detailed information about its regulatory framework for digital assets and tokenization.

![Tokenization Regulations Map](https://img.shields.io/badge/status-active-brightgreen)

## Features

- **Interactive World Map**: Click on countries to explore their tokenization regulations
- **Comprehensive Data**: Regulatory frameworks, key regulators, and source documents
- **Automated Updates**: GitHub Actions periodically fetch the latest regulatory information
- **Color-Coded Status**: Visual indication of regulatory maturity by country
  - 🟢 **Regulated**: Clear, established regulatory framework
  - 🟡 **Developing**: Framework under development
  - ⚫ **Unclear**: Limited or unclear regulatory guidance
  - 🔴 **Prohibited**: Tokenization activities restricted or prohibited

## Getting Started

### Prerequisites

- Node.js 18+ and Yarn

### Installation

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build
```

The development server will start at `http://localhost:5173`

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── WorldMap.tsx          # Interactive map component
│   │   └── RegulationPanel.tsx   # Country regulation details panel
│   ├── data/
│   │   └── regulations.json      # Regulatory data by country
│   ├── types.ts                  # TypeScript type definitions
│   ├── App.tsx                   # Main application component
│   └── main.tsx                  # Application entry point
├── scripts/
│   └── fetch-regulations.js      # Automated regulatory data fetcher
├── .github/
│   └── workflows/
│       └── update-regulations.yml # GitHub Action for periodic updates
└── README.md
```

## Data Structure

Each country's regulatory information is stored in `src/data/regulations.json` with the following structure:

```json
{
  "SGP": {
    "countryCode": "SGP",
    "countryName": "Singapore",
    "regulatoryStatus": "regulated",
    "lastUpdated": "2025-12-28",
    "summary": "Overview of the regulatory framework...",
    "keyRegulators": ["Monetary Authority of Singapore (MAS)"],
    "regulations": [
      {
        "title": "Payment Services Act 2019",
        "description": "Description of the regulation...",
        "effectiveDate": "2020-01-28",
        "url": "https://www.mas.gov.sg/regulation/acts/payment-services-act"
      }
    ],
    "sources": [
      {
        "title": "MAS - Digital Payment Tokens",
        "url": "https://www.mas.gov.sg/...",
        "date": "2025-12-28"
      }
    ]
  }
}
```

## Adding New Countries

To add a new country's regulatory information:

1. Open `src/data/regulations.json`
2. Add a new entry using the ISO 3166-1 alpha-3 country code (e.g., "USA", "GBR", "JPN")
3. Fill in all required fields following the structure above
4. The country will automatically appear on the map with the appropriate color coding

## Automated Updates

The GitHub Action in `.github/workflows/update-regulations.yml` runs weekly (every Monday at 9:00 AM UTC) to check for regulatory updates from:

- **Singapore**: Monetary Authority of Singapore (MAS)
- **United States**: Securities and Exchange Commission (SEC)
- **Switzerland**: Swiss Financial Market Supervisory Authority (FINMA)

To manually trigger an update:
1. Go to the "Actions" tab in GitHub
2. Select "Update Regulatory Data"
3. Click "Run workflow"

### Extending the Scraper

To add new regulatory sources, edit `scripts/fetch-regulations.js`:

1. Add the source to the `SOURCES` object
2. Implement a fetch function (e.g., `fetchEUUpdates()`)
3. Add the fetch call in the main `fetchRegulations()` function

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Map Library**: react-simple-maps
- **Automation**: GitHub Actions

## Contributing

Contributions are welcome! To contribute regulatory data:

1. Fork the repository
2. Add or update regulatory information in `src/data/regulations.json`
3. Include credible sources for all information
4. Submit a pull request

Please ensure all regulatory information:
- Is accurate and up-to-date
- Includes proper source citations
- Follows the established data structure
- Uses official regulatory body documentation

## Data Sources

Current regulatory information is sourced from:

- **Singapore**: [Monetary Authority of Singapore](https://www.mas.gov.sg)
- **United States**: [SEC](https://www.sec.gov/digital-assets), [CFTC](https://www.cftc.gov/digitalassets)
- **Switzerland**: [FINMA](https://www.finma.ch)

## License

This project is open source and available under the MIT License.

## Disclaimer

This tool provides general information about tokenization regulations and should not be considered legal advice. Always consult with qualified legal professionals for specific regulatory compliance questions.

Regulatory frameworks are subject to change. While we strive to keep information current through automated updates, users should verify information with official regulatory sources.

## Roadmap

- [ ] Add more countries (EU, UK, UAE, Hong Kong, Japan, etc.)
- [ ] Implement real-time web scraping for regulatory updates
- [ ] Add search and filter functionality
- [ ] Include regulatory comparison features
- [ ] Add RSS feeds for regulatory changes
- [ ] Mobile-responsive enhancements
- [ ] Multi-language support

## Contact

For questions or suggestions, please open an issue on GitHub.
