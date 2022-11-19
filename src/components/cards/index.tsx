import React, { useEffect, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { COLORS } from "../../constants";
import { imageStyle } from "../../styles";
import { titleWords } from "../../utils";

interface ICards {
    search?: string;
    mapRef?: any;
    data?: Array<any>;
    navigation?: any;
}

const SystemCards = (props: ICards) => {
    const { search, mapRef, data, navigation }: any = props || {};
    let [dataFilter, setFilter] = useState<Array<string>>(data);

    useEffect(() => {
        let dataVal: any = data?.filter((item: any) => filter(item, search));
        setFilter(dataVal);

        let { coordinates } = dataVal?.[0] || {};
        let r = {
            ...coordinates,
            latitudeDelta: 0.45,
            longitudeDelta: 0.3,
        };
        mapRef?.animateToRegion?.(r, 1000);
    }, [search || data?.length]);

    let { container, card } = imageStyle || {};

    const filter = (item: any, query: string) => {
        return item?.['name']?.toLowerCase()?.includes(query?.toLowerCase());
    };

    let renderItem = (item: any, index: any) => {
        let { name, status, email, uid } = item || {};

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ChatSectionScreen', {
                name, uid,
                status: typeof (status) == "string" ? status : status.toDate().toString()
            })} style={{ flex: 1, flexDirection: 'row' }}>
                <View key={index + 10} style={{ width: '30%', height: 60 }}>
                    <View style={{ height: 60, width: 60, backgroundColor: COLORS.lightGray, borderRadius: 100, marginHorizontal: 16 }}>
                        <Text style={{ fontWeight: '900', fontSize: 18, alignSelf: "center", flex: 1, justifyContent: "center", paddingVertical: 16 }}>{titleWords(name)}</Text>
                    </View>
                </View>
                <View style={{ width: '70%' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
                        <Text style={{ fontSize: 14, paddingVertical: 8, color: (status == 'online') ? COLORS.darkGreen : COLORS.red }}>{status}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <ScrollView horizontal style={container} showsHorizontalScrollIndicator={false}>
            {
                dataFilter?.map((ef: any, index: number) => {
                    return (
                        <View key={index} style={{ ...card, backgroundColor: COLORS.white }}>
                            {renderItem(ef, index)}
                        </View>
                    );
                })
            }
        </ScrollView>
    )
}

export default SystemCards;