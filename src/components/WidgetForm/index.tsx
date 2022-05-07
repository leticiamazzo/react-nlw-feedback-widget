import { useState } from "react";

import { CloseButton } from "../CloseButton";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";

import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto'
        },
    },
    IDEA: {
        title: 'Idea',
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de uma lâmpada'
        },
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: thoughtImageUrl,
            alt: 'Imagem de um balão de pensamento'
        },
    },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {!feedbackType ? (
                // Comunicação entre componentes utilizando funções: usuário clica no botão que está dentro do componente FeedbackTypeStep. Como esse botão vai chamar a função setFeedbackType que está no componente WidgetForm (index.tsx)? Respo: Enviando como propriedade e falando no componente FeedbackTypeStep que ele recebe uma função como propriedade
                <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
            ) : (
                // Manda para componente FeedbackContentStep qual foi o tipo de feedback que usuário escolheu
                <FeedbackContentStep feedbackType={feedbackType} />
            )}

            <footer className="text-xs text-neutral-400">
                Feito com amor no <a className="underline underline-offset-2" href="https://rocketseat.com.br">NLW - Rocketseat</a>
            </footer>
        </div>
    )
}