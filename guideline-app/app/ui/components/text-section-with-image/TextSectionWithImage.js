import React from 'react';

import { Normaltekst } from './../../../../../packages/node_modules/nav-frontend-typografi';

import './styles.less'

export const TextSectionWithImage = (props) => {
    const renderTitle = () => {
        if (props.title) {
            return (
                <h2 className="textSectionWithImage__title">{ props.title }</h2>
            );
        }
    };

    const renderParagraphs = () => {
        return (
            <div className="textSectionWithImage__content__paragraphs">
                {
                    props.paragraphs.map((paragraph, index) => {
                        return (<Normaltekst key={ index }>{ paragraph }</Normaltekst>)
                    })
                }
            </div>
        )
    };

    const renderContent = () => {
        if (props.inverted !== true) {
            return (
                <div className="textSectionWithImage__content">
                    { renderParagraphs() }
                    <img alt="" />
                </div>
            );
        }

        else {
            return (
                <div className="textSectionWithImage__content--inverted">
                    <img alt="" />
                    { renderParagraphs() }
                </div>
            );
        }
    };

    return (
        <div className="textSectionWithImage">

            { renderTitle() }
            { renderContent() }
            
        </div>
    )
};