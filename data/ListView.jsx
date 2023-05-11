



import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


import { FlashList } from "@shopify/flash-list";

import api from '../api/api';
import LoadingScreen from "../screens/LoadingScreen";
import NetInfo from '@react-native-community/netinfo';
import NoInternetScreen from '../screens/NoInternetScreen'
import NoDataFoundScreen from '../screens/NoDataFoundScreen';
import { AuthContext } from '../context/AuthContext';
import BiodataScreen from '../screens/BiodataScreen';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';
import Checkbox from 'expo-checkbox';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


import React, {
    memo,
    useMemo,
    useRef,
    useState,
    useEffect,
    useCallback, useContext
} from 'react';
import { ScrollView, Button, Dimensions, FlatList, Image, Linking, TextInput, RefreshControl, ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from "react-native";

import {
    RecyclerListView,
    DataProvider,
    LayoutProvider,
    BaseScrollView,
} from 'recyclerlistview'; // Version can be specified in package.json

const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2,
};

let containerCount = 0;

const pageSize = 4;



const ListView = memo(({ designation, url, desig_code }) => {

    const { isAdmin } = useContext(AuthContext);
    const { currentTheme } = useContext(ThemeContext);

    const [notDgOrAdg, setnotDgOrAdg] = useState(false)

    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const _layoutProvider = useRef(layoutMaker()).current;

    const listView = useRef();


    const dataProvider = useMemo(() => dataProviderMaker(data), [data]);




    const load = useCallback(
        async (data, more = false) => {
            try {


                const { data: response } = await api.get("desig", {
                    params: {
                        desig: '059'
                    }
                });

                setData(response.rows);
            } catch (e) {
                __DEV__ && console.log(e);
            }

        },
        [loaded]
    );
    useEffect(() => {


        load();


    }, [load]);

    const loadMore = () => {
        __DEV__ && console.log('end');
        load();
    };

    const refresh = async () => {
        load();
    };



    // if (!loaded && isLoading)
    if (false)
        return (
            <ActivityIndicator
                style={{ marginTop: '50%', alignSelf: 'center' }}
                size="large"
            />
        );

    if (!data.length) return null;


    const rowRenderer = (type, item, index = 0) => {
        return (
            <View style={{ backgroundColor: 'purple' }}>
                <Text>sdfs</Text>
            </View>
        );
    };


    return (
        <View style={{ flex: 1 }}>
            <Button title="Refresh" onPress={() => refresh()} />
            <RecyclerListView
                ref={listView}
                scrollViewProps={{
                    refreshControl: (
                        <RefreshControl
                            refreshing={loaded && isLoading}
                            onRefresh={() => refresh()}
                        />
                    ),
                }}
                // renderFooter={() => <RenderFooter loading={isLoadingMore} />}
                onEndReached={() => loadMore()}
                onEndReachedThreshold={1}
                externalScrollView={ExternalScrollView}
                layoutProvider={_layoutProvider}
                dataProvider={dataProvider}
                rowRenderer={rowRenderer}
            />

            {/* <Button title="Load More" onPress={() => loadMore()} /> */}
        </View>
    );
});

const layoutMaker = () =>
    new LayoutProvider(
        (index) => {
            return ViewTypes.FULL;

        }
        ,
        (type, dim) => {
            dim.width = width;
            dim.height = 250;


        }
    );






const dataProviderMaker = (data) =>
    new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data);



class ExternalScrollView extends BaseScrollView {
    scrollTo = (...args) => {
        if (this._scrollViewRef) {
            this._scrollViewRef.scrollTo(...args);
        }
    };

    render() {
        return (
            <ScrollView
                {...this.props}
                ref={(scrollView) => {
                    this._scrollViewRef = scrollView;
                }}
            />
        );
    }
}

class CellContainer extends React.Component {
    constructor(args) {
        super(args);
        this._containerId = containerCount++;
    }
    render() {
        return (
            <View {...this.props}>
                {this.props.children}
                <Text>Cell Id: {this._containerId}</Text>
            </View>
        );
    }
}



export default ListView;

const styles = {
    container: {
        flex: 1,
        //marginTop: StatusBar.currentHeight ,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        //marginHorizontal: 16,
        height: 40,
        width: 90
    },
    title: {
        fontSize: 32,

    },
    logo: {
        width: width * (1 / 5.5),
        height: width * (1 / 5.5),
        borderRadius: 100,


    },
    place_holder_logo: {
        width: width * (1 / 5.5),
        height: width * (1 / 5.5),
        borderRadius: 100,
        backgroundColor: "pink",
        borderWidth: 1,
        borderColor: '#6750a4'


    },
    button: {
        backgroundColor: "gray",
        height: 40,
        width: 60,
        //padding: 10,
        borderRadius: 10
    },
    buttonText: {
        paddingTop: 9,
        paddingLeft: 16,
        color: "white",
        alignContent: 'center',
        justifyContent: 'center'
    },
    phnButtonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#6750a4",
        borderRadius: height * .005,
        marginHorizontal: 5,
        paddingVertical: 1,
        paddingHorizontal: 10
    },

};
