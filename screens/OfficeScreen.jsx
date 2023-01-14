import React from "react";
import DataRenderOffice from "../data/DataRenderOffice";
import { Text } from "react-native";

const OfficeScreen = ({ route, navigation }) => {

    const [value, onChangeText] = React.useState(route.params.title);

    React.useEffect(() => {
        navigation.setOptions({
            title: value === '' ? 'No title' : value,
        });
    }, [navigation, value]);

    return (
        <>
            <Text>{route.params.officeId}</Text>
            <DataRenderOffice designation='Director (Admin)' desig_code="012" />

        </>

    )
}
export default OfficeScreen