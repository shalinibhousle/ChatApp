import React from 'react';
import { Icon } from '@ui-kitten/components';
import { TouchableOpacity, View, Text } from 'react-native';
import { COLORS } from '../../constants';
import { titleWords } from '../../utils';

interface IHeader {
    headerText: string;
    isBack: boolean;
    onTap?: Function | any;
    onTitleCallback?: Function | any;
    rightProps?: Function | any;
    extraProps?: any;
}

const HeaderBar = (props: IHeader) => {
    const { headerText, isBack, onTap, rightProps, onTitleCallback, extraProps } = props || {};
    const { status } = extraProps || {};

    return (
        <View style={{ flex: 1 }}>
            <View style={{ margin: 16, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 0 }}>
                {
                    isBack ?
                        <TouchableOpacity onPress={onTap}>
                            <Icon
                                pack={'material'}
                                name={'arrow-back-ios'}
                                color={COLORS.black}
                                style={{ height: 24, width: 24 }}
                            />
                        </TouchableOpacity>
                        :
                        <View />
                }
                {rightProps ? rightProps() : <View />}
            </View>
            {
                headerText ?
                    <TouchableOpacity onPress={onTitleCallback} style={{ flexDirection: 'row' }}>
                        <View style={{ height: 70, width: 70, backgroundColor: COLORS.blue, borderRadius: 100, marginHorizontal: 16 }}>
                            <Text style={{ fontWeight: '900', color: COLORS.white, fontSize: 18, alignSelf: "center", flex: 1, justifyContent: "center", paddingVertical: 24 }}>{titleWords(headerText)}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 24, color: COLORS.black, fontWeight: '900' }}>{headerText}</Text>
                            <Text style={{ fontSize: 12, color: (status == 'online') ? COLORS.darkGreen : COLORS.red, fontWeight: '900' }}>{status}</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <></>
            }
            <View style={{ borderColor: COLORS.lightGray3, borderWidth: 0.75, marginTop: 16 }} />
        </View>
    )
}

export default HeaderBar