// place files you want to import through the `$lib` alias in this folder.
import { writable } from 'svelte/store';

interface Config {
    banner: number;
    updateInterval: number;
    weather: {
      apiKey: string;
      lat: number;
      lon: number;
      units: 'metric' | 'imperial';
    };
    stocks: {
      source: 'alpaca' | 'fmp';
      fmpApiKey?: string;
      alpacaKeyId?: string;
      alpacaSecretKey?: string;
      tickers: string[];
    };
    links: Array<Array<{ name: string; url: string }>>;
}

export type ConfigType = Config;

export const configStore = writable<ConfigType>({
    banner: 1,
    updateInterval: 1000,
    weather: {
        apiKey: '1c2160c7aae91b92728ff0aea4fe877a',
        lat: 47.6,
        lon: -122.3,
        units: 'metric'
    },
    stocks: {
        source: 'alpaca',
        fmpApiKey: '',
        alpacaKeyId: '',
        alpacaSecretKey: '',
        tickers: [
            'SPY',
            'QQQ',
            'UVXY',
            'AAPL',
            'MSFT',
            'GOOGL',
            'AMZN',
            'TSLA',
            'NVDA'
        ]
    },
    links: [
        [
            { name: 'gmail', url: 'https://mail.google.com' },
            { name: 'calendar', url: 'https://calendar.google.com' },
            { name: 'drive', url: 'https://drive.google.com' },
            { name: 'docs', url: 'https://docs.google.com' }
        ],
        [
            { name: 'github', url: 'https://github.com' },
            { name: 'feedly', url: 'http://feedly.com' },
            { name: 'translate', url: 'https://translate.google.com' },
            { name: 'monkeytype', url: 'https://monkeytype.com' }
        ],
        [
            { name: 'finance', url: 'https://finance.google.com' },
            {
                name: 'fidelity',
                url: 'https://digital.fidelity.com/ftgw/digital/portfolio/summary'
            },
            { name: 'chase', url: 'https://chase.com' },
            { name: 'sheets', url: 'https://sheets.google.com' }
        ],
        [
            { name: 'youtube', url: 'https://youtube.com' },
            { name: 'twitch', url: 'http://twitch.tv' },
            { name: 'reddit', url: 'https://reddit.com' },
            { name: 'instagram', url: 'http://instagram.com' }
        ]
    ]
});

export const regex = writable<string>("");