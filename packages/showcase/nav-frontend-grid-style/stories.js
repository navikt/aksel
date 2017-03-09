import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Readme } from './../../dokumentasjon';
import readme from './README.md';
import './src/index.less';

storiesOf('Grid', module)
    .addWithSections('Statisk grid', () => (
        <div className="container">

            <div className="row">
                <div className="col col-xs-12">
                    <div className="col-inner">.col-xs-12</div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col col-xs-6">
                    <div className="col-inner">.col-xs-6</div>
                </div>
                <div className="col col-xs-6">
                    <div className="col-inner">.col-xs-6</div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col col-xs-4">
                    <div className="col-inner">.col-xs-4</div>
                </div>
                <div className="col col-xs-4">
                    <div className="col-inner">.col-xs-4</div>
                </div>
                <div className="col col-xs-4">
                    <div className="col-inner">.col-xs-4</div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col col-xs-3">
                    <div className="col-inner">.col-xs-3</div>
                </div>
                <div className="col col-xs-3">
                    <div className="col-inner">.col-xs-3</div>
                </div>
                <div className="col col-xs-3">
                    <div className="col-inner">.col-xs-3</div>
                </div>
                <div className="col col-xs-3">
                    <div className="col-inner">.col-xs-3</div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col col-xs-2">
                    <div className="col-inner">.col-xs-2</div>
                </div>
                <div className="col col-xs-2">
                    <div className="col-inner">.col-xs-2</div>
                </div>
                <div className="col col-xs-2">
                    <div className="col-inner">.col-xs-2</div>
                </div>
                <div className="col col-xs-2">
                    <div className="col-inner">.col-xs-2</div>
                </div>
                <div className="col col-xs-2">
                    <div className="col-inner">.col-xs-2</div>
                </div>
                <div className="col col-xs-2">
                    <div className="col-inner">.col-xs-2</div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col col-xs-4">
                    <div className="col-inner">.col-xs-4</div>
                </div>
                <div className="col col-xs-8">
                    <div className="col-inner">.col-xs-8</div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col col-xs-2">
                    <div className="col-inner">.col-xs-2</div>
                </div>
                <div className="col col-xs-8">
                    <div className="col-inner">.col-xs-8</div>
                </div>
                <div className="col col-xs-2">
                    <div className="col-inner">.col-xs-2</div>
                </div>
            </div>
        </div>
    ), Readme(readme))
    .addWithSections('Responsivt grid', () => (
        <div className="container">

            <div className="row">
                <div className="col col-xs-12">
                    <div className="col-inner">.col-xs-12</div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col col-xs-12 col-md-6">
                    <div className="col-inner">.col-xs-12 .col-md-6</div>
                </div>
                <div className="col col-xs-12 col-md-6">
                    <div className="col-inner">.col-xs-12 .col-md-6</div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col col-sm-6 col-lg-3">
                    <div className="col-inner">.col-sm-6 .col-lg-3</div>
                </div>
                <div className="col col-sm-6 col-lg-3">
                    <div className="col-inner">.col-sm-6 .col-lg-3</div>
                </div>
                <div className="col col-sm-6 col-lg-3">
                    <div className="col-inner">.col-sm-6 .col-lg-3</div>
                </div>
                <div className="col col-sm-6 col-lg-3">
                    <div className="col-inner">.col-sm-6 .col-lg-3</div>
                </div>
            </div>
        </div>
    ), Readme(readme));
