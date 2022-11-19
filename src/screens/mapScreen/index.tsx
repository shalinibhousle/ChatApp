import React, { useContext, useEffect, useState } from "react";
import { useIsFocused } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { AuthContext, FilterOptions, SystemCards, SystemSearch, ThemeProvider, WrapperContainer } from "../../components";
import { COLORS, height, width } from "../../constants";
import { getCurrentLocation, checkLocationPermission, getUsers, getLoginUsers, switchFilter, getDistanceFromLatLonInKm } from "../../utils";


const MapScreen = ({ navigation }: any) => {
    const { user }: any = useContext(AuthContext);

    let [data, setData] = useState<Array<any>>([]);
    let [location, setLocation] = useState<any>();
    let [mapRef, setMapRef] = useState<any>(false);
    let [value, setValue] = useState<string>('');
    const [filter, setFilter] = useState<string>(`>10 KM`);
    const [loginUser, setLoginUser] = useState<any>(null);

    const isFocused = useIsFocused();

    useEffect(() => {
        getLoginUsers(setLoginUser, user);
        getUsers(setData, user);
    }, []);

    useEffect(() => {
        if (isFocused) {
            checkLocationPermission();
            getCurrentLocation(setLocation);//To fetch current location
        }
        return () => { }
    }, [isFocused]);

    useEffect(() => {
        let fetch = async () => {
            let dataVal: any = await switchFilter(filter, user, loginUser);
            setData(dataVal);
        }
        fetch();
    }, [filter]);


    return (
        <ThemeProvider
            children={
                <WrapperContainer
                    children={
                        <>
                            <MapView
                                ref={(ref: any) => setMapRef(ref)}
                                mapType={'standard'}
                                provider={PROVIDER_GOOGLE}
                                style={{ height, width }}
                                customMapStyle={require('../../assets/themes/light.json')}
                                zoomEnabled={true}
                                zoomTapEnabled={true}
                                showsCompass={true}
                                showsUserLocation={true}
                                initialRegion={{ ...loginUser?.[0]?.coordinates, latitudeDelta: 0.45, longitudeDelta: 0.3 }}
                                rotateEnabled={true}
                            >
                                {
                                    (data || [])?.map((ef: any, index: number) => {
                                        let { uid, coordinates, name } = ef || {};
                                        return (
                                            <Marker
                                                key={uid.concat(index)}
                                                title={name}
                                                draggable={false}
                                                pinColor={COLORS.blue}
                                                description={getDistanceFromLatLonInKm(loginUser?.[0]?.coordinates, coordinates)?.toString()}
                                                tracksViewChanges={true}
                                                coordinate={{ ...coordinates }}
                                            />
                                        )
                                    })
                                }
                            </MapView>
                            <FilterOptions setFilter={setFilter} filter={filter} />
                            <SystemSearch value={value} setValue={setValue} />
                            <SystemCards search={value} mapRef={mapRef} data={data} navigation={navigation} />
                        </>
                    }
                />
            }
        />
    )
}

export default MapScreen;