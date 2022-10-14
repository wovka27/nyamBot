import { useCallback } from 'react';
import { UrbanMessageButtonsData, useBotContext } from '@urban-bot/core';

export const useBotSendMessage = () => {
    const { bot, chat } = useBotContext();

    const sendMessage = useCallback(
        async (userId: string, text: string) => {
            await bot.sendMessage({
                nodeName: 'urban-text',
                chat: { id: userId },
                data: { text, parseMode: 'HTML' },
            });
        },
        [bot],
    );

    const buttonMessage = useCallback(
        async (userId: string, data: UrbanMessageButtonsData) => {
            await bot.sendMessage({
                nodeName: 'urban-buttons',
                chat: { id: userId },
                data,
            });
        },
        [bot],
    );

    return { bot, sendMessage, buttonMessage, chat };
};
