import React from 'react';
import { UrbanBotTelegram } from '@urban-bot/telegram';
import { render, Root } from '@urban-bot/core';
import dotenv from 'dotenv';
import { App } from '../App';
import { CommonBasketProvider } from '../store';

dotenv.config();

const isDevelopment = process.env.NODE_ENV === 'development';

if (!process.env.TELEGRAM_TOKEN) {
    throw new Error('Provide TELEGRAM_TOKEN to .env https://core.telegram.org/bots#6-botfather');
}

const urbanBotTelegram = new UrbanBotTelegram({
    token: process.env.TELEGRAM_TOKEN,
    isPolling: isDevelopment,
});

render(
    <CommonBasketProvider>
        <Root bot={urbanBotTelegram} port={process.env.PORT ? Number(process.env.PORT) : 8080} sessionTimeSeconds={3600}>
            <App />
        </Root>
    </CommonBasketProvider>,
    () => console.log('telegram started'),
);
