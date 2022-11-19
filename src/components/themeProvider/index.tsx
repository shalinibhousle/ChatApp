import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { FeatherIconsPack } from './feather-icons';
import { MaterialIconsPack } from './material-icons';
import { FoundationIconsPack } from './foundation-icons';
import { IonicIconsPack } from './ ionic.-icons';
import * as theme from '../../assets/themes/theme.json';

interface IProvider {
    children?: any;
}

const ThemeProvider = (props: IProvider) => {
    let { children } = props;

    return (
        <>
            <IconRegistry icons={[EvaIconsPack, IonicIconsPack, FeatherIconsPack, MaterialIconsPack, FoundationIconsPack]} />
            <ApplicationProvider
                {...eva}
                theme={{ ...eva.light, ...theme }}
            >
                {children}
            </ApplicationProvider>
        </>
    )
};

export default ThemeProvider;