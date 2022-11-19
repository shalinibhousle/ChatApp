import { Spinner } from '@ui-kitten/components';
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants';

interface IWrap {
    children: any;
    statusBarColor?: string;
    bodyColor?: string;
    barStyle?: string
}

const WrapperContainer = (props: IWrap) => {
    let { children, bodyColor = COLORS.backGroundBlack } = props || {};

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: bodyColor,
            }}>
            <View style={{ backgroundColor: bodyColor, flex: 1 }}>{children}</View>
        </SafeAreaView>
    );
};

export default WrapperContainer;
