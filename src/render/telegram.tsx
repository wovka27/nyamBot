import React from 'react';
import { UrbanBotTelegram } from '@urban-bot/telegram';
import { render, Root } from '@urban-bot/core';
import dotenv from 'dotenv';
import { App } from '../App';
import { CommonBasketProvider } from '../store';

dotenv.config();

const isDevelopment = process.env.NODE_ENV === 'development';

const urbanBotTelegram = new UrbanBotTelegram({
    token: '5649960131:AAGKpv8E5y2KMdrOfXSG8OCU14gS7J_eUpo',
    isPolling: isDevelopment,
});

render(
    <CommonBasketProvider>
        <Root bot={urbanBotTelegram} port={5000} sessionTimeSeconds={3600}>
            <App />
        </Root>
    </CommonBasketProvider>,
    () => console.log('telegram started'),
);
