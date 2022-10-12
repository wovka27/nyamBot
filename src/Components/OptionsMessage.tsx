import React from 'react';
import { Button, ButtonGroup } from '@urban-bot/core';
import { ButtonGroupProps } from '@urban-bot/core/dist/components/ButtonGroup';

interface OptionsMessageProps extends Partial<ButtonGroupProps> {
    onClick: Array<() => void>;
    btnText: string[];
    btnCount: number;
}

export const OptionsMessage: React.FC<OptionsMessageProps> = (props) => {
    const btns = Array(props.btnCount).fill(Button);
    return (
        <ButtonGroup {...props}>
            {btns.map((Btn, index) => (
                <Btn key={index} onClick={props.onClick[index] ? props.onClick[index] : () => undefined}>
                    {props.btnText[index] ? props.btnText[index] : 'Не указано'}
                </Btn>
            ))}
        </ButtonGroup>
    );
};
